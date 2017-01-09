Template.registerHelper('isActive', (name) => {
  try {
    return Router.current().route.getName().indexOf(name) === 0;
  } catch (Ex) {
    return false;
  }
})

Template.registerHelper('monthName', (number) => {
  if (typeof number === 'undefined') { return; }
  return _.filter(monthSelector, (m) => {
    return m.value === number
  })[0].label;
})

Template.registerHelper('stars', (number) => {
  if (!number) return '-';

  let r = '';
  for(var i = 0; i<number; i++){
    r += '⭐️'
  }
  return `${r} ${number}/10`;
})

Template.registerHelper('moons', (number) => {
  if (!number) return '-';

  let r = '';
  for(var i = 0; i<number; i++){
    r += '🌑'
  }
  return `${r} ${number}/10`;
})

Template.registerHelper('water', (number) => {
  if (!number) return '-';

  let r = '';
  for(var i = 0; i<number; i++){
    r += '🚰'
  }
  return `${r} ${number}/10`;
})

Template.registerHelper('familyName', function(familyId) {
  if (!familyId) return;
  return CropFamilies.findOne({_id:familyId}).name;
})

Template.registerHelper('myOrchardName', function(orchardId) {
  if (!orchardId) return;
  return MyOrchards.findOne({_id:orchardId}).name;
})

