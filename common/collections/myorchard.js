MyOrchards = new Mongo.Collection("myorchard");

MyOrchards.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
MyOrchardsSchema = new SimpleSchema({
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
  name: {
    type: String,
    max: 200,
    label: "Nombre"
  },
  description: {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    },
    label: "Descripción"
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
    autoform: {
      type: 'hidden'
    },
    denyInsert: true,
    optional: true
  }
});

MyOrchards.attachSchema(MyOrchardsSchema);