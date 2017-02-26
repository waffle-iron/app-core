Template.registerHelper('brNl', (str) => {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/(?:\r\n|\r|\n)/g, '<br />')
})

Template.registerHelper('fullUrl', () => document.URL)
