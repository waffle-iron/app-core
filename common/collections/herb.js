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

Herbs = new Mongo.Collection("herb");

Herbs.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
Herbschema = new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  associations: {
    type: Object,
    label: "Asociaciones",
    optional: true
  },
  notes: {
    type: Array,
    optional: true,
    label: "Notas",
    autoform: {
      rows: 10
    },
    optional: true
  },
  'notes.$': {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  'associations.ok': {
    type: Array,
    label: "Compatibilidades",
    optional: true
  },
  'associations.ok.$': {
    type: Object,
  },
  'associations.ok.$.seed': {
    type: String,
    label: "Semilla",
    autoform: {
      options: () => {
        return Seeds.find().map( (c) => {
          return {label: `${c.variant} - ${c.name}`, value: c._id}
        })
      }
    }
  },
  'associations.ok.$.reason': {
    type: String,
    label: "Motivo",
    optional: true
  },
  'associations.no': {
    type: Array,
    label: "Incompatibilidades",
    optional: true
  },
  'associations.no.$': {
    type: Object
  },
  'associations.no.$.seed': {
    type: String,
    label: "Semilla",
    autoform: {
      options: () => {
        return Seeds.find().map( (c) => {
          return {label: `${c.variant} - ${c.name}`, value: c._id}
        })
      }
    }
  },
  'associations.no.$.reason': {
    type: String,
    label: "Motivo",
    optional: true
  },
  info: {
    type: Object,
    label: "Info",
    optional: true
  },
  'info.seeding': {
    type: Array,
    optional: true,
    label: "Siembra"
  },
  'info.seeding.$': {
    type: Object,
    optional: true
  },
  'info.seeding.$.name': {
    type: String,
    optional: true,
    label: "Nombre"
  },
  'info.seeding.$.url': {
    type: String,
    optional: true,
    label: "URL"
  },
  'info.seeding.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
  },
  'info.general': {
    type: Array,
    optional: true
  },
  'info.general.$': {
    type: Object,
    optional: true
  },
  'info.general.$.name': {
    type: String,
    optional: true,
    label: "Nombre"
  },
  'info.general.$.url': {
    type: String,
    optional: true,
    label: "URL"
  },
  'info.general.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    autoform: {
      type: 'hidden'
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  imageHighlighted: {
    type: String,
    optional: true
  }
});

Herbs.attachSchema(Herbschema);
