Meteor.publish('allMachineImages', function () {

    return MachineImages.find();
});