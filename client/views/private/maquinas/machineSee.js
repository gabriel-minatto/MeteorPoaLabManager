Template.machineSee.onCreated(function() {

    this.machine = new ReactiveVar({});

    subsGlobal.subscribe('allMachines');
    subsGlobal.subscribe('allMachineImages');
    subsGlobal.subscribe('allMachineManuals');

    let self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const id = FlowRouter.getParam('id');

        const machine = Machines.findOne({_id : id});

        if(!machine){
            Toast.error("Máquina não encontrada.");
            FlowRouter.go(FlowRouter.path('machines'));
            return;
        }

        self.machine.set(machine);
    });

});

Template.machineSee.helpers({

    getMachine() {

        return Template.instance().machine.get();
    },

    getMachineImage(id) {

        return MachineImages.findOne({ _id: id });
    },

    getMachineDocs(id) {

        return MachineManuals.findOne({ _id: id });
    }
});