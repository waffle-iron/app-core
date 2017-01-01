Seeds = new Mongo.Collection("seed");

Seeds.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
SeedSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  variant: {
    type: String,
    label: "Variante",
    max: 200
  },
  family: {
    type: String,
    label: "Familia",
    autoform: {
      options: () => {
        return SeedFamilies.find().map( (c) => {
          return {label: c.name, value: c._id}
        })
      }
    },
    optional: true
  },
  seedTime: {
    type: Object,
    label: "Siembra",
    optional: true
  },
  'seedTime.from': {
    type: Number,
    label: "Desde",
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  'seedTime.to': {
    type: Number,
    label: "Hasta",
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  harvestTime: {
    type: Object,
    label: "Cosecha",
    optional: true
  },
  'harvestTime.from': {
    type: Number,
    label: "Desde",
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  coldSupport: {
    type: Number,
    label: "Resistencia al frío (grados mínimos)",
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
  spaccing: {
    type: Object,
    label: "Separación",
    optional: true
  },
  'spaccing.seed': {
    type: Number,
    label: "Semillas",
    optional: true
  },
  'spaccing.seedDeep': {
    type: Number,
    label: "Profundidad semillas",
    optional: true
  },
  'spaccing.plant': {
    type: Number,
    label: "Plantas",
    optional: true
  },
  'spaccing.plantLines': {
    type: Number,
    label: "Lineas de plantación",
    optional: true
  },
  land: {
    type: Object,
    label: "Tierra",
    optional: true
  },
  'land.type': {
    type: Object,
    label: "Tipo"
  },
  'land.type.any': {
    type: Boolean,
    label: "Admite cualquier tipo"
  },
  'land.type.preferred': {
    type: String,
    label: "Tipo preferido",
    optional: true
  },
  'land.ph': {
    type: Object,
    label: "PH",
    optional: true
  },
  'land.ph.from': {
    type: Number,
    decimal: true,
    label: "Desde",
    optional: true
  },
  'land.ph.to': {
    type: Number,
    decimal: true,
    label: "Hasta",
    optional: true
  },
  sun: {
    type: Object,
    label: "Preferencias de sol",
    optional: true
  },
  'sun.sunExposition': {
    type: Number,
    label: "Grado de exposición al sol",
    optional: true
  },
  'sun.sunExpositionDescription': {
    type: String,
    label: "Grado de exposición al sol",
    optional: true
  },
  'sun.shadowExposition': {
    type: Number,
    label: "Grado de exposición a la sombra",
    optional: true
  },
  'sun.shadowExpositionDescription': {
    type: String,
    label: "Grado de exposición a la sombra",
    optional: true
  },
  'water': {
    type: Object,
    label: "Preferencias de regado",
    optional: true
  },
  'water.exposition': {
    type: Number,
    decimal: true,
    label: "Grado de regado",
    optional: true
  },
  'water.expositionDescription': {
    type: String,
    label: "Grado de regado",
    optional: true
  },
  associations: {
    type: Object,
    label: "Asociaciones",
    optional: true
  },
  'associations.ok': {
    type: Array,
    label: "Compatibilidades",
    optional: true
  },
  'associations.ok.$': {
    type: String,
    autoform: {
      options: () => {
        return Seeds.find().map( (c) => {
          return {label: `${c.variant} - ${c.name}`, value: c._id}
        })
      }
    }
  },
  'associations.no': {
    type: Array,
    label: "Incompatibilidades",
    optional: true
  },
  'associations.no.$': {
    type: String,
    autoform: {
      options: () => {
        return Seeds.find().map( (c) => {
          return {label: `${c.variant} - ${c.name}`, value: c._id}
        })
      }
    }
  },
  info: {
    type: Object,
    label: "Info",
    optional: true
  },
  


  'info.seed': {
    type: Array,
    optional: true,
    label: "Semilla"
  },
  'info.seed.$': {
    type: Object,
    optional: true
  },
  'info.seed.$.name': {
    type: String,
    optional: true,
    label: "Nombre"
  },
  'info.seed.$.url': {
    type: String,
    optional: true,
    label: "URL"
  },
  'info.seed.$.isVideo': {
    type: Boolean,
    optional: true,
    label: "¿En un vídeo?"
  },
  'info.seed.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
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
  'info.seeding.$.isVideo': {
    type: Boolean,
    optional: true,
    label: "¿En un vídeo?"
  },
  'info.seeding.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
  },


  'info.harvest': {
    type: Array,
    optional: true,
    label: "Cosecha"
  },
  'info.harvest.$': {
    type: Object,
    optional: true
  },
  'info.harvest.$.name': {
    type: String,
    optional: true,
    label: "Nombre"
  },
  'info.harvest.$.url': {
    type: String,
    optional: true
  },
  'info.harvest.$.isVideo': {
    type: Boolean,
    optional: true,
    label: "¿En un vídeo?"
  },
  'info.harvest.$.lastChecked': {
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
  'info.general.$.isVideo': {
    type: Boolean,
    optional: true,
    label: "¿En un vídeo?"
  },
  'info.general.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
  },

  highlightedImage: {
    type: String,
    optional: true,
    label: "Imagen destacada"
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

Seeds.attachSchema(SeedSchema);