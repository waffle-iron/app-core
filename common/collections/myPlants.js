MyPlants = new Mongo.Collection("myplant");

MyPlants.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
MyPlantsSchema = new SimpleSchema({
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
      type: 'hidden'
    }
  },
  benchId: {
    type: String,
    optional: true,
    max: 20,
    autoform: {
      options: () => {
        return MyBenchs.find().map( (c) => {
          return {label: `${c.name}`, value: c._id}
        })
      }
    },
    label: "Bancal"
  },
  seedId: {
    type: String,
    max: 20,
    autoform: {
      options: () => {
        return Seeds.find().map( (c) => {
          return {label: `${c.variant}`, value: c._id}
        })
      }
    },
    label: "Semilla"
  },
  name: {
    type: String,
    max: 200,
    label: "Nombre"
  },
  amount: {
    type: Number,
    label: "Cantidad"
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

MyPlants.attachSchema(MyPlantsSchema);