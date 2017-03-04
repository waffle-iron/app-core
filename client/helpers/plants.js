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

Template.registerHelper('compatiblePlants', function(plant, type) {
  if (!plant || !plant.associations || !plant.associations.ok) return;
  let r = '';
  plant.associations.ok.forEach(function(ok) {
    if (!ok) return;
    let n = Herbs.findOne({_id:ok})
    if (n) r += `<span data-action="herb" data-herbId="${ok}" class="btn btn-default btn-default">${n.variant}</span>`
  })
  return r;
})

Template.registerHelper('incompatiblePlants', function(plant) {
  if (!plant || !plant.associations || !plant.associations.no) return;
  let r = '';
  plant.associations.no.forEach(function(no) {
    if (!no) return;
    let n = Seeds.findOne({_id:no})
    if (n) r += `<span data-action="crop" data-cropId="${no}" class="btn btn-default btn-default">${n.variant}</span>`
  })
  return r;
})
