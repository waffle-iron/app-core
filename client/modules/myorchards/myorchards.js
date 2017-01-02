Template.myOrchardsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar este huerto?")) {
       MyOrchards.remove({
         _id: template.data._id
       })
    }
  }
});
