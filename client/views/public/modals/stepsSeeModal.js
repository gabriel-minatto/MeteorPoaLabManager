Template.stepsSeeModal.onCreated(function() {

    this.step = new ReactiveVar(false);

    let self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const step = Template.currentData().step;

        self.step.set(step);

    });
});

Template.stepsSeeModal.onCreated({

    getStep() {

        return Template.instance().step.get();
    }
});