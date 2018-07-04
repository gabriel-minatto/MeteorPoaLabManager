AutoForm.addHooks(['insertReserveForm', 'updateReserveForm'], {

    before: {
        insert(doc) {

            doc.owner = Meteor.user();
            doc.createdAt = new Date();
            doc.updatedAt = new Date();

            doc.machine = Machines.findOne({ _id:doc.machineId });

            this.result(doc);
        },

        update(doc) {

            doc.$set.updatedAt = new Date();

            doc.$set.machine = Machines.findOne({ _id:doc.$set.machineId });

            this.result(doc);
        }
    },
});