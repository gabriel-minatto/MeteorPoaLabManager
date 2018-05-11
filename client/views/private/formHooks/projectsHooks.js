AutoForm.addHooks(['insertProjectForm', 'updateProjectForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            console.log(doc);
            this.result(doc);
        }
    },

    onSuccess(formType, result) {

        this.resetForm();
        FlowRouter.go('projects');
    }
});