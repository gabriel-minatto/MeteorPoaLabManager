Template.stepsNewEditModal.onDestroyed(function () {

    Session.set('fatherId', undefined);
    Session.set('threeId', undefined);
    Session.set('stepId', undefined);
    Session.set('push', undefined);
    delete Session.keys.fatherId;
    delete Session.keys.threeId;
    delete Session.keys.stepId;
    delete Session.keys.push;

});