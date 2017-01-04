Meteor.methods({
  'myOrchards-remove': (myOrchardId) => {

    if (!Meteor.user()) throw Error()

    MyOrchards.remove({
      _id: myOrchardId,
      userId: Meteor.user()._id
    })

    MyTrees.update({
      orchardId: myOrchardId,
      userId: Meteor.user()._id
    }, {
      $set: {orchardId: null}
    }, {
      multi: 1
    });

    MyBenchs.update({
      orchardId: myOrchardId,
      userId: Meteor.user()._id
    }, {
      $set: {orchardId: null}
    }, {
      multi: 1
    });

    return true;
  }
})