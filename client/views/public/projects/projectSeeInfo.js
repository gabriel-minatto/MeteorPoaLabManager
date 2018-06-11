Template.projectSeeInfo.onCreated(function () {

    this.project = new ReactiveDict(false);
    this.showInfo = new ReactiveVar(false);

    subsGlobal.subscribe('allProjectCovers');
    subsGlobal.subscribe('allProjectManuals');

    let self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const project = Template.currentData().project;

        if (!project) return;

        const pc = ProjectCovers.findOne({ _id: project.coverId });
        self.project.set('cover',
            pc  ? pc.url({ store: 'projectCoversStore' })
                : false
        );

        const pm = ProjectManuals.findOne({ _id: project.manualId });
        self.project.set('manual',
            pm  ? pm.url({ store: 'projectManualsStore' })
                : false
        );

        self.project.set('project', project);
    });
});

Template.projectSeeInfo.helpers({

    getProject() {

        return Template.instance().project.get('project');
    },

    getProjectCover() {

        return Template.instance().project.get('cover');
    },

    getProjectDocs() {

        return Template.instance().project.get('manual');
    },

    showInfo() {

        return Template.instance().showInfo.get();
    },

    formatDescription(desc) {
        return `${desc.slice(0, 100)}${(desc.length > 100 ? '...Mais' : '')}`
    }

});

Template.projectSeeInfo.events({

    'click .showInfoBtn': function (e, t) {

        t.showInfo.set(!t.showInfo.get());
    }
});

Template.projectSeeInfo.animations({

    ".infoArea": {
        container: ".infoContainer",
        insert: {
            class: "animated fast fadeInRight"
        },
        remove: {
            class: "animated fast fadeOutRight"
        }
    }
});