Template.projectHomeChooseModal.events({

    'click .card-img-top': function(e, t) {

        const classlist = e.target.classList;
        if (!classlist.contains('selected')) {

            classlist.add('selected');
            return;
        }
        classlist.remove('selected');
    },

    'click #addProjects': function(e, t) {

        const selectedProjects = Array.from(document.querySelectorAll('.card-img-top.selected')).map(tag => tag.dataset.projectid);
        Meteor.call('addProjectsToHome', selectedProjects);
    }

});