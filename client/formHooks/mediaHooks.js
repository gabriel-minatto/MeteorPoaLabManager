AutoForm.addHooks(['insertMediaForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            this.result(doc);
        }
    },

    onSuccess(formType, result) {

        this.resetForm();
        Toast.success(`Arquivo inserido com sucesso.`);
        Modal.hide();
    }
});