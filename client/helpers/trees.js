Template.registerHelper('treeProperty', function(treeId, property) {
  if (!treeId) return
  const tree = Trees.findOne({_id:treeId})
  return tree ? tree[property] : null
})