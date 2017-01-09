Template.registerHelper('cropProperty', function(cropId, property) {
  if (!cropId) return
  const crop = Crops.findOne({_id:cropId})
  return crop ? crop[property] : null
})