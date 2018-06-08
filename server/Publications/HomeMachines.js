Meteor.publish('allHomeMachines', function () {

    return HomeMachines.find();
});