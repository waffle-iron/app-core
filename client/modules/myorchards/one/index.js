'use strict'

Template.myOrchardsViewShareToggle.events({
  'click button': function() {
    Meteor.call('switchPublic', {
      type: 'orchard',
      _id: this.myOrchard._id,
      public: !this.myOrchard.public
    })
  }
})

Template.myOrchardsOneTreesTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar este árbol de tu huerto?")) {
       MyTrees.remove({
         _id: template.data._id
       })
    }
  }
});

Template.myOrchardsOneBenchsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar este bancal de tu huerto?")) {
       MyBenchs.remove({
         _id: template.data._id
       })
    }
  }
});
