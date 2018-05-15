Template.stepsLibrary.onCreated(function(){

    subsGlobal.subscribe('activeUserSteps');
    subsGlobal.subscribe('allStepImages');
    subsGlobal.subscribe('allStepManuals');

    const self = this;

    this.autorun(function(){

        if (!subsGlobal.ready()) return;

    })

});


Template.stepsLibrary.helpers({

    getUserSteps() {

        const fields = {
            imagesIds: 1,
            title: 1
        };

        return Steps.find({}, { sort: { createdAt: -1 }, fields: fields}).fetch();
    },

    getStepCover() {

        if (!this.imagesIds) {

            return {
                url:(arg) => '/images/poalab.png'
            }
        }

        return StepImages.findOne({ _id: this.imagesIds[0] });

    }
});