Template.stepsNew.onCreated(function() {

    subsGlobal.subscribe('publishedProjects');
    subsGlobal.subscribe('activeUserSteps');

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

    });
});

Template.stepsNew.events({

    'submit #insertStepForm': function(e, t) {

        if (FlowRouter.getRouteName() == 'project-steps') {

            Modal.hide();
        }
    }
});
