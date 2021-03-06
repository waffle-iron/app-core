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

Template.myOrchardPlantsTableItem.events({
  'click .plant-modal-update': function(e) {
    e.preventDefault()
    e.stopPropagation()
    Session.set('MyPlantsUpdatingId', this._id)
    $('#plant-modal-update').modal('show')
  }
})

Template.myOrchardTreesTableItem.events({
  'click .remove-item': function(event, template){
    if (confirm('¿Eliminar este árbol?')) {
      Meteor.call('myTrees-remove', template.data._id)
    }
  }
})

Template.myOrchardBenchsTableItem.events({
  'click .remove-item': function(event, template){
    if (confirm('¿Eliminar este bancal?')) {
      Meteor.call('myBenchs-remove', template.data._id)
    }
  }
})

Template.myOrchardPlantsTableItem.events({
  'click .remove-item': function(event, template){
    if (confirm('¿Eliminar esta planta?')) {
      Meteor.call('myPlants-remove', template.data._id)
    }
  }
})

Template.myOrchardsTableItem.events({
  'click .remove-item': function(event, template){
    if (confirm('¿Eliminar este huerto?')) {
      Meteor.call('myOrchards-remove', template.data._id)
    }
  },
  'click .toggle-public': function() {
    Meteor.call('switchPublic', {
      type: 'orchard',
      _id: this._id,
      public: !this.public
    })
  }
})
