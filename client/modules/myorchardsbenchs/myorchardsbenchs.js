Template.myOrchardsBenchsViewSidebar.rendered = () => {
  $('#logentryInsert textarea').bind('input propertychange', function() {
    $(this).attr('rows', $(this).val().split('\n').length )
  })

  $('#logentryInsert').on('submit', function() {
    $('#logentryInsert textarea').attr('rows', $(this).val().split('\n').length )
  })
}

Template.myOrchardsBenchsViewShareToggle.events({
  'click button': function() {
    Meteor.call('switchPublic', {
      type: 'bench',
      _id: this.myBench._id,
      public: !this.myBench.public
    })
  }
})