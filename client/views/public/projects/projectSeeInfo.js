Template.projectSeeInfo.onCreated(function(){

    this.project = new ReactiveVar(false);
    this.showInfo = new ReactiveVar(false);

    subsGlobal.subscribe('allProjectCovers');
    subsGlobal.subscribe('allProjectManuals');

    let self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const project = Template.currentData().project;

        self.project.set(project);

    });
});

Template.projectSeeInfo.helpers({

    getProject() {

        return Template.instance().project.get();
    },

    getProjectCover() {

        const project = Template.instance().project.get();

        return ProjectCovers.findOne({ _id: project.coverId });
    },

    getProjectDocs() {

        const project = Template.instance().project.get();

        return ProjectManuals.findOne({ _id: project.manualId });
    },

    showInfo() {

        return Template.instance().showInfo.get();
    },

    formatDescription(desc) {
        return `${desc.slice(0, 100)}${(desc.length > 100 ? '...Mais' : '' )}`
    }

});

Template.projectSeeInfo.events({

    'click .showInfoBtn': function(e, t) {

        t.showInfo.set(!t.showInfo.get());
    }
});