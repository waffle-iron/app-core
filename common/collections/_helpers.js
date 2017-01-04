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