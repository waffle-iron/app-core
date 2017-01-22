AutoForm.addHooks(['myBenchsNew', 'myBenchsUpdate'], {
  after: {
    insert: function(error, docId) {
      if (error) return

      if (!!this.currentDoc.orchardId) {
        Router.go( 'myorchards.one.benchs.one', {
          userId: Meteor.user()._id, 
          _id: this.currentDoc.orchardId,
          bench: docId
        } )
      } else {
        Router.go( 'myorchards.index' )
      }
    },
    update: function(error, sucess) {
      if (error) return

      if (!!this.currentDoc.orchardId) {
        Router.go( 'myorchards.one.benchs.one', {
          userId: Meteor.user()._id, 
          _id: this.currentDoc.orchardId,
          bench: this.currentDoc._id
        } )
      } else {
        Router.go( 'myorchards.index' )
      }
    }
  }
})