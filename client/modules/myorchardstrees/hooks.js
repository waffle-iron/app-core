AutoForm.addHooks(['myOrchardsTreesInsert', 'myOrchardsTreesUpdate'], {
  after: {
    insert: function(error, docId) {
      if (error) return
      
      if (!!this.currentDoc.orchardId) {
        Router.go( 'myorchards.one', {
          _id: this.currentDoc.orchardId,
          userId: Meteor.user()._id
        } )
      } else {
        Router.go( 'myorchards.index' )
      }
    },
    update: function(error, docId) {
      if (error) return
      
      if (!!this.currentDoc.orchardId) {
        Router.go( 'myorchards.one', {
          _id: this.currentDoc.orchardId,
          userId: Meteor.user()._id
        } )
      } else {
        Router.go( 'myorchards.index' )
      }
    }
  }
})