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
  url: {
    type: String,
    label: "URL",
    optional: true
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