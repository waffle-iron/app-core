// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['myOrchardsInsert'], {
  after: {
    insert: (doc) => {
      console.log(doc);
      Router.go( 'myorchards.one', { _id: doc._id } );
    }
  }
});