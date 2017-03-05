/**
 * Copyright (c) 2016-2017 "Jose Constela" [jose@joseconstela.com]
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

Template.cropsCalendar.events({
  'click [data-action=crop]': function (event, template){
    Router.go('crops.one', {_id: $(event.target).data('cropid')})
  }
})

Template.registerHelper('cropsCalendarMonthClass', (month) => {
  if (month === new Date().getMonth() + 1) {
    return 'blue'
  }
})

Template.registerHelper('cropsCalendarText', (month) => {
  let r = ''
  Crops.find({'seedTime.from': month}).forEach(function (crop) {
    if (!crop) return
    r += `<span data-action="crop" data-cropId="${crop._id}" class="btn btn-success btn-default">${crop.variant}</span>`
  })
  Crops.find({'harvestTime.from': month}).forEach(function (crop) {
    if (!crop) return
    r += `<span data-action="crop" data-cropId="${crop._id}" class="btn btn-warning btn-default">${crop.variant}</span>`
  })
  return r
})
