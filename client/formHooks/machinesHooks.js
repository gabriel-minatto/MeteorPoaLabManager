AutoForm.addHooks(['insertMachineForm', 'updateMachineForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();

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
            insert: 'inserida',
            update: 'atualizada'
        };
        Toast.success(`Máquina ${messages[formType]} com sucesso.`);
        FlowRouter.go('machines');
    }
});

const insertMediaFiles = async (doc, cb) => {

    const mediaFilesReference = { title: doc.title, image: false, manual: false };

    const imageFile = document.querySelector('input[data-schema-key="imageId"]').files[0];
    const manualFile = document.querySelector('input[data-schema-key="manualId"]').files[0];

    cb(doc);

    if (imageFile) {

        mediaFilesReference.image = await Blaze._globalHelpers.tranformToBase64(imageFile);
    }

    if (manualFile) {

        mediaFilesReference.manual = await Blaze._globalHelpers.tranformToBase64(manualFile);
    }

    Meteor.call('insertMachineMedia', mediaFilesReference);

};