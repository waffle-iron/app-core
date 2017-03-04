/**
 * Copyright (c) 2016-2016 "Jose Constela" [jose@joseconstela.com]
 * Tiempo de Siembra [http://app.tiempodesiembra.es]
 *
 * This file is part of iempo de Siembra core's app.
 *
 * Tiempo de Siembra is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict'

let fakeData = () => {

  // Import crops
  if (Crops.find().count() === 0) {
    let crops = JSON.parse(Assets.getText('crops.json'))
    _.map(crops, (crop) => { Crops.insert(crop) })
  }

  // Import crop families
  if (CropFamilies.find().count() === 0) {
    let families = JSON.parse(Assets.getText('cropfamily.json'))
    _.map(families, (family) => { CropFamilies.insert(family) })
  }

  if (Meteor.users.find().count() !== 0) {
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

    for (var o = 0; o < 10; o++) {
      let orcharPublic = Fake.fromArray([true, false])
      let orchardId = MyOrchards.insert({
        userId: fakeUserId,
        name: `${Fake.word()} ${orcharPublic ? 'P' : ''}`,
        description: Fake.paragraph(1),
        public: orcharPublic
      })

      for (var b = 0; b < 10; b++) {
        let benchPublic = Fake.fromArray([true, false])
        let benchId = MyBenchs.insert({
          orchardId: orchardId,
          name: `${Fake.word()} ${benchPublic ? 'P' : ''}`,
          userId: fakeUserId,
          public: benchPublic
        })

        for (var s = 0; s < 10; s++) {
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


export {
  fakeData
}
