import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  
  if ( Meteor.users.find().count() === 0 ) {

    let adminUserId = Accounts.createUser({
      username: 'admin',
      email: 'admin@admin.com',
      password: '123456',
      profile: {
        first_name: 'admin',
        last_name: 'admin',
        company: 'admin',
      }
    });

    Roles.addUsersToRoles(adminUserId, 'super-admin', Roles.GLOBAL_GROUP)
    
  }
  
});
