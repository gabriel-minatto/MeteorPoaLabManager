Template.stepBox.onCreated(function(){

    subsGlobal.subscribe('allStepImages');

    this.step = new ReactiveVar({});

    const self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

        const step = Template.currentData().step;

        self.step.set(step);
    })

});

Template.stepBox.helpers({

    getStepCover() {

        if (!subsGlobal.ready()) return;

        const defaultImg = {
            url:(arg) => '/images/poalab.png'
        }

        const step = Template.instance().step.get();

        if (!step || !step.imagesIds) return defaultImg;

        var img = StepImages.findOne({ _id: step.imagesIds[0] });

        if(!img) return defaultImg;

        return img;
    },

    getStep() {

        return Template.instance().step.get();
    }
});