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

Template.myOrchards.onRendered(function() {
  GoogleMaps.load({ v: '3', key: 'AIzaSyBdHhCYmwljyGMK4qE4Bk0yO2mEKzlv6ko', libraries: 'geometry,places' });
});

Template.myOrchards.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      }
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
