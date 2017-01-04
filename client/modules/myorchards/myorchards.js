Template.myOrchards.onRendered(function() {
  GoogleMaps.load({ v: '3', key: 'AIzaSyBdHhCYmwljyGMK4qE4Bk0yO2mEKzlv6ko', libraries: 'geometry,places' });
});

Template.myOrchards.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      }
    }
  }
})

Template.myOrchardsTableItem.events({
  'click .remove-item': function(event, template){
    if (confirm('¿Eliminar este huerto?')) {
      Meteor.call('myOrchards-remove', template.data._id)
    }
  }
})