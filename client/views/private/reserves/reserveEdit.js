Template.reserveEdit.onCreated(function() {

    this.machines = new ReactiveVar(false);
    this.reserve = new ReactiveVar(false);

    subsGlobal.subscribe('activeMachines');

    const self = this;

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const args = Template.currentData();

        if(!args || !args.reserveId) return;

        const reserve = Reserves.findOne({ _id: args.reserveId });

        if(!reserve) return;

        self.reserve.set(reserve);

    });

    this.autorun(function() {

        if (!subsGlobal.ready()) return;

        const machines = Machines.find().fetch();

        self.machines.set(machines);
    });

});


Template.reserveEdit.helpers({


    getReserve() {

        return Template.instance().reserve.get();
    },

    getActiveMachines() {

        const machines = Template.instance().machines.get();

        if(!machines || !machines.length) return [];

        return machines.map(m => { return { label: m.title, value: m._id } });
    }

});
