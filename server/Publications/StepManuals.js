Meteor.publish('allStepManuals', function () {

    return StepManuals.find();
});