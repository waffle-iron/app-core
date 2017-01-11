Meteor.methods({
  'cropRecomendations': (ids) => {
    if (!ids || !Array.isArray(ids)) return false

    return Crops.find({
      'associations.ok': { $in: ids },
      'associations.no': { $nin: ids },
    }, {fields: {
      name: 1,
      variant: 1,
      _id: 1
    }}).fetch()
  }
})