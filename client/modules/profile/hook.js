AutoForm.addHooks(['updateUser'], {
  after: {
    update: function(error, sucess) {
      if (error) return
      console.log({error, sucess})
      Router.go( 'profile.index', {
        userId: Meteor.user()._id
      } )
    }
  }
})