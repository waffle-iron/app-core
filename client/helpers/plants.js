Template.registerHelper('compatiblePlants', function(plant, type) {
  if (!plant || !plant.associations || !plant.associations.ok) return;
  let r = '';
  plant.associations.ok.forEach(function(ok) {
    if (!ok) return;
    let n = Herbs.findOne({_id:ok})
    if (n) r += `<span data-action="herb" data-herbId="${ok}" class="btn btn-default btn-default">${n.variant}</span>`
  })  
  return r;
})

Template.registerHelper('incompatiblePlants', function(plant) {
  if (!plant || !plant.associations || !plant.associations.no) return;
  let r = '';
  plant.associations.no.forEach(function(no) {
    if (!no) return;
    let n = Seeds.findOne({_id:no})
    if (n) r += `<span data-action="seed" data-seedId="${no}" class="btn btn-default btn-default">${n.variant}</span>`
  })
  return r;
})