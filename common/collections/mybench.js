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
  public: {
    type: Boolean,
    optional: true
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