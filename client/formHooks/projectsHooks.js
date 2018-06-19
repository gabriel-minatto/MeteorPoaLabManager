AutoForm.addHooks(['insertProjectForm', 'updateProjectForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();

            if(doc.active == undefined){
                doc.active = true;
            }

            const mediaFilesReference = { title: doc.title, cover: false, manual: false };

            const coverFile = document.querySelector('input[data-schema-key="coverId"]').files[0];
            if (coverFile) {

                 const coverCFS = MediaFiles.insert(coverFile);
                 if (coverCFS) {

                     mediaFilesReference.cover = coverCFS._id;
                 }
            }

            const manualFile = document.querySelector('input[data-schema-key="manualId"]').files[0];
            if (manualFile) {

                const manualCFS = MediaFiles.insert(manualFile);
                if (manualCFS) {

                    mediaFilesReference.manual = manualCFS._id;
                }
            }

            Meteor.call('insertProjectMedia', mediaFilesReference);

            this.result(doc);
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