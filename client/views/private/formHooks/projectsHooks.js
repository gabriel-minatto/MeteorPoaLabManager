AutoForm.addHooks(['insertProjectForm', 'updateProjectForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            this.result(doc);
        },

        update(doc) {

            doc.$set.updatedAt = new Date();
            this.result(doc);
        }
    },

    onSuccess(formType, result) {

        this.resetForm();
        FlowRouter.go('projects');
    }
});