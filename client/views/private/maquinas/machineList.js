Template.machineList.onCreated(function () {
    this.filtro = new ReactiveVar(false);

    subsGlobal.subscribe('allMachines');

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

    });
});

Template.machineList.helpers({

    getMachines() {

        let filtro = Template.instance().filtro.get();
        if(!filtro)
            return Machines.find().fetch();

        return Machines.find().fetch(filtro);
    }
});

Template.machineList.events({

    'click .machineFilter': function(e, t) {
        let anchor = e.target;
        t.filtro.set(anchor.dataset.filter);
    }
});