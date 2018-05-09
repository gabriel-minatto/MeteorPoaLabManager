Meteor.publish('allProjects', function () {

    return Projects.find();
});