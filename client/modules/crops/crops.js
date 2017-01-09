Template.cropsAdd.rendered = function() {
}

Template.cropsEdit.rendered = function() {
}

Template.cropsView.events({
  "click [data-action=crop]": function(event, template){
    Router.go('crops.one', {_id: $(event.target).data('cropId')});
  }
});

Template.cropsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar este cultivo?")) {
       Crops.remove({
         _id: template.data._id
       })
    }
  }
});

Template.cropsAdd.events({
  'keyup input[name="name"]': (event) => {
    $('#cropFormInsert input[name="variant"]').val(() => {
      let input = $(event.target).val();
      if (input) { return `${input} común` }
      return '';
    })
  }
})

Template.registerHelper('compatibleCrops', function() {
  if (!this.crop || !this.crop.associations || !this.crop.associations.ok) return;
  let r = '';
  this.crop.associations.ok.forEach(function(ok) {
    if (!ok) return;
    let n = Crops.findOne({_id:ok})
    if (n) r += `<span data-action="crop" data-cropId="${ok}" class="btn btn-default btn-default">${n.variant}</span>`
  })  
  return r;
})

Template.registerHelper('incompatibleCrops', function() {
  if (!this.crop || !this.crop.associations || !this.crop.associations.no) return;
  let r = '';
  this.crop.associations.no.forEach(function(no) {
    if (!no) return;
    let n = Crops.findOne({_id:no})
    if (n) r += `<span data-action="crop" data-cropId="${no}" class="btn btn-default btn-default">${n.variant}</span>`
  })
  return r;
})