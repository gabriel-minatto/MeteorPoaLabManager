Template.index.onCreated(function(){

    this.machines = new ReactiveVar(false);
    this.projects = new ReactiveVar(false);

    subsGlobal.subscribe('allHomeMachines');
    subsGlobal.subscribe('allMachineImages');
    subsGlobal.subscribe('allHomeProjects');
    subsGlobal.subscribe('allProjectCovers');

    const self = this;

    this.autorun(() => {

        if (!subsGlobal.ready()) return;

        const machines = HomeMachines.find({}, { sort: { updatedAt : -1 } }).fetch();
        const projects = HomeProjects.find({}, { sort: { updatedAt : -1 } }).fetch();

        self.machines.set(machines);
        self.projects.set(projects);
    });

});

Template.index.helpers({

    getMachines() {

        return Template.instance().machines.get();
    },

    getMachineImage(id) {
        const img = MachineImages.findOne({ _id: id });

        const defaultImg = [{
            url: (arg) => '/images/poalab.png'
        }];

        if (!img) return defaultImg;

        return img;
    },

    formatDescription(desc) {
        return desc.slice(0, 250);
    },

    isPairIndex(index) {
        return index % 2 == 0;
    },

    getProjects() {

        return Template.instance().projects.get();
    },

    getProjectCover(id) {

        const img = ProjectCovers.findOne({ _id: id });

        const defaultImg = [{
            url: (arg) => '/images/poalab.png'
        }];

        if (!img) return defaultImg;

        return img;
    }
});