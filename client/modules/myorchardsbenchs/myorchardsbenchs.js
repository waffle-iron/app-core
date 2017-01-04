Template.myOrchardsBenchsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this bench?")) {
       MyBenchs.remove({
         _id: template.data._id
       })
    }
  }
});