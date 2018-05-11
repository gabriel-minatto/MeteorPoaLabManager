AutoForm.addHooks(['insertProjectForm'], {

    onSuccess(formType, result) {

        this.resetForm();
        FlowRouter.go('projects');
    }
});