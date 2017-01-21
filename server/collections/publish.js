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

  let f = {
    variant: 1,
    highlightedImage: 1,
    'seedTime': 1,
    'harvestTime': 1
  }
  return Crops.find(q, {fields: f})
})

Meteor.publish('Herbs', (herbId) => {
  return herbId ? Herbs.find({_id: herbId}) : Herbs.find()
})

Meteor.publish('CropsNames', () => {

  let q = {}

  return Crops.find(q, {fields: {name: 1, variant: 1}})
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

  let q = myOrchardId ? {_id: myOrchardId} : {};
      q.userId = userId;

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  return MyOrchards.find(q);
})


Meteor.publish('MyPlants', function(userId, orchardId, benchId) {

  let q = { 
    benchId: benchId,
    userId: userId
  }

  if (orchardId) {
    q.orchardId = orchardId
  }

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  return MyPlants.find(q)
})


Meteor.publish('MyLogEntries', function(userId, type, typeId) {

  let q = { type: type, userId: userId }

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  if (typeId) {
    q.typeId = typeId
  }

  return MyLogEntries.find(q, {fields: { type: false, typeId: false }})
})

Meteor.publish('MyTrees', function(userId, myOrchardId, mytreeId) {

  let q = {userId: userId}

  if (!this.userId || this.userId !== userId) {
    q.public = true
  }

  if (mytreeId) {
    q._id = mytreeId
    q.orchardId = myOrchardId
    return MyTrees.find(q)
  }

  if (myOrchardId) {
    q.orchardId = myOrchardId
    return MyTrees.find(q)
  }

  return MyTrees.find(q)

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