Template.registerHelper('moment', (type, date) => {
  if (!date) return '-'
  if (type === 'shortest') return moment(date).format('D MMM YY, HH:mm')
  if (type === 'shortestDay') return moment(date).format('D MMM YY')
})

Template.registerHelper('momentUnix', (type, date) => {
  if (!date) return '-'
  if (type === 'dowD') return moment.unix(date).format('dddd D')
})