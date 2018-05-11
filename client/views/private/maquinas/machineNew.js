AutoForm.addHooks(['insertMachineForm'], {

    onSuccess(formType, result) {

        this.resetForm();
        FlowRouter.go('machines');
    }
});