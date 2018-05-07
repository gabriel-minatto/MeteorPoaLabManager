Template.registerHelper('isLoggedIn', () => {

    return Meteor.userId();
});

Template.registerHelper('checkUserIsInRole', (role) => {

    if(!role) return false;

    return Blaze._globalHelpers.isInRole(role);
});