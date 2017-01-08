Template.myOrchardsBenchsTableItem.events({
  "click .remove-item": function(event, template){
    if (confirm("Remove this bench?")) {
       MyBenchs.remove({
         _id: template.data._id
       })
    }
  }
});

Template.myOrchardsBenchsViewSidebar.rendered = () => {
  $('#logentryInsert textarea').bind('input propertychange', function() {
    $(this).attr('rows', $(this).val().split('\n').length )
  })

  $('#logentryInsert').on('submit', function() {
    $('#logentryInsert textarea').attr('rows', $(this).val().split('\n').length )
  })
}