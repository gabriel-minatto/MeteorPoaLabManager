Template.stepsNew.onCreated(function() {

    subsGlobal.subscribe('publishedProjects');
    subsGlobal.subscribe('activeUserSteps');

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

    });
});


Template.stepsNew.onRendered(function() {

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const checkboxes = document.querySelectorAll("input[type='checkbox']");

        Array.from(checkboxes).forEach(inpt => new Switchery(inpt));
    });
});

Template.stepsNew.events({

    'submit #insertStepForm': function(e, t) {

        if (FlowRouter.getRouteName() == 'project-steps') {

            Modal.hide();
        }
    }
});
