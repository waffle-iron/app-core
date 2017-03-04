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

CropsAfterUpdate = (userId, doc) => {
  if (!doc.associations) {
    return;
  }

  Crops.direct.update(
    {},
    {
      $pull: {
        'associations.ok': doc._id,
        'associations.no': doc._id
      }
    },
    {
      multi: true
    }
  )

  if (!!doc.associations.ok) {
    Crops.direct.update(
      {_id: { $in: doc.associations.ok }},
      {
        $addToSet: { 'associations.ok': doc._id }
      },
      {
        multi: true
      }
    );
  }

  if (!!doc.associations.no) {
    Crops.direct.update(
      {_id: { $in: doc.associations.no }},
      {
        $addToSet: { 'associations.no': doc._id }
      },
      {
        multi: true
      }
    );
  }

  return;
}

Crops.before.insert( function(userId, doc) {

  if (!Roles.userIsInRole(userId, 'super-admin', Roles.GLOBAL_GROUP)) {
    doc.userId = userId
  } else {
    delete doc.userId
  }

} )

Crops.after.insert( function(userId, doc) {
  return CropsAfterUpdate(userId, doc)
} );

Crops.after.update(function (userId, doc, fieldNames, modifier, options) {
  return CropsAfterUpdate(userId, doc);
});
