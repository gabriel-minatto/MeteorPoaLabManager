Meteor.publish('allReserves', function () {

    return Reserves.find();
});

Meteor.publish('userReserves', function () {

    const filtro = {
        'owner._id': Meteor.userId()
    };

    return Reserves.find(filtro);
});