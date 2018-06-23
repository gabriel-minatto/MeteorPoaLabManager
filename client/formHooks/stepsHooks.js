AutoForm.addHooks(['insertStepForm', 'updateStepForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();

            if (doc.active == undefined) {
                doc.active = true;
            }

            const self = this;

            new Confirmation({
                title: "Salvar arquivos no repositório de mídia?",
                cancelText: "Não",
                okText: "Sim",
                success: true, // whether the button should be green or red
                focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
            }, (ok) => {

                if(!ok) this.result(doc);

                insertMediaFiles(doc, (doc) => self.result(doc));
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

const insertMediaFiles = async (doc, cb) => {

    const mediaFilesReference = { title: doc.title, manual: false };

    const manualFile = document.querySelector('input[data-schema-key="manualId"]').files[0];
    const imageFiles = {
        target: document.querySelector('input[data-schema-key="imagesIds"]')
    };

    cb(doc);

    if (imageFiles.target.files.length) {

        FS.Utility.eachFile(imageFiles, async (file, key) => {

            const file64 = await Blaze._globalHelpers.tranformToBase64(file);

            Meteor.call('insertStepImage', file64, key+1, doc.title);

        });
    }

    if (manualFile) {

        mediaFilesReference.manual = await Blaze._globalHelpers.tranformToBase64(manualFile);
    }

    Meteor.call('insertStepMedia', mediaFilesReference);

};