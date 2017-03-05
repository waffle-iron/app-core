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

Template.myPlantsModalUpdate.helpers({
  doc: () => {
    return MyPlants.findOne({_id: Session.get('MyPlantsUpdatingId')})
  }
})

Template.myPlantsModalUpdate.onRendered(function () {
  Meteor.subscribe('MyOrchardsNames', Session.get('userId'))
  Meteor.subscribe('MyBenchsNames', Session.get('userId'))
})

Template.myPlantsModalUpdate.events({
  'change [name="orchardId"]': (event) => {
    let value = $(event.target).val()
    if (value) {
      Session.set('MyPlantsUpdatingOrchardId', value)
    }
  }
})

Template.myPlantsModalUpdate.helpers({
  benchs: function() {
    return MyBenchs.find({
      orchardId: Session.get('MyPlantsUpdatingOrchardId') || Session.get('orchardId')
    }).map( (c) => {
      return {label: `${c.name}`, value: c._id}
    })
  }
})
