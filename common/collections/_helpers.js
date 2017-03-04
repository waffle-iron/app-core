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

monthSelector = [
  {  label: 'Enero',      value: 1  },
  {  label: 'Febrero',    value: 2  },
  {  label: 'Marzo',      value: 3  },
  {  label: 'Abril',      value: 4  },
  {  label: 'Mayo',       value: 5  },
  {  label: 'Junio',      value: 6  },
  {  label: 'Julio',      value: 7  },
  {  label: 'Agosto',     value: 8  },
  {  label: 'Septiembre', value: 9  },
  {  label: 'Octubre',    value: 10 },
  {  label: 'Noviembre',  value: 11 },
  {  label: 'Diciembre',  value: 12 },
]

AddressSchema = new SimpleSchema({
  formattedAddress: {
    type: String,
    optional: true
  },
  geopoint: {
    type: [Number], //[longitude, latitude]
    decimal: true,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  postalCode: {
    type: String,
    optional: true
  },
  country: {
    type: String,
    optional: true
  },
  countryName: {
    type: String,
    optional: true
  }
});
