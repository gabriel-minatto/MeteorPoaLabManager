Meteor.methods({

    finishReport(id) {

        if (!id) return;

        Reports.update({ _id:id }, { $set: { solved:true } });
    }
});