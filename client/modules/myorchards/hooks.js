// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['myOrchardsInsert', 'myOrchardsUpdate'], {
  after: {
    insert: function(error, docId) {
      if (error) return
      
      if (docId) {
        Router.go( 'myorchards.one', { userId: Meteor.user()._id, _id: docId } );
      }
    },
    update: function(error, result) {
      if (error) return

      if (this.currentDoc && this.currentDoc._id) {
        Router.go( 'myorchards.one', { userId: Meteor.user()._id, _id: this.currentDoc._id } );
      }
    }
  }
});