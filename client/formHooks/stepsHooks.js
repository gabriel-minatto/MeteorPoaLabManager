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

                (async () => {

                    if(!ok) {

                        self.result(doc);
                        return;
                    }

                    insertMediaFiles(doc, (d) => {

                        self.result(d);
                    });

                })();

            });

        },

        update(doc) {

            doc.$set.updatedAt = new Date();
            this.result(doc);
        }
    },

    after: {

        async insert(err, result) {

            const params = {

                result: result,
                threeId: Session.get('threeId'),
                projectId: FlowRouter.getParam('id')
            };

            if (!params.result || !params.threeId || !params.projectId) {
                return;
            }

            //insert the repo files in a temp step record that will be copied
            //to the project and deleted
            const insertedIds = await copyMediaInsertFiles(result);

            Meteor.call('updateStepInProject', params, (err, res) => {

                if(!err) return;

                Toast.error(err.message.replace(/[\[\]]/g,''));
            });

            Session.set('threeId', undefined);
            delete Session.keys.threeId;

            const event = document.createEvent('HTMLEvents');
            event.initEvent('click', true, false);
            document.querySelector('.modal-closeBtn').dispatchEvent(event);

        }
    },

    async onSuccess(formType, result) {

        const insertedIds = await copyMediaInsertFiles(result);

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

        if(params.fatherId == undefined || params.projectId == undefined) {
            return;
        }

        const doc = Object.assign({}, this.insertDoc);

        if(insertedIds && insertedIds.length) {

            doc.imagesIds = insertedIds;
        }
        doc._id = result;

        Meteor.call('insertStepInProject', doc, params, (err, res) => {

            if(!err) return;

            Toast.error(err.message.replace(/[\[\]]/g,''));
        });

        Session.set('fatherId', undefined);
        Session.set('push', undefined);
        delete Session.keys.fatherId;
        delete Session.keys.push;

        const event = document.createEvent('HTMLEvents');
        event.initEvent('click', true, false);
        document.querySelector('.modal-closeBtn').dispatchEvent(event);
    }
});

const copyMediaInsertFiles = async(stepId) => {

    const imgsMedia = document.querySelector('#imagesIdsMedia').value;

    if (!imgsMedia) return false;

    const imgsMediaIds = JSON.parse(imgsMedia);

    const insertedIds = await Meteor.callPromise('insertStepMediaImages', imgsMediaIds, stepId);

    return (insertedIds ? insertedIds : false);

}

const insertMediaFiles = async (doc, cb) => {

    const mediaFilesReference = { title: doc.title, manual: false };

    const manualFile = document.querySelector('input[data-schema-key="manualId"]').files[0];
    const imageFiles = {
        target: document.querySelector('input[data-schema-key="imagesIds"]')
    };
    const isUsingMedia = document.querySelector('#imagesIdsMedia').value;

    cb(doc);

    if (imageFiles.target.files.length && !isUsingMedia) {

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