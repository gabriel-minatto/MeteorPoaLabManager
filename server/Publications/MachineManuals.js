Meteor.publish('allMachineManuals', function () {

    return MachineManuals.find();
});