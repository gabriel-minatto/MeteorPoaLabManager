Meteor.publish('allMachines', function () {

    return Machines.find();
});