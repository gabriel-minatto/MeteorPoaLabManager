Template.registerHelper('isLoggedIn', () => {

    return Meteor.userId();
});

Template.registerHelper('checkUserIsInRole', (role) => {

    if(!role) return false;

    return Blaze._globalHelpers.isInRole(role);
});

Template.registerHelper('getApiToken', () => {

    if(!Meteor.user()) return false;

    const user = Meteor.users.findOne({ _id: Meteor.userId() });

    if (!user || !user.apiToken) return false;

    return user.apiToken;

});