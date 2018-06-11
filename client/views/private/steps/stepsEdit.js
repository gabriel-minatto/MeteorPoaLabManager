Template.stepsEdit.onCreated(function () {

    this.step = new ReactiveVar({});

    subsGlobal.subscribe('activeUserSteps');

    let self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        if(Template.currentData().step) {

            const step = Template.currentData().step;
            self.step.set(step);
            return;
        }

        const id = FlowRouter.getParam('id');

        const step = Steps.findOne({ _id: id });

        self.step.set(step);

    });
});

Template.stepsEdit.helpers({

    getStep() {

        return Template.instance().step.get();
    }
});