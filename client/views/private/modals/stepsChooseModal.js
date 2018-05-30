Template.stepsChooseModal.onDestroyed(function () {

    Session.set('fatherId', undefined);
    Session.set('threeId', undefined);
    Session.set('stepId', undefined);
    Session.set('push', undefined);
    delete Session.keys.fatherId;
    delete Session.keys.threeId;
    delete Session.keys.stepId;
    delete Session.keys.push;

});

Template.stepsChooseModal.events({
   
    'click .modal-content .card-img-top': function(e, t) {

        e.preventDefault();
        const stepId = e.target.dataset.stepid;

        const step = Steps.findOne({ _id:stepId });

        const params = {
            
            projectId: FlowRouter.getParam('id'),
            fatherId: Session.get('fatherId'),
            push: Session.get('push')
        };

        if(params.fatherId == undefined
            || !stepId
            || Session.get('threeId') != undefined) {
                Toast.error("Ocorreu um erro ao inserir a etapa.");
                return;
        }

        Meteor.call('insertStepInProject', step, params, (err, res) => {

            if(!err) return;

            Toast.error(err.message.replace(/[\[\]]/g,''));
        });

        Session.set('fatherId', undefined);
        Session.set('push', undefined);
        delete Session.keys.fatherId;
        delete Session.keys.push;

        Modal.hide();

    }
});