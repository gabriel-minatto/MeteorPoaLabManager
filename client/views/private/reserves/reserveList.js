Template.reserveList.onCreated(function() {

    this.reserves = new ReactiveVar(false);

    subsGlobal.subscribe('userReserves');

    const self = this;

    this.autorun(function() {

        const reserves = Reserves.find({}, { sort: { reservedDate: -1 } }).fetch();

        self.reserves.set(reserves);
    });

});


Template.reserveList.helpers({

    getReservesList() {

        return Template.instance().reserves.get();
    },

    getReserveStatus() {

        if(typeof this.accepted == 'undefined') return "Não avaliado";

        return this.accepted ? 'Aceito' : 'Recusado';
    }

});

Template.reserveList.events({

    'click #newReserveBtn': function(e, t) {

        Modal.show('reserveNewEditModal');
    },

    'click .deleteReserveBtn': function(e, t) {
        const reserveId = e.target.dataset.reserveid;
        new Confirmation({
            message: "Esta ação não pode ser desfeita.",
            title: "Você tem certeza?",
            cancelText: "Cancelar",
            okText: "Confirmar",
            success: false, // whether the button should be green or red
            focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
        }, (ok) => {
            if(!ok) return;

            Meteor.call('deleteReserve', reserveId);
        });
    },

    'click .editReserveBtn': function(e, t) {
        const reserveId = e.target.dataset.reserveid;
        Modal.show('reserveNewEditModal', { reserveId:reserveId });
    }
});