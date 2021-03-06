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

/**
 *
 * Additional resources:
 *  Crop composition addon for MeteorJS collections:
 *  https://gist.github.com/joseconstela/faa697658e76f757bea683caf48ebf60
 */

Crops = new Mongo.Collection('crop')

// Define the schema
CropSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    max: 200
  },
  userId: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  variant: {
    type: String,
    label: 'Variante',
    max: 200
  },
  family: {
    type: String,
    label: 'Familia',
    autoform: {
      options: () => {
        return CropFamilies.find().map((c) => {
          return {label: c.name, value: c._id}
        })
      }
    },
    optional: true
  },
  binomial: {
    type: String,
    label: 'Nombre científico',
    optional: true
  },
  seedTime: {
    type: Object,
    label: 'Siembra',
    optional: true
  },
  'seedTime.from': {
    type: Number,
    label: 'Desde',
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  'seedTime.to': {
    type: Number,
    label: 'Hasta',
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  'seedingType': {
    label: 'Tipo de siembra',
    type: Object,
    optional: true
  },
  'seedingType.direct': {
    label: 'Siembra directa',
    type: Boolean,
    optional: true
  },
  'seedingType.directProtected': {
    label: 'Directa protegida',
    type: Boolean,
    optional: true
  },
  'seedingType.bed': {
    label: 'Semillero',
    type: Boolean,
    optional: true
  },
  'seedingType.hotbed': {
    label: 'Semillero caliente',
    type: Boolean,
    optional: true
  },
  'seedingType._ok': {
    label: 'Datos analizados',
    type: Boolean,
    optional: true
  },
  harvestTime: {
    type: Object,
    label: 'Cosecha',
    optional: true
  },
  'harvestTime.from': {
    type: Number,
    label: 'Desde',
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  'harvestTime.to': {
    type: Number,
    label: 'Hasta',
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  coldSupport: {
    type: Number,
    label: 'Resistencia al frío (grados mínimos)',
    optional: true
  },
  notes: {
    type: Array,
    optional: true,
    label: 'Notas',
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
  spaccing: {
    type: Object,
    label: 'Separación',
    optional: true
  },
  'spaccing.seed': {
    type: Number,
    label: 'Semillas',
    optional: true
  },
  'spaccing.seedDeep': {
    type: Number,
    label: 'Profundidad semillas',
    optional: true
  },
  'spaccing.plant': {
    type: Number,
    label: 'Plantas',
    optional: true
  },
  'spaccing.plantLines': {
    type: Number,
    label: 'Lineas de plantación',
    optional: true
  },
  land: {
    type: Object,
    label: 'Tierra',
    optional: true
  },
  'land.type': {
    type: Object,
    label: 'Tipo'
  },
  'land.type.any': {
    type: Boolean,
    label: 'Admite cualquier tipo'
  },
  'land.type.preferred': {
    type: String,
    label: 'Tipo preferido',
    optional: true
  },
  'land.type._ok': {
    type: Boolean,
    label: 'Dato analizado',
    optional: true
  },
  'land.ph': {
    type: Object,
    label: 'PH',
    optional: true
  },
  'land.ph.from': {
    type: Number,
    decimal: true,
    label: 'Desde',
    optional: true
  },
  'land.ph.to': {
    type: Number,
    decimal: true,
    label: 'Hasta',
    optional: true
  },
  sun: {
    type: Object,
    label: 'Exposición al sol',
    optional: true
  },
  'sun.exposition': {
    type: Number,
    label: 'Grado',
    optional: true,
    min: 0,
    max: 5
  },
  'sun.description': {
    type: String,
    label: 'Descripción',
    optional: true
  },
  'water': {
    type: Object,
    label: 'Agua',
    optional: true
  },
  'water.exposition': {
    type: Number,
    decimal: true,
    min: 0,
    max: 5,
    label: 'Grado de regado',
    optional: true
  },
  'water.description': {
    type: String,
    label: 'Descipción',
    optional: true
  },
  associations: {
    type: Object,
    label: 'Asociaciones',
    optional: true
  },
  'associations.ok': {
    type: Array,
    label: 'Compatibilidades',
    optional: true
  },
  'associations.ok.$': {
    type: String,
    autoform: {
      options: () => {
        return Crops.find().map( (c) => {
          return {label: `${c.variant} - ${c.name}`, value: c._id}
        })
      }
    }
  },
  'associations.no': {
    type: Array,
    label: 'Incompatibilidades',
    optional: true
  },
  'associations.no.$': {
    type: String,
    autoform: {
      options: () => {
        return Crops.find().map( (c) => {
          return {label: `${c.variant} - ${c.name}`, value: c._id}
        })
      }
    }
  },

  info: {
    type: Object,
    label: 'Info',
    optional: true
  },

  'info.seed': {
    type: Array,
    optional: true,
    label: 'Semilla'
  },
  'info.seed.$': {
    type: Object,
    optional: true
  },
  'info.seed.$.name': {
    type: String,
    optional: true,
    label: 'Nombre'
  },
  'info.seed.$.url': {
    type: String,
    optional: true,
    label: 'URL'
  },
  'info.seed.$.isVideo': {
    type: Boolean,
    optional: true,
    label: '¿En un vídeo?'
  },
  'info.seed.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: '¿Es un contenido destacado?'
  },
  'info.seed.$.lastChecked': {
    type: Date,
    optional: true,
    label: 'Última comprobación'
  },
  'info.seeding': {
    type: Array,
    optional: true,
    label: 'Siembra'
  },
  'info.seeding.$': {
    type: Object,
    optional: true
  },
  'info.seeding.$.name': {
    type: String,
    optional: true,
    label: 'Nombre'
  },
  'info.seeding.$.url': {
    type: String,
    optional: true,
    label: 'URL'
  },
  'info.seeding.$.isVideo': {
    type: Boolean,
    optional: true,
    label: '¿En un vídeo?'
  },
  'info.seeding.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: '¿Es un contenido destacado?'
  },
  'info.seeding.$.lastChecked': {
    type: Date,
    optional: true,
    label: 'Última comprobación'
  },

  'info.harvest': {
    type: Array,
    optional: true,
    label: 'Cosecha'
  },
  'info.harvest.$': {
    type: Object,
    optional: true
  },
  'info.harvest.$.name': {
    type: String,
    optional: true,
    label: 'Nombre'
  },
  'info.harvest.$.url': {
    type: String,
    optional: true
  },
  'info.harvest.$.isVideo': {
    type: Boolean,
    optional: true,
    label: '¿En un vídeo?'
  },
  'info.harvest.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: '¿Es un contenido destacado?'
  },
  'info.harvest.$.lastChecked': {
    type: Date,
    optional: true,
    label: 'Última comprobación'
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
    label: 'Nombre'
  },
  'info.general.$.url': {
    type: String,
    optional: true,
    label: 'URL'
  },
  'info.general.$.isVideo': {
    type: Boolean,
    optional: true,
    label: '¿En un vídeo?'
  },
  'info.general.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: '¿Es un contenido destacado?'
  },
  'info.general.$.lastChecked': {
    type: Date,
    optional: true,
    label: 'Última comprobación'
  },

  highlightedImage: {
    type: String,
    optional: true,
    label: 'Imagen destacada'
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


});

Crops.attachSchema(CropSchema);
