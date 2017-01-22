Template.registerHelper('isActive', (name) => {
  try {
    return Router.current().route.getName().indexOf(name) === 0;
  } catch (Ex) {
    return false;
  }
})

Template.registerHelper('isEq', (p1, p2) => p1 === p2)

Template.registerHelper('lockClass', (element) => {
  if (!element) return
  return element.public ? 'unlock' : 'lock'
})

Template.registerHelper('userId', () => Session.get('userId') )

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
  if (!number) return '-'

  let r = ''
  for(var i = 0; i<number; i++){
    r += '🚰'
  }
  return `${r} ${number}/10`
})

Template.registerHelper('familyName', function(familyId) {
  if (!familyId) return
  let r = CropFamilies.findOne({_id:familyId})
  return r ? r.name : null
})

Template.registerHelper('myOrchardName', function(orchardId) {
  if (!orchardId) return
  let r = MyOrchards.findOne({_id:orchardId})
  return r ? r.name : null
})
