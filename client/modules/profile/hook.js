AutoForm.addHooks(['updateUser'], {
  after: {
    update: function(error, sucess) {
      if (error) return

      Router.go( 'profile.index', {
        userId: Meteor.user()._id
      } )
    }
  }
})
