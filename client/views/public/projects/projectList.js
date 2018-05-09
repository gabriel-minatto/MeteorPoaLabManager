Template.projectList.onCreated(function() {

    this.projects = new ReactiveVar([]);

    subsGlobal.subscribe('allProjects');
    subsGlobal.subscribe('allProjectCovers');

    let self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

        const projects = Projects.find().fetch();

        self.projects.set(projects);

    });
});

Template.projectList.helpers({

    getProjects() {

        return Template.instance().projects.get();
    },

    getProjectCover(id) {

        return ProjectCovers.findOne({ _id: id });
    },

    formatDescription(desc) {
        return `${desc.slice(0, 100)}${(desc.length > 100 ? '...Mais' : '' )}`
    }
});