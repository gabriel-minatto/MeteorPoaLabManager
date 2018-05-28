import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  const defaultAdmins = Meteor.settings.private.defaultAdmins;

  if(!defaultAdmins || !defaultAdmins.length) return;

  defaultAdmins.forEach(({ username, email, password, roles }) => {

    if(Meteor.users.findOne({ "emails.address": email })) return;

    const userId = Accounts.createUser({ email, password, username });
    if(roles && roles.length){

      Roles.addUsersToRoles(userId, roles);
    }

  });
});
