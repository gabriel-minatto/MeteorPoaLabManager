Template.homeAdmin.onCreated(function () {

    this.machines = new ReactiveVar(false);
    this.projects = new ReactiveVar(false);

    subsGlobal.subscribe('allHomeMachines');
    subsGlobal.subscribe('allMachineImages');
    subsGlobal.subscribe('allHomeProjects');
    subsGlobal.subscribe('allProjectCovers');

    const self = this;

    this.autorun(() => {

        if (!subsGlobal.ready()) return;

        const machines = HomeMachines.find({}, { sort: { updatedAt: -1 } }).fetch();
        const projects = HomeProjects.find({}, { sort: { updatedAt: -1 } }).fetch();

        self.machines.set(machines);
        self.projects.set(projects);
    });



});

Template.homeAdmin.helpers({

    getMachines() {

        return Template.instance().machines.get();
    },

    getProjects() {

        return Template.instance().projects.get();
    },

    formatDescription(desc) {
        return desc.slice(0, 150);
    },

    getOwner() {

        return this.owner.emails[0].address;
    }
});

Template.homeAdmin.events({

    'click #addproject': function(e,t) {

        Modal.show('projectHomeChooseModal');
    },

    'click .removeProject': function(e, t) {

        Meteor.call('removeProjectFromHome', e.target.dataset.projectid);
    },

    'click #addmachine': function(e, t) {

        Modal.show('machineHomeChooseModal');
    },

    'click .removeMachine': function(e, t) {

        Meteor.call('removeMachineFromHome', e.target.dataset.machineid);
    }

});