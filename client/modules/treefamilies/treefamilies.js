Template.treesFamiliesTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar esta familia de árboles?")) {
       TreeFamilies.remove({
         _id: template.data._id
       })
    }
  }
});
