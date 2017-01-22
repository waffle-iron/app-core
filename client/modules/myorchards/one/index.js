'use strict'

Template.myOrchardsViewShareToggle.events({
  'click button': function() {
    Meteor.call('switchPublic', {
      type: 'orchard',
      _id: this.myOrchard._id,
      public: !this.myOrchard.public
    })
  }
})