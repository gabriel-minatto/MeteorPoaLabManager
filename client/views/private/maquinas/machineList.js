Template.machineList.onCreated(function () {

    this.filtro = new ReactiveVar(false);
    this.machines = new ReactiveVar(false);
    this.machinesImages = new ReactiveDict(false);

    subsGlobal.subscribe('activeMachines');
    subsGlobal.subscribe('allMachineImages');

    const self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const filtro = self.filtro.get();

        const machines = Machines.find(filtro || {}).fetch();

        if(!machines || !machines.length) return;

        machines.forEach(m => {

            if(!m.imageId) return;

            const machineImg = MachineImages.findOne({ _id: m.imageId });
            self.machinesImages.set(m.imageId,
                machineImg ? machineImg.url({ store: 'machineImagesStore' })
                           : false
            );
        });

        self.machines.set(machines);
    });
});

Template.machineList.helpers({

    getMachines() {

        return Template.instance().machines.get();
    },

    getMachineImage(id) {

        return Template.instance().machinesImages.get(id);
    },

    formatDescription(desc) {

        return `${desc.slice(0, 100)}${(desc.length > 100 ? '...Mais' : '' )}`;
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