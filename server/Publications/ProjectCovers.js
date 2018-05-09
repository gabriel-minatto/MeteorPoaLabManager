Meteor.publish('allProjectCovers', function () {

    return ProjectCovers.find();
});