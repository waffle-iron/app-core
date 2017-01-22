MyTrees = new Mongo.Collection("mytree");

MyTrees.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
MyTreesSchema = new SimpleSchema({
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
  treeId: {
    type: String,
    autoform: {
      options: function() {
        return Trees.find().map( (c) => {
          return {label: `${c.variant}`, value: c._id}
        })
      }
    },
    label: "Tipo de árbol"
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
  public: {
    type: Boolean,
    optional: true,
    label: "Hacer público"
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
    denyInsert: true,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  }
});

MyTrees.attachSchema(MyTreesSchema);