AutoForm.addHooks(['insertMachineForm', 'updateMachineForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();
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
            insert: 'inserida',
            update: 'atualizada'
        };
        Toast.success(`Máquina ${messages[formType]} com sucesso.`);
        FlowRouter.go('machines');
    }
});