Template.stepBox.onCreated(function(){

    subsGlobal.subscribe('allStepImages');

    this.step = new ReactiveDict(false);

    const self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

        const step = Template.currentData().step;

        if(!step) return;

        const stepCover = (() => {

            if(!step.imagesIds || !step.imagesIds.length) return ['/images/poalab.png'];

            const img = StepImages.findOne({ _id: step.imagesIds[0] });

            if(!img) return ['/images/poalab.png'];

            return img.url({ store: 'stepImagesStore' });
        })();

        self.step.set('step', step);
        self.step.set('cover', stepCover);
    });

});

Template.stepBox.helpers({

    getStepCover() {

        return Template.instance().step.get('cover');
    },

    getStep() {

        return Template.instance().step.get('step');
    }
});