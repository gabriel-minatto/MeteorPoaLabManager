Meteor.publish('allHomeProjects', function () {

    return HomeProjects.find();
});