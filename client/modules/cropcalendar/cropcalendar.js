Template.registerHelper('cropCalendarClass', (crop, month) => {
  
  if ((!!crop && crop.seedTime)
    && (crop.seedTime.from === month
     || crop.seedTime.to === month)) {
      return 'green'
    }

  if ((!!crop && crop.seedTime)
    && (crop.harvestTime.from === month
    || crop.harvestTime.to === month)) {
      return 'yellow'
    }

  return 'gray';
})

Template.registerHelper('cropCalendarMonthClass', (month) => {
  if (month === new Date().getMonth() + 1) {
    return 'active'
  }
})

Template.registerHelper('cropCalendarText', (crop, month) => {
  if ((!!crop && crop.seedTime)
    && (crop.seedTime.from === month
    || crop.seedTime.to === month)) {
      return 'Siembra'
    }

  if ((!!crop && crop.seedTime)
    && (crop.harvestTime.from === month
    || crop.harvestTime.to === month)) {
      return 'Cosecha'
    }

  return '-'
})