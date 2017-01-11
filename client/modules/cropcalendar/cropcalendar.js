Template.registerHelper('cropCalendarClass', (crop, month) => {
  
  if (!crop) return;

  if (!!crop.seedTime) {
    if (!!crop.seedTime.from) {
      if (!crop.seedTime.to) {
        if (crop.seedTime.from === month) {
          return 'green';
        }
      } else {
        if (crop.seedTime.from <= month) {
          return 'green';
        }
      }
    }

    if (!!crop.seedTime.to) {
      if (crop.seedTime.to >= month) {
        return 'green';
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
        if (crop.harvestTime.from <= month) {
          return 'yellow';
        }
      }
    }

    if (!!crop.harvestTime.to) {
      if (crop.harvestTime.to >= month) {
        return 'yellow';
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
        if (crop.seedTime.from <= month) {
          return 'Cosecha';
        }
      }
    }

    if (!!crop.seedTime.to) {
      if (crop.seedTime.to >= month) {
        return 'Cosecha';
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
        if (crop.harvestTime.from <= month) {
          return 'Siembra';
        }
      }
    }

    if (!!crop.harvestTime.to) {
      if (crop.harvestTime.to >= month) {
        return 'Siembra';
      }
    }
  }

  return '-';

})