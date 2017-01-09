Template.cropsFamiliesTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar esta familia de cultivos?")) {
       CropFamilies.remove({
         _id: template.data._id
       })
    }
  }
});