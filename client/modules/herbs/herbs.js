Template.herbsAdd.rendered = function() {
}

Template.herbsEdit.rendered = function() {
}

Template.herbsView.events({
  "click [data-action=herb]": function(event, template){
    Router.go('herbs.one', {_id: $(event.target).data('herbid')});
  }
});

Template.herbsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar esta hierba?")) {
       Herbs.remove({
         _id: template.data._id
       })
    }
  }
});
