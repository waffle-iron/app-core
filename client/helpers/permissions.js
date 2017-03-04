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

Template.registerHelper('canEdit', function(item) {
  if (!item) return false
  if (!Meteor.user()) return false
  if (Meteor.user()._id === item.userId) return true
  /* if (Roles.userIsInRole(Meteor.user()._id, ['super-admin'], Roles.GLOBAL_GROUP)) {
    return true
  } */
  return false
})

Template.registerHelper('canCreate', function() {
  if (!Meteor.user()) return false
  var u = Router.current().location.get().path.split('/')
  if (Meteor.user()._id === u[1]) return true
  /* if (Roles.userIsInRole(Meteor.user()._id, ['super-admin'], Roles.GLOBAL_GROUP)) {
    return true
  } */
  return false
})
