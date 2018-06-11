Meteor.publish('allProjects', function () {

    return Projects.find();
});

Meteor.publish('publishedProjects', function () {

    if (Roles.userIsInRole('admin'))
        return Projects.find();

    const filtro = {
        $or: [
            { 'public' : true, 'active': true }
        ]
    };

    if(Meteor.user()){

        filtro['$or'].push({ 'owner._id' : Meteor.userId() });
    }

    return Projects.find(filtro);
});