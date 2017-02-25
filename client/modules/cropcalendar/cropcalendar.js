Template.registerHelper('cropCalendarClass', (crop, month) => {

  if (!crop) return;

  if (!!crop.seedTime) {
    if (!!crop.seedTime.from) {
      if (!crop.seedTime.to) {
        if (crop.seedTime.from === month) {
          return 'green';
        }
      } else {
        if (month >= crop.seedTime.from && month <= crop.seedTime.to) {
          return 'green';
        }
      }
    }
  }

  if (!!crop.seedTime) {
    if (!!crop.harvestTime.from) {
      if (!crop.harvestTime.to) {
        if (crop.harvestTime.from === month) {
          return 'yellow';
        }
      } else {
        if (month >= crop.harvestTime.from && month <= crop.harvestTime.to) {
          return 'yellow';
        }
      }
    }

  }

  return 'gray';

})

Template.registerHelper('cropCalendarMonthClass', (month) => {
  if (month === new Date().getMonth() + 1) {
    return 'active'
  }
})

Template.registerHelper('cropCalendarText', (crop, month) => {

  if (!crop) return;

  if (!!crop.seedTime) {
    if (!!crop.seedTime.from) {
      if (!crop.seedTime.to) {
        if (crop.seedTime.from === month) {
          return 'Cosecha';
        }
      } else {
        if (month >= crop.seedTime.from && month <= crop.seedTime.to) {
          return 'Cosecha';
        }
      }
    }

  }

  if (!!crop.seedTime) {
    if (!!crop.harvestTime.from) {
      if (!crop.harvestTime.to) {
        if (crop.harvestTime.from === month) {
          return 'Siembra';
        }
      } else {
        if (month >= crop.harvestTime.from && month <= crop.harvestTime.to) {
          return 'Siembra';
        }
      }
    }

  }

  return '-';

})
