AutoForm.addHooks(['insertProjectForm', 'updateProjectForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();

            if(doc.active == undefined){
                doc.active = true;
            }
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