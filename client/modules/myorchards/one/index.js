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

'use strict'

Template.myOrchardsViewShareToggle.events({
  'click button': function() {
    Meteor.call('switchPublic', {
      type: 'orchard',
      _id: this.myOrchard._id,
      public: !this.myOrchard.public
    })
  }
})

Template.myOrchardsOneTreesTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar este árbol de tu huerto?")) {
       MyTrees.remove({
         _id: template.data._id
       })
    }
  }
});

Template.myOrchardsOneBenchsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("¿Eliminar este bancal de tu huerto?")) {
       MyBenchs.remove({
         _id: template.data._id
       })
    }
  }
});
