Meteor.methods({

    deleteStep(stepId) {

        if (!stepId) return;

        Steps.remove({ _id:stepId });
    }

});