Meteor.methods({

    assignUserToRole(roles, user = false) {

        if (!roles) return;

        if (!user) user = Meteor.user();

        Roles.addUsersToRoles(user, roles);
    },

    checkUserIsInRoles(roles, user = false) {

        if (!roles) return;

        if(!user) user = Meteor.user();

        roles = [].concat(roles);

        return Roles.userIsInRole(user, roles);
    },

    getMyUserRecord() {
        var userRec = {};
        if (Meteor.userId()) {
            userRec = Meteor.user();
        }
        return userRec;
    }
});