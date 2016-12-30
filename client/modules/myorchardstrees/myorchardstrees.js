Template.myOrchardsTreesTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar este árbol de tu huerto?")) {
       MyTrees.remove({
         _id: template.data._id
       })
    }
  }
});
