Template.machineList.onCreated(function () {
    this.filtro = new ReactiveVar(false);

    subsGlobal.subscribe('allMachines');
    subsGlobal.subscribe('allMachineImages');

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

    });
});

Template.machineList.helpers({

    getMachines() {

        let filtro = Template.instance().filtro.get();
        if(!filtro)
            return Machines.find().fetch();

        return Machines.find(filtro).fetch();
    },

    getMachineImage(id) {
        return MachineImages.findOne({ _id: id });
    },

    formatDescription(desc) {
        return desc.slice(0, 100)+(desc.length > 100 ? '...Mais' : '' )
    }
});

Template.machineList.events({

    'click .machineFilter': function(e, t) {
        e.preventDefault();
        let param = e.target.dataset.filter;
        if (!param) {
            t.filtro.set({});
            return;
        }

        t.filtro.set ({
            available: (param == 'available')
        });
    }
});