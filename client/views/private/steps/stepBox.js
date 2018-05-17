Template.stepBox.onCreated(function(){

    subsGlobal.subscribe('allStepImages');

    const self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

    })

});

Template.stepBox.helpers({

    getStepCover() {

        if (!subsGlobal.ready()) return;

        const defaultImg = {
            url:(arg) => '/images/poalab.png'
        }

        if (!this.imagesIds) return defaultImg;

        var img = StepImages.findOne({ _id: this.imagesIds[0] });

        if(!img) return defaultImg;

        return img;
    }
});