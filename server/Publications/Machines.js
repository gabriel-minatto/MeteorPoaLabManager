Meteor.publish('allMachines', function () {

    return Machines.find();
});

Meteor.publish('activeMachines', function () {

    if (Roles.userIsInRole('admin'))
        return Machines.find();

    return Machines.find({ active: true });
});