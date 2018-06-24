Meteor.methods({

    addProjectsToHome(ids) {

        if (!ids || !ids.length) return;

        ids.forEach(id => {

            const project = Projects.findOne({ _id:id });
            if (!project) return;

            HomeProjects.insert(project);
        });
    },

    removeProjectFromHome(id) {

        if (!id) return;

        HomeProjects.remove({ _id:id });
    },

    addMachinesToHome(ids) {

        if (!ids || !ids.length) return;

        ids.forEach(id => {

            const machine = Machines.findOne({ _id:id });
            if (!machine) return;

            HomeMachines.insert(machine);
        });
    },

    removeMachineFromHome(id) {

        if (!id) return;

        HomeMachines.remove({ _id:id });
    },
});