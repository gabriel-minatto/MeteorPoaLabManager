Template.stepsSee.onCreated(function () {

    subsGlobal.subscribe('allStepImages');
    subsGlobal.subscribe('allStepManuals');

    this.step = new ReactiveDict(false);

    const self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const step = Template.currentData().step;

        if(!step) return;

        const stepImgs = (() => {

            if(!step.imagesIds || !step.imagesIds.length) return ['/images/poalab.png'];

            const imgs = StepImages.find({ _id: { $in: step.imagesIds } }).fetch();

            if(!imgs || !imgs.length) return ['/images/poalab.png'];

            return imgs.map(img => img.url({ store: 'stepImagesStore' }));
        })();

        const stepDoc = (() => {

            if(!step.manualId) return false;

            const manual = StepManuals.findOne({ _id: step.manualId });

            if(!manual) return false;

            return manual.url({ store: 'stepManualsStore' });
        })();

        const stepEmbeds = (() => {

            if(!step.embedContent || !step.embedContent.length) return false;
            return step.embedContent;
        })();


        self.step.set('step', step);
        self.step.set('images', stepImgs);
        self.step.set('embeds', stepEmbeds);
        self.step.set('doc', stepDoc);
    });

});

Template.stepsSee.helpers({

    getStepImages() {

        return Template.instance().step.get('images');
    },

    getStepDoc() {

        return Template.instance().step.get('doc');
    },

    getStepEmbeds() {

        return Template.instance().step.get('embeds');
    },

    getStep() {

        return Template.instance().step.get('step');
    },


});