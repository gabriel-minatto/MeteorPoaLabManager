AutoForm.addHooks(['insertMachineForm', 'updateMachineForm'], {

    onSuccess(formType, result) {

        this.resetForm();
        FlowRouter.go('machines');
    }
});