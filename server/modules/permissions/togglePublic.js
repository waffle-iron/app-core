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

Meteor.methods({
  'switchPublic': (element) => {

    if (element.type === 'orchard') {
      MyOrchards.update({
        _id: element._id,
        userId: Meteor.user()._id,
      }, {
        $set: { public: element.public }
      })
    }
    else if (element.type === 'bench') {
      MyBenchs.update({
        _id: element._id,
        userId: Meteor.user()._id,
      }, {
        $set: { public: element.public }
      })
    }
    else if (element.type === 'logEntry') {
      MyLogEntries.update({
        _id: element._id,
        userId: Meteor.user()._id,
      }, {
        $set: { public: element.public }
      })
    }
    else if (element.type === 'tree') {
      MyTrees.update({
        _id: element._id,
        userId: Meteor.user()._id,
      }, {
        $set: { public: element.public }
      })
    }
    else if (element.type === 'plant') {
      MyPlants.update({
        _id: element._id,
        userId: Meteor.user()._id,
      }, {
        $set: { public: element.public }
      })
    }
  }
})
