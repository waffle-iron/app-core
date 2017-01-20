Template.registerHelper('canEdit', function(item) {
  if (!item) return false
  if (!Meteor.user()) return false
  if (Meteor.user()._id === item.userId) return true
  if (Roles.userIsInRole(Meteor.user()._id, ['super-admin'], Roles.GLOBAL_GROUP)) {
    return true
  }
  return false
})

Template.registerHelper('canCreate', function() {
  if (!Meteor.user()) return false
  var u = Router.current().location.get().path.split('/')
  if (Meteor.user()._id === u[1]) return true
  if (Roles.userIsInRole(Meteor.user()._id, ['super-admin'], Roles.GLOBAL_GROUP)) {
    return true
  }
  return false
})