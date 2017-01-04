// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['myOrchardsInsert'], {
  after: {
    insert: function(error, docId) {
      Router.go( 'myorchards.one', { _id: docId } );
    }
  }
});