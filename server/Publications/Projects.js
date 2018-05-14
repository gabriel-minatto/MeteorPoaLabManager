Meteor.publish('allProjects', function () {

    return Projects.find();
});

Meteor.publish('publishedProjects', function () {

    if (Roles.userIsInRole('admin'))
        return Projects.find();

    const filtro = {
        $or: [
            { 'owner._id' : Meteor.userId() },
            { 'public' : true, 'active': true }
        ]
    };

    return Projects.find(filtro);
});