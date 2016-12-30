Template.seedsAdd.rendered = function() {
}

Template.seedsEdit.rendered = function() {
}

Template.seedsView.events({
  "click [data-action=seed]": function(event, template){
    Router.go('seeds.one', {_id: $(event.target).data('seedid')});
  }
});

Template.seedsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar esta semilla?")) {
       Seeds.remove({
         _id: template.data._id
       })
    }
  }
});

Template.seedsAdd.events({
  'keyup input[name="name"]': (event) => {
    $('#seedFormInsert input[name="variant"]').val(() => {
      let input = $(event.target).val();
      if (input) { return `${input} común` }
      return '';
    })
  }
})

Template.registerHelper('compatibleSeeds', function() {
  if (!this.seed || !this.seed.associations || !this.seed.associations.ok) return;
  let r = '';
  this.seed.associations.ok.forEach(function(ok) {
    if (!ok) return;
    let n = Seeds.findOne({_id:ok})
    if (n) r += `<span data-action="seed" data-seedId="${ok}" class="btn btn-default btn-default">${n.variant}</span>`
  })  
  return r;
})

Template.registerHelper('incompatibleSeeds', function() {
  if (!this.seed || !this.seed.associations || !this.seed.associations.no) return;
  let r = '';
  this.seed.associations.no.forEach(function(no) {
    if (!no) return;
    let n = Seeds.findOne({_id:no})
    if (n) r += `<span data-action="seed" data-seedId="${no}" class="btn btn-default btn-default">${n.variant}</span>`
  })
  return r;
})