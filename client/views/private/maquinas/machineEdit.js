Template.machineEdit.onCreated(function() {

    this.machine = new ReactiveVar({});

    subsGlobal.subscribe('allMachines');

    let self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const id = FlowRouter.getParam('id');

        const machine = Machines.findOne({ _id: id });

        self.machine.set(machine);

    });
});

Template.machineEdit.helpers({

    getMachine() {

        return Template.instance().machine.get();
    }
});
