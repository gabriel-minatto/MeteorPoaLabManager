Meteor.publish('allMedias', function () {

    return Medias.find();
});

Meteor.publish('userMedias', function () {

    if (Roles.userIsInRole('admin'))
        return Medias.find();

    const filtro = {
        'owner._id': Meteor.userId()
    };

    return Medias.find(filtro);
});