Template.stepsNew.onCreated(function() {

    this.step = new ReactiveVar(false);

    subsGlobal.subscribe('publishedProjects');
    subsGlobal.subscribe('activeUserSteps');

    const self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        if(Template.currentData().step) {

            const step = Template.currentData().step;
            self.step.set(step);
        }

    });
});

Template.stepsNew.helpers({

    getStep() {

        return Template.instance().step.get();
    }
});


Template.stepsNew.events({

    'submit #insertStepForm, submit #updateStepForm': function(e, t) {

        if (FlowRouter.getRouteName() == 'project-steps') {

            Modal.hide();
        }
    }
});
