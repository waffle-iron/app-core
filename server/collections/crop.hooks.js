CropsAfterUpdate = (userId, doc) => {
  if (!doc.associations) {
    return;
  }

  Crops.direct.update(
    {},
    {
      $pull: {
        'associations.ok': doc._id,
        'associations.no': doc._id
      }
    },
    {
      multi: true
    }
  )

  if (!!doc.associations.ok) {
    Crops.direct.update(
      {_id: { $in: doc.associations.ok }},
      {
        $addToSet: { 'associations.ok': doc._id }
      },
      {
        multi: true
      }
    );
  }

  if (!!doc.associations.no) {
    Crops.direct.update(
      {_id: { $in: doc.associations.no }},
      {
        $addToSet: { 'associations.no': doc._id }
      },
      {
        multi: true
      }
    );
  }

  return;
}

Crops.before.insert( function(userId, doc) {
  
  if (!Roles.userIsInRole(userId, 'super-admin', Roles.GLOBAL_GROUP)) {
    doc.userId = userId
  } else {
    delete doc.userId
  }

} )

Crops.after.insert( function(userId, doc) {
  return CropsAfterUpdate(userId, doc)
} );

Crops.after.update(function (userId, doc, fieldNames, modifier, options) {
  return CropsAfterUpdate(userId, doc);
});