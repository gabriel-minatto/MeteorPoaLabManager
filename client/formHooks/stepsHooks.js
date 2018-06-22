AutoForm.addHooks(['insertStepForm', 'updateStepForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();

            if (doc.active == undefined) {
                doc.active = true;
            }

            new Confirmation({
                title: "Salvar arquivos no repositório de mídia?",
                cancelText: "Não",
                okText: "Sim",
                success: true, // whether the button should be green or red
                focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
            }, (ok) => {
                if(ok) {
                    insertMediaFiles(doc);
                }
                this.result(doc);
            });

        },

        update(doc) {

            doc.$set.updatedAt = new Date();
            this.result(doc);
        }
    },

    after: {

        insert(err, result) {

            const params = {

                result: result,
                threeId: Session.get('threeId'),
                projectId: FlowRouter.getParam('id')
            };

            if (!params.result || !params.threeId || !params.projectId) {
                return;
            }

            Meteor.call('updatedStepInProject', params, (err, res) => {

                if(!err) return;

                Toast.error(err.message.replace(/[\[\]]/g,''));
            });

            Session.set('threeId', undefined);
            delete Session.keys.threeId;

            Modal.hide();

        }
    },

    onSuccess(formType, result) {

        this.resetForm();

        if (FlowRouter.getRouteName() != 'project-steps') {

            const messages = {
                insert: 'inserida',
                update: 'atualizada'
            };
            Toast.success(`Etapa ${messages[formType]} com sucesso.`);

            FlowRouter.go('steps-library');
            return;
        }

        const params = {

            projectId: FlowRouter.getParam('id'),
            fatherId: Session.get('fatherId'),
            push: Session.get('push')
        };

        if(params.fatherId == undefined
            || params.projectId == undefined
            || Session.get('threeId') != undefined) {

            Toast.error('Parâmetros indefinidos.');
            FlowRouter.go('steps-library');
            return;
        }

        this.insertDoc._id = result;

        Meteor.call('insertStepInProject', this.insertDoc, params, (err, res) => {

            if(!err) return;

            Toast.error(err.message.replace(/[\[\]]/g,''));
        });

        Session.set('fatherId', undefined);
        Session.set('push', undefined);
        delete Session.keys.fatherId;
        delete Session.keys.push;

        Modal.hide();
    }
});

const insertMediaFiles = (doc) => {

    const mediaFilesReference = { title: doc.title, manual: false };

    const imageFiles = {
        target: document.querySelector('input[data-schema-key="imagesIds"]')
    };

    if (imageFiles.target.files.length) {
        FS.Utility.eachFile(imageFiles, function(file) {

            MediaFiles.insert(file, function (err, fileObj) {

                Meteor.call('insertStepImage', fileObj._id, doc.title);
            });
        });
    }

    const manualFile = document.querySelector('input[data-schema-key="manualId"]').files[0];
    if (manualFile) {

        const manualCFS = MediaFiles.insert(manualFile);
        if (manualCFS) {

            mediaFilesReference.manual = manualCFS._id;
        }
    }

    Meteor.call('insertStepManual', mediaFilesReference);

};