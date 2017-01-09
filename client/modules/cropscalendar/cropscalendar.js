Template.cropsCalendar.events({
  "click [data-action=crop]": function(event, template){
    Router.go('crops.one', {_id: $(event.target).data('cropid')});
  }
});

Template.registerHelper('cropsCalendarMonthClass', (month) => {
  if (month === new Date().getMonth() + 1) {
    return 'blue'
  }
})

Template.registerHelper('cropsCalendarText', (month) => {
  
  let r = '';
  Crops.find({'seedTime.from': month}).forEach(function(crop) {
    if (!crop) return;
    r += `<span data-action="crop" data-cropId="${crop._id}" class="btn btn-success btn-default">${crop.variant}</span>`
  })

  Crops.find({'harvestTime.from': month}).forEach(function(crop) {
    if (!crop) return;
    r += `<span data-action="crop" data-cropId="${crop._id}" class="btn btn-warning btn-default">${crop.variant}</span>`
  })

  return r;

})