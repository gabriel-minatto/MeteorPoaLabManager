Meteor.methods({

    assignUserToRole(userId, roles) {

        if (!userId || !roles) return;

        Roles.addUsersToRoles(userId, roles);
    },

    checkUserIsInRole(userId, roles) {

        if (!userId || !roles) return;

        return Roles.userIsInRole(userId, roles);
    }
});