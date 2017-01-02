SeedsAfterUpdate = (userId, doc) => {
  if (!doc.associations) {
    return;
  }

  Seeds.direct.update(
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
    Seeds.direct.update(
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
    Seeds.direct.update(
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

Seeds.after.insert( function(userId, doc) {
  return SeedsAfterUpdate(userId, doc)
} );

Seeds.after.update(function (userId, doc, fieldNames, modifier, options) {
  return SeedsAfterUpdate(userId, doc);
});