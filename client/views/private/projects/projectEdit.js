Template.projectEdit.onCreated(function () {

    this.project = new ReactiveVar({});

    subsGlobal.subscribe('allProjects');

    let self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const id = FlowRouter.getParam('id');

        const project = Projects.findOne({
            _id: id
        });

        self.project.set(project);

    });
});

Template.projectEdit.helpers({

    getProject() {

        return Template.instance().project.get();
    }
});