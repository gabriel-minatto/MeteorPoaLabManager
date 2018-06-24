Template.mediaChooseModal.events({

    'click .card-img-top': function(e, t) {

        const classlist = e.target.classList;
        if (!classlist.contains('selected')) {

            classlist.add('selected');
            return;
        }
        classlist.remove('selected');
    },

    'click #addMedia': function(e ,t) {

        const selectedMedias = Array.from(document.querySelectorAll('.card-img-top.selected'));
        document.querySelector('#imagesIdsMedia').value = JSON.stringify(
            selectedMedias.map(input => input.dataset.fileid)
        );

        document.querySelector('#imagesInput').value =
            selectedMedias.map(input => input.dataset.filetitle).join(', ');

        document.querySelector('input[data-schema-key="imagesIds"]').value = '';
    }

});