MyOrchardsAfterRemove = (userId, doc) => {
  MyBenchs.direct.update({ orchardId: doc._id }, {$unset: { orchardId: null } });
   MyTrees.direct.update({ orchardId: doc._id }, {$unset: { orchardId: null } });
};

MyOrchards.after.remove(function (userId, doc) {
  return MyOrchardsAfterRemove(userId, doc);
});