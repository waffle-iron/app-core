Trees = new Mongo.Collection("tree");

Trees.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
TreesSchema = new SimpleSchema({
  familyId: {
    type: String,
    optional: true,
    autoform: {
      options: () => {
        return TreeFamilies.find().map( (c) => {
          return {label: `${c.name}`, value: c._id}
        })
      }
    },
    label: "Familia"
  },
  name: {
    type: String,
    max: 200,
    label: "Nombre"
  },
  variant: {
    type: String,
    max: 200,
    label: "Variante"
  },
  origin: {
    type: String,
    label: "Lugar de origen",
    optional: true
  },
  etymology: {
    type: String,
    label: "Etimología",
    optional: true
  },
  description: {
    type: String,
    label: "Description",
    optional: true
  },
  cultivationAndUses: {
    type: String,
    label: "Cultivo y usos",
    optional: true
  },
  url: {
    type: String,
    label: "URL",
    optional: true
  },

  highlightedImage: {
    type: String,
    optional: true,
    label: "Imagen destacada"
  },

  info: {
    type: Object,
    label: "Info",
    optional: true
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
  'info.general.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: "¿Es un contenido destacado?"
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
  }
});

Trees.attachSchema(TreesSchema);