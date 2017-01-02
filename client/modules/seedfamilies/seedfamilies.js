Template.seedsFamiliesTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this seed family?")) {
       SeedFamilies.remove({
         _id: template.data._id
       })
    }
  }
});