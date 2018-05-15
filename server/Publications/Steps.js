Meteor.publish('allSteps', function () {

    return Steps.find();
});

Meteor.publish('activeUserSteps', function () {

    if (Roles.userIsInRole('admin'))
        return Steps.find();

    const filtro = {
        $or: [
            { 'owner._id' : Meteor.userId() },
            { 'active': true }
        ]
    };

    return Steps.find(filtro);
});