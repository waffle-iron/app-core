Template.treesTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this tree?")) {
       Trees.remove({
         _id: template.data._id
       })
    }
  }
});

Template.treesAdd.events({
  'keyup input[name="name"]': (event) => {
    $('#treeFormNew input[name="variant"]').val(() => {
      let input = $(event.target).val();
      if (input) { return `${input} común` }
      return '';
    })
  }
})