MyLogEntries = new Mongo.Collection("mylogentries");

MyLogEntries.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
MyLogEntriesSchema = new SimpleSchema({
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
  type: {
    type: String,
    optional: false,
    allowedValues: ['tree', 'bench', 'orchard', 'plant', 'experiment']
  },
  target: {
    type: String,
    optional: true,
    allowedValues: ['general', 'tree', 'bench', 'orchard', 'plant', 'experiment']
  },
  typeId: {
    type: String,
    optional: true,
  },
  message: {
    type: String,
    optional: true,
    autoform: {
      rows: 1
    },
    label: "Mensaje"
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

MyLogEntries.attachSchema(MyLogEntriesSchema);