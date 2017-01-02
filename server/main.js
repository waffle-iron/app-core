import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  
  if ( Meteor.users.find().count() === 0 ) {

    let joseUserId = Accounts.createUser({
      username: 'joseconstela',
      email: 'joseconstela@icloud.com',
      password: '123456',
      profile: {
        first_name: 'Jose',
        last_name: 'Constela',
        company: 'Jose Constela',
      }
    });

    Roles.addUsersToRoles(joseUserId, 'super-admin', Roles.GLOBAL_GROUP)
    
  }
  
});
