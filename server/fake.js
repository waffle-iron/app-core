'use strict'

let fakeData = () => {
  
  if ( Crops.find().count() === 0 ) {
    // Load crop file
    try {
      let crops = JSON.parse( Assets.getText('crops.json') )
      _.map(crops, (crop) => {
        Crops.insert(crop)
      })
    } catch (ex) {
      console.log('ex', ex)   
    }
  }

  if ( Meteor.users.find().count() !== 0 ) {
    return
  }
   let adminUserId = Accounts.createUser({
    username: 'admin',
    email: 'admin@admin.com',
    password: '123456'
  });

  Roles.addUsersToRoles(adminUserId, 'super-admin', Roles.GLOBAL_GROUP)

  for (let i = 0; i < 10; i++) {
    let fakeUser = Fake.user({
      fields: ['name', 'username', 'email', 'profile.firstName']
    })

    let fakeUserId = Accounts.createUser(fakeUser)
    console.log(`Fake userId: ${fakeUserId}`)

    for(var o = 0; o < 10; o++) {
      let orcharPublic = Fake.fromArray([true, false])
      let orchardId = MyOrchards.insert({
        userId: fakeUserId,
        name: `${Fake.word()} ${orcharPublic ? 'P' : ''}`,
        description: Fake.paragraph(1),
        public: orcharPublic
      })
 
      for(var b = 0; b < 10; b++) {
        let benchPublic = Fake.fromArray([true, false])
        let benchId = MyBenchs.insert({
          orchardId: orchardId,
          name: `${Fake.word()} ${benchPublic ? 'P' : ''}`,
          userId: fakeUserId,
          public: benchPublic
        })

        for(var s = 0; s < 10; s++) {
          /* MyPlants.insert({
            userId: fakeUserId,
            orchardId,
            benchId,
            name: Fake.word(),
            
            description: Fake.paragraph(1)
          }) */
        }

      }
    }
  }

}


export { fakeData }