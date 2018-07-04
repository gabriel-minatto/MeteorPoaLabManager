Meteor.methods({

    deleteReserve(id) {

        if (!id) return;

        Reserves.remove({ _id:id });
    },

    acceptReserve(id) {

        if (!id) return;

        Reserves.update({ _id:id }, { $set: { accepted:true } });
    },

    refuseReserve(id) {

        if (!id) return;

        Reserves.update({ _id:id }, { $set: { accepted:false } });
    },
});