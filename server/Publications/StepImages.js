Meteor.publish('allStepImages', function () {

    return StepImages.find();
});