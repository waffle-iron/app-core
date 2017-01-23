Template.shareToggle.events({
  'click button': function() {
    Meteor.call('switchPublic', {
      type: this.type,
      _id: this._id,
      public: !this.public
    })
  }
})