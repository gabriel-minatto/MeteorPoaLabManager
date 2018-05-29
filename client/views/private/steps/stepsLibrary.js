Template.stepsLibrary.onCreated(function(){

    subsGlobal.subscribe('activeUserSteps');
    subsGlobal.subscribe('allStepImages');

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

Template.stepsLibrary.events({

    'click .deleteStepBtn': function(e, t) {

        const stepId = e.target.dataset.stepid;
        new Confirmation({
            message: "Esta ação não pode ser desfeita.",
            title: "Você tem certeza?",
            cancelText: "Cancelar",
            okText: "Confirmar",
            success: false, // whether the button should be green or red
            focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
        }, (ok) => {
            if(!ok) return;
            Meteor.call('deleteStep', stepId);
        });
    }
});