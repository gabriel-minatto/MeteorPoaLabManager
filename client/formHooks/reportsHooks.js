AutoForm.addHooks(['insertReportForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();

            this.result(doc);
        }
    },

    onSuccess(formType, result) {

        this.resetForm();
        Toast.success('Reporte enviado com sucesso.');
        FlowRouter.go('home');
    }
});