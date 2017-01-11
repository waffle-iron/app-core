AutoForm.addHooks(['myBenchsNew', 'myBenchsUpdate'], {
  after: {
    insert: function(error, docId) {
      if (error) return

      if (!!this.currentDoc.orchardId) {
        Router.go( 'myorchards.one.benchs.one', { 
          _id: this.currentDoc.orchardId,
          bench: docId
        } )
      } else {
        Router.go( 'myorchards.index' )
      }
    },
    update: function(error, docId) {
      if (error) return
      
      if (!!this.currentDoc.orchardId) {
        Router.go( 'myorchards.one.benchs.one', { 
          _id: this.currentDoc.orchardId,
          bench: docId
        } )
      } else {
        Router.go( 'myorchards.index' )
      }
    }
  }
})