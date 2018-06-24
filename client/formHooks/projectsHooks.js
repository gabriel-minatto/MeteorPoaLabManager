AutoForm.addHooks(['insertProjectForm', 'updateProjectForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();

            if(doc.active == undefined){
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

    onSuccess(formType, result) {

        this.resetForm();
        const messages = {
            insert: 'inserido',
            update: 'atualizado'
        };
        Toast.success(`Projeto ${messages[formType]} com sucesso.`);
        FlowRouter.go('projects');
    }
});

const insertMediaFiles = async (doc, cb) => {

    const mediaFilesReference = { title: doc.title, cover: false, manual: false };

    const coverFile = document.querySelector('input[data-schema-key="coverId"]').files[0];
    const manualFile = document.querySelector('input[data-schema-key="manualId"]').files[0];

    cb(doc);

    if (coverFile) {

        mediaFilesReference.cover = await Blaze._globalHelpers.tranformToBase64(coverFile);
    }

    if (manualFile) {

        mediaFilesReference.manual = await Blaze._globalHelpers.tranformToBase64(manualFile);
    }

    Meteor.call('insertProjectMedia', mediaFilesReference);

};