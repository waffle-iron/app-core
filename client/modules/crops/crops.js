/**
 * Copyright (c) 2016-2017 "Jose Constela" [jose@joseconstela.com]
 * Tiempo de Siembra [http://app.tiempodesiembra.es]
 *
 * This file is part of iempo de Siembra core's app.
 *
 * Tiempo de Siembra is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Template.cropsAdd.rendered = function() {}

Template.cropsEdit.rendered = function() {}

Template.cropsView.events({
  "click [data-action=crop]": function(event, template) {
    Router.go('crops.one', {
      _id: $(event.target).data('cropId')
    });
  }
});

Template.cropsTableItem.events({
  "click .remove-item": function(event, template) {
    if (confirm("¿Eliminar este cultivo?")) {
      Crops.remove({
        _id: template.data._id
      })
    }
  }
});

Template.cropsAdd.events({
  'keyup input[name="name"]': (event) => {
    $('#cropFormInsert input[name="variant"]').val(() => {
      let input = $(event.target).val();
      if (input) {
        return `${input} común`
      }
      return '';
    })
  }
})

Template.registerHelper('compatibleCrops', function() {
  if (!this.crop || !this.crop.associations || !this.crop.associations.ok) return;
  let r = '';
  this.crop.associations.ok.forEach(function(ok) {
    if (!ok) return;
    let n = Crops.findOne({
      _id: ok
    })
    if (n) r += `<span data-action="crop" data-cropId="${ok}" class="btn btn-default btn-default">${n.variant}</span>`
  })
  return r;
})

Template.registerHelper('incompatibleCrops', function() {
  if (!this.crop || !this.crop.associations || !this.crop.associations.no) return;
  let r = '';
  this.crop.associations.no.forEach(function(no) {
    if (!no) return;
    let n = Crops.findOne({
      _id: no
    })
    if (n) r += `<span data-action="crop" data-cropId="${no}" class="btn btn-default btn-default">${n.variant}</span>`
  })
  return r;
})
