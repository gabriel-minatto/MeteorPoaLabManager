Meteor.publish('allProjectManuals', function () {

    return ProjectManuals.find();
});