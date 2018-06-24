Template.machineHomeChooseModal.events({

    'click .card-img-top': function(e, t) {

        const classlist = e.target.classList;
        if (!classlist.contains('selected')) {

            classlist.add('selected');
            return;
        }
        classlist.remove('selected');
    },

    'click #addMachines': function(e, t) {

        const selectedMachines = Array.from(document.querySelectorAll('.card-img-top.selected')).map(tag => tag.dataset.machineid);
        Meteor.call('addMachinesToHome', selectedMachines);
    }

});