Template.myOrchardsBenchsViewPlantsModalUpdate.helpers({
  doc: () => {
    return MyPlants.findOne({_id: Session.get('MyPlantsUpdatingId')})
  }  
})

Template.myOrchardsBenchsViewPlantsItem.events({
  'click .plant-modal-update': function(e) {
    console.log('fired');
    e.preventDefault()
    e.stopPropagation()
    Session.set('MyPlantsUpdatingId', this._id)
    $('#plant-modal-update').modal('show')
  }
})
