// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['seedFormInsert', 'seedFormUpdate'], {
  before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    update: (doc, a, b) => {
      return doc;
    },
    insert: (doc) => {
      return doc;
    }
  }
});