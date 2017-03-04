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

Template.registerHelper('isActive', (name) => {
  try {
    return Router.current().route.getName().indexOf(name) === 0
  } catch (Ex) {
    return false
  }
})

Template.registerHelper('isEq', (p1, p2) => p1 === p2)

Template.registerHelper('lockClass', (element) => {
  if (!element) return
  return element.public ? 'unlock' : 'lock'
})

Template.registerHelper('userId', () => Session.get('userId') )

Template.registerHelper('monthName', (number) => {
  if (typeof number === 'undefined') { return }
  return _.filter(monthSelector, (m) => {
    return m.value === number
  })[0].label
})

Template.registerHelper('expositionIcon', (faClass, number, max) => {
  let r = ''
  if (!max) max = 5

  if (typeof number === 'undefined') {
    faClass = 'fa-question'
    number = 0
  }

  for(var i = 0; i < max; i++) {
    let active = i < number ? 'active' : ''
    r += `<i class="fa ${faClass} ${active}" aria-hidden="true"></i>`
  }
  return `${r}`
})

Template.registerHelper('familyName', function(familyId) {
  if (!familyId) return
  let r = CropFamilies.findOne({_id: familyId})
  return r ? r.name : null
})

Template.registerHelper('myOrchardName', function(orchardId) {
  if (!orchardId) return
  let r = MyOrchards.findOne({_id: orchardId})
  return r ? r.name : null
})
