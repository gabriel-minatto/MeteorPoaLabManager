Template.stepsSee.onCreated(function () {

    subsGlobal.subscribe('allStepImages');
    subsGlobal.subscribe('allStepManuals');

    this.step = new ReactiveVar({});

    const self = this;

    this.autorun(function () {

        if (!subsGlobal.ready()) return;

        const step = Template.currentData().step;

        self.step.set(step);
    })

});

Template.stepsSee.helpers({

    getStepCover() {

        if (!subsGlobal.ready()) return;

        const defaultImg = [{
            url:(arg) => '/images/poalab.png'
        }];

        const step = Template.instance().step.get();

        if (!step || !step.imagesIds) return defaultImg;

        const img = StepImages.find({ _id: { $in: step.imagesIds } }).fetch();

        if(!img) return defaultImg;

        return img;
    },

    getStepDocs() {

        const step = Template.instance().step.get();

        const defaultManual = {
            url:(args) => console.log(args)
        };

        if (!step) return defaultManual;

        const manual = StepManuals.findOne({
            _id: step.manualId
        });

        if(!manual) return defaultManual;

        return manual;
    },

    getStepEmbed() {

        return Template.instance().step.get().embedContent;
    },

    stepHasDocs() {

        const manualId = Template.instance().step.get().manualId;

        return (manualId && manualId != 'dummyId') ? true : false;
    },

    stepHasEmbed() {

        const embed = Template.instance().step.get().embedContent;

        return embed && embed.length;
    },

    getStep() {

        return Template.instance().step.get();
    },


});