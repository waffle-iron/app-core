// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['myOrchardsInsert', 'myOrchardsUpdate'], {
  after: {
    insert: function(error, docId) {
      Router.go( 'myorchards.one', { _id: docId } );
    },
    update: function(error, result) {
      Router.go( 'myorchards.one', { _id: this.currentDoc._id } );
    }
  }
});