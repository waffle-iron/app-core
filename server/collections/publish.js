Meteor.publish('Seeds', (seedId) => {
  return seedId ? Seeds.find({_id: seedId}) : Seeds.find()
})

Meteor.publish('Herbs', (herbId) => {
  return herbId ? Herbs.find({_id: herbId}) : Herbs.find()
})

Meteor.publish('SeedsNames', () => {
  return Seeds.find({}, {fields: {name: 1, variant: 1}})
})

Meteor.publish('SeedsTiming', () => {
  return Seeds.find({}, {fields: {name: 1, variant: 1, seedTime: 1, harvestTime: 1}})
})

Meteor.publish('TreesVariants', () => {
  return Trees.find({}, {fields: {variant: 1}})
})

Meteor.publish('SeedFamilies', (seedFamilyId) => {
  return seedFamilyId ? SeedFamilies.find({_id: seedFamilyId}) : SeedFamilies.find({})
})

Meteor.publish('TreeFamilies', (treeFamilyId) => {
  return treeFamilyId ? TreeFamilies.find({_id: treeFamilyId}) : TreeFamilies.find({})
})

Meteor.publish('Trees', (treeId) => {
  return treeId ? Trees.find({_id: treeId}) : Trees.find({})
})

Meteor.publish('MyOrchards', (myOrchardId) => {
  return myOrchardId ? MyOrchards.find({_id: myOrchardId}) : MyOrchards.find({})
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