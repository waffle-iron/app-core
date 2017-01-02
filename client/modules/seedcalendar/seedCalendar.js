Template.registerHelper('seedCalendarClass', (seed, month) => {
  
  if ((!!seed && seed.seedTime)
    && (seed.seedTime.from === month
     || seed.seedTime.to === month)) {
      return 'green'
    }

  if ((!!seed && seed.seedTime)
    && (seed.harvestTime.from === month
    || seed.harvestTime.to === month)) {
      return 'yellow'
    }

  return 'gray';
})

Template.registerHelper('seedCalendarMonthClass', (month) => {
  if (month === new Date().getMonth() + 1) {
    return 'active'
  }
})

Template.registerHelper('seedCalendarText', (seed, month) => {
  if ((!!seed && seed.seedTime)
    && (seed.seedTime.from === month
    || seed.seedTime.to === month)) {
      return 'Siembra'
    }

  if ((!!seed && seed.seedTime)
    && (seed.harvestTime.from === month
    || seed.harvestTime.to === month)) {
      return 'Cosecha'
    }

  return '-'
})