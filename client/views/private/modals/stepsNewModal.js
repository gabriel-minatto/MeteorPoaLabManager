Template.stepsNewModal.onDestroyed(function(){

    Session.set('fatherId', undefined);
    Session.set('push', undefined);
    delete Session.keys.fatherId;
    delete Session.keys.push;

});