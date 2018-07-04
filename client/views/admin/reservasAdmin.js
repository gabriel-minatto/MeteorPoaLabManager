Template.reservasAdmin.onCreated(function() {

    this.reserves = new ReactiveVar(false);

    subsGlobal.subscribe('allReserves');

    const self = this;

    this.autorun(function() {

        const reserves = Reserves.find({ reservedDate: { $gte: new Date() } }, { sort: { reservedDate: -1 } }).fetch();

        self.reserves.set(reserves);
    });

});


Template.reservasAdmin.helpers({

    getReservesList() {

        return Template.instance().reserves.get();
    },

    getReserveStatus() {

        if(typeof this.accepted == 'undefined') return false;

        return this.accepted ? 'Aceito' : 'Recusado';
    }

});

Template.reservasAdmin.events({

    'click .acceptReserveBtn': function(e, t) {

        const reserveId = e.target.dataset.reserveid;

        if(!reserveId) {

            Toast.error(`Reserva não encontrada`);
            return;
        }

        Meteor.call('acceptReserve', reserveId);
    },

    'click .refuseReserveBtn': function(e, t) {

        const reserveId = e.target.dataset.reserveid;

        if(!reserveId) {

            Toast.error(`Reserva não encontrada`);
            return;
        }

        Meteor.call('refuseReserve', reserveId);
    },

});