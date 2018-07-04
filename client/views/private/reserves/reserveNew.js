Template.reserveNew.onCreated(function() {

    this.machines = new ReactiveVar(false);

    subsGlobal.subscribe('activeMachines');

    const self = this;

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const machines = Machines.find().fetch();

        self.machines.set(machines);

    });

});

Template.reserveNew.onRendered(function() {

    document.querySelector('#reservedDate').min = `${new Date().toISOString().match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)}`;

});


Template.reserveNew.helpers({

    getActiveMachines() {

        const machines = Template.instance().machines.get();

        if(!machines || !machines.length) return [];

        return machines.map(m => { return { label: m.title, value: m._id } });
    }
});