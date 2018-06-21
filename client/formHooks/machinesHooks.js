AutoForm.addHooks(['insertMachineForm', 'updateMachineForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();
            this.result(doc);

            insertMediaFiles(doc);
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

const insertMediaFiles = (doc) => {

    const mediaFilesReference = { title: doc.title, image: false, manual: false };

    const imageFile = document.querySelector('input[data-schema-key="imageId"]').files[0];
    if (imageFile.length) {

            const imageCFS = MediaFiles.insert(imageFile);
            if (imageCFS) {

                mediaFilesReference.image = imageCFS._id;
            }
    }

    const manualFile = document.querySelector('input[data-schema-key="manualId"]').files[0];
    if (manualFile) {

        const manualCFS = MediaFiles.insert(manualFile);
        if (manualCFS) {

            mediaFilesReference.manual = manualCFS._id;
        }
    }

    Meteor.call('insertMachineMedia', mediaFilesReference);

};