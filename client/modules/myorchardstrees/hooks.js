AutoForm.addHooks(['myOrchardsTreesInsert', 'myOrchardsTreesUpdate'], {
  after: {
    insert: function() {
      if (!!this.currentDoc.orchardId) {
        Router.go( 'myorchards.one', { _id: this.currentDoc.orchardId } )
      } else {
        Router.go( 'myorchards.index' )
      }
    },
    update: function() {
      if (!!this.currentDoc.orchardId) {
        Router.go( 'myorchards.one', { _id: this.currentDoc.orchardId } )
      } else {
        Router.go( 'myorchards.index' )
      }
    }
  }
})