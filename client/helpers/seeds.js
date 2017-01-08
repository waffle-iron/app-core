Template.registerHelper('seedProperty', function(seedId, property) {
  if (!seedId) return
  const seed = Seeds.findOne({_id:seedId})
  return seed ? seed[property] : null
})