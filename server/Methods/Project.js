Meteor.methods({

    updateProject(id, set) {

        if (!id || !set) return;

        Projects.update({_id: id}, {
            $set: set
        });
    }

});