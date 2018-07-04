Meteor.methods({

    deleteReserve(id) {

        if (!id) return;

        Reserves.remove({ _id:id });
    }
});