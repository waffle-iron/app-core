/**
 * Copyright (c) 2016-2017 "Jose Constela" [jose@joseconstela.com]
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

Meteor.publish('directory', function (userId) {

  let fields = {
    'services.twitter.profile_image_url_https': true,
    'services.facebook.id': true,
    'services.google.picture': true,
    'services.github.username': true,
    'services.instagram.profile_picture': true,
    'services.linkedin.pictureUrl': true,
    'profile.firstName': true,
    'profile.lastName': true,
    'profile.familyName': true,
    'profile.secondName': true,
    'emails.address': true,
    'profile.name': true
  }

  if (!userId) return

  return Meteor.users.find({_id: userId}, {fields: fields})
})

Meteor.publish('Crops', (cropId) => {
  let q = {}

  if (cropId) {
    q._id = cropId
  }

  return Crops.find(q)
})

Meteor.publish('CropsResume', (cropId) => {
  let q = {}

  if (cropId) {
    q._id = cropId
  }

  let fields = {
    variant: true,
    highlightedImage: true,
    'seedTime': true,
    'harvestTime': true
  }

  return Crops.find(q, {fields: fields})
})

Meteor.publish('Herbs', (herbId) => {
  return herbId ? Herbs.find({_id: herbId}) : Herbs.find()
})

Meteor.publish('CropsNames', () => {
  return Crops.find({}, {fields: {name: 1, variant: 1}})
})

Meteor.publish('CropsTiming', () => {

  let q = {}

  return Crops.find(q, {fields: {name: 1, variant: 1, seedTime: 1, harvestTime: 1}})
})

Meteor.publish('TreesVariants', () => {
  return Trees.find({}, {fields: {variant: 1}})
})

Meteor.publish('CropFamilies', (cropFamilyId) => {
  return cropFamilyId ? CropFamilies.find({_id: cropFamilyId}) : CropFamilies.find({})
})

Meteor.publish('TreeFamilies', (treeFamilyId) => {
  return treeFamilyId ? TreeFamilies.find({_id: treeFamilyId}) : TreeFamilies.find({})
})

Meteor.publish('Trees', (treeId) => {
  return treeId ? Trees.find({_id: treeId}) : Trees.find({})
})

Meteor.publish('MyOrchards', function (userId, myOrchardId) {
  let q = myOrchardId ? {_id: myOrchardId} : {}
      q.userId = userId

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  return MyOrchards.find(q)
})

Meteor.publish('MyOrchardsNames', function (userId, myOrchardId) {
  let q = myOrchardId ? {_id: myOrchardId} : {}
      q.userId = userId

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }
  return MyOrchards.find(q, {fields: {name: true}})
})

Meteor.publish('MyPlants', function(userId, orchardId, benchId) {
  let q = {
    userId: userId
  }

  if (orchardId) {
    q.orchardId = orchardId
  }

  if (benchId) {
    q.benchId = benchId
  }

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  return MyPlants.find(q)
})

Meteor.publish('MyLogEntries', function(userId, type, typeId) {
  let q = { userId: userId }

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  if (type) {
    q.type = type
  }
  if (typeId) {
    q.typeId = typeId
  }

  return MyLogEntries.find(q)
})

Meteor.publish('MyTrees', function(userId, myOrchardId, mytreeId) {

  let q = {userId: userId}

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  if (mytreeId) {
    q._id = mytreeId
    q.orchardId = myOrchardId
  }

  if (myOrchardId) {
    q.orchardId = myOrchardId
  }

  return MyTrees.find(q)

})

Meteor.publish('MyBenchsNames', function(userId, myOrchardId, mybenchId) {
  let q = {userId: userId}
  let fields = {name: true, orchardId: true}

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  if (mybenchId) {
    q._id = mybenchId
    q.orchardId = myOrchardId
  }

  if (myOrchardId) {
    q.orchardId = myOrchardId
  }

  return MyBenchs.find(q, {fields: fields})
})

Meteor.publish('MyBenchs', function(userId, myOrchardId, mybenchId) {

  let q = {userId: userId}

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  if (mybenchId) {
    q._id = mybenchId
    q.orchardId = myOrchardId

    return MyBenchs.find(q)
  }

  if (myOrchardId) {
    q.orchardId = myOrchardId
    return MyBenchs.find(q)
  }

  return MyBenchs.find(q)

})
