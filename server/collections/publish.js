Meteor.publish('Crops', (cropId) => {
  return cropId ? Crops.find({_id: cropId}) : Crops.find()
})

Meteor.publish('CropsResume', (cropId) => {
  let f = {
    variant: 1,
    highlightedImage: 1,
    'seedTime': 1,
    'harvestTime': 1
  }
  return cropId ? Crops.find({_id: cropId}, {fields: f}) : Crops.find({}, {fields: f})
})

Meteor.publish('Herbs', (herbId) => {
  return herbId ? Herbs.find({_id: herbId}) : Herbs.find()
})

Meteor.publish('CropsNames', () => {
  return Crops.find({}, {fields: {name: 1, variant: 1}})
})

Meteor.publish('CropsTiming', () => {
  return Crops.find({}, {fields: {name: 1, variant: 1, seedTime: 1, harvestTime: 1}})
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

Meteor.publish('MyOrchards', function (myOrchardId) {

  if (!this.userId) { return null; }

  let q = myOrchardId ? {_id: myOrchardId} : {};
      q.userId = this.userId;

  return MyOrchards.find(q);
})


Meteor.publish('MyPlants', function(orchardId, benchId) {

  if (!this.userId) { return null }

  let q = { 
    benchId: benchId,
    userId: this.userId
  }

  if (orchardId) {
    q.orchardId = orchardId
  }

  return MyPlants.find(q)
})


Meteor.publish('MyLogEntries', function(type, typeId) {

  if (!this.userId) { return null }

  let q = { type: type }

  if (typeId) {
    q.typeId = typeId
  }

  q.userId = this.userId

  return MyLogEntries.find(q, {fields: { type: false, typeId: false }})
})

Meteor.publish('MyTrees', function(myOrchardId, mytreeId) {

  if (mytreeId) {
    return MyTrees.find({
      userId: this.userId,
      _id: mytreeId,
      orchardId: myOrchardId
    })
  }

  if (myOrchardId) {
    return MyTrees.find({
      userId: this.userId,
      orchardId: myOrchardId
    })
  }

  return MyTrees.find({
    userId: this.userId
  })

})

Meteor.publish('MyBenchs', function(myOrchardId, mybenchId) {
  
  if (mybenchId) {
    return MyBenchs.find({
      userId: this.userId,
      _id: mybenchId,
      orchardId: myOrchardId
    })
  }

  if (myOrchardId) {
    return MyBenchs.find({
      userId: this.userId,
      orchardId: myOrchardId
    })
  }

  return MyBenchs.find({
    userId: this.userId
  })

})