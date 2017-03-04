/**
 * Copyright (c) 2016-2016 "Jose Constela" [jose@joseconstela.com]
 * Tiempo de Siembra [http://app.tiempodesiembra.es]
 *
 * This file is part of iempo de Siembra core's app.
 *
 * Tiempo de Siembra is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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
