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

MyBenchs = new Mongo.Collection("mybench");

MyBenchs.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
MyBenchsSchema = new SimpleSchema({
  uuid: {
    type: String,
    optional: false,
    autoValue: function() {
      if (this.isInsert) {
        return uuid.new();
      } else if (this.isUpsert) {
        return {$setOnInsert: uuid.new()};
      } else {
        if (!this.isSet) {
          return uuid.new()
        }
        this.unset();  // Prevent user from supplying their own value
      }
    },
    autoform: {
      type: 'hidden'
    }
  },
  userId: {
    type: String,
    optional: false,
    autoValue: function() {
      if (!this.isSet) {
        return Meteor.userId()
      }
    },
    autoform: {
      type: 'hidden'
    }
  },
  orchardId: {
    type: String,
    optional: true,
    max: 20,
    autoform: {
      options: () => {
        return MyOrchards.find().map( (c) => {
          return {label: `${c.name}`, value: c._id}
        })
      }
    },
    label: "Huerto"
  },
  name: {
    type: String,
    max: 200,
    label: "Nombre"
  },
  userId: {
    type: String,
    optional: false,
    autoValue: function() {
      if (!this.isSet) {
        return Meteor.userId()
      }
    },
    autoform: {
      type: 'hidden'
    }
  },
  public: {
    type: Boolean,
    optional: true,
    label: "Hacer público"
  },
  dimmensions: {
    type: Object,
    optional: true,
    label: 'Dimensiones (en cm)'
  },
  'dimmensions.long': {
    type: Number,
    optional: true,
    label: 'Largo'
  },
  'dimmensions.high': {
    type: Number,
    optional: true,
    label: 'Alto'
  },
  'dimmensions.width': {
    type: Number,
    optional: true,
    label: 'Ancho'
  },
  plants: {
    type: Array,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  'plants.$': {
    type: String
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
      return new Date();
    },
    optional: true,
    autoform: {
      type: 'hidden'
    }
  }
});

MyBenchs.attachSchema(MyBenchsSchema);
