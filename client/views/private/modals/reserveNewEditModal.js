Template.reserveNewEditModal.helpers({

    getReserveId() {

        return Template.currentData().reserveId || false;
    }

});


Template.reserveNewEditModal.events({

    'submit form': function(e, t) {

        Modal.hide();
    }
});