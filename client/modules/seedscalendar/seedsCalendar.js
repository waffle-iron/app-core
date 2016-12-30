Template.seedsCalendar.events({
  "click [data-action=seed]": function(event, template){
    Router.go('seeds.one', {_id: $(event.target).data('seedid')});
  }
});

Template.registerHelper('seedsCalendarMonthClass', (month) => {
  if (month === new Date().getMonth() + 1) {
    return 'blue'
  }
})

Template.registerHelper('seedsCalendarText', (month) => {
  
  let r = '';
  Seeds.find({'seedTime.from': month}).forEach(function(seed) {
    if (!seed) return;
    r += `<span data-action="seed" data-seedId="${seed._id}" class="btn btn-success btn-default">${seed.variant}</span>`
  })

  Seeds.find({'harvestTime.from': month}).forEach(function(seed) {
    if (!seed) return;
    r += `<span data-action="seed" data-seedId="${seed._id}" class="btn btn-warning btn-default">${seed.variant}</span>`
  })

  return r;

})