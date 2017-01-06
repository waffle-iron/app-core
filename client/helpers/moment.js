Template.registerHelper('moment', (type, date) => {
  return moment(date).format('D MMM YY, HH:mm')
})