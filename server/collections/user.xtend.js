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

Meteor.publish('userData', function () {

  let fields = {
    'services.twitter.profile_image_url_https': true,
    'services.facebook.id': true,
    'services.google.picture': true,
    'services.github.username': true,
    'services.instagram.profile_picture': true,
    'services.linkedin.pictureUrl': true,
    'profile.firstName': true,
    'profile.lastName': true,
    'profile.familyName': true,
    'profile.secondName': true,
    'profile.name': true,
    'geo': true
  }

  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: fields})
  } else {
    this.ready()
  }
})
