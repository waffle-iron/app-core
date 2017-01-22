Meteor.methods({
  'switchPublic': (element) => {
    if (element.type === 'orchard') {
      MyOrchards.update({
        _id: element._id,
        userId: Meteor.user()._id,
      }, {
        $set: { public: element.public }
      })
    }
    else if (element.type === 'bench') {
      MyBenchs.update({
        _id: element._id,
        userId: Meteor.user()._id,
      }, {
        $set: { public: element.public }
      })
    }
  }
})