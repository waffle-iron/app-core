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

// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['myOrchardsInsert', 'myOrchardsUpdate'], {
  after: {
    insert: function(error, docId) {
      if (error) return

      if (docId) {
        Router.go( 'myorchards.one', { userId: Meteor.user()._id, _id: docId } );
      }
    },
    update: function(error, result) {
      if (error) return

      if (this.currentDoc && this.currentDoc._id) {
        Router.go( 'myorchards.one', { userId: Meteor.user()._id, _id: this.currentDoc._id } );
      }
    }
  }
});
