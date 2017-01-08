Meteor.methods({
  'userProfileSetGeo': function(data) {
    if (this.userId) {
      Meteor.users.update({
        _id: this.userId
      }, {
        $set: {'profile.geo': data}
      })
    }
  }
})