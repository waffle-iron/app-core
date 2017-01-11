Crops = new Mongo.Collection("crop");

Crops.allow({
  insert: function () { return !!Meteor.user(); },
  update: function () { return !!Meteor.user(); },
  remove: function () { return !!Meteor.user(); }
});

// Define the schema
CropSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  userId: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  variant: {
    type: String,
    label: "Variante",
    max: 200
  },
  family: {
    type: String,
    label: "Familia",
    autoform: {
      options: () => {
        return CropFamilies.find().map( (c) => {
          return {label: c.name, value: c._id}
        })
      }
    },
    optional: true
  },
  seedTime: {
    type: Object,
    label: "Siembra",
    optional: true
  },
  'seedTime.from': {
    type: Number,
    label: "Desde",
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  'seedTime.to': {
    type: Number,
    label: "Hasta",
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  harvestTime: {
    type: Object,
    label: "Cosecha",
    optional: true
  },
  'harvestTime.from': {
    type: Number,
    label: "Desde",
    autoform: {
      options: () => monthSelector
    },
    optional: true
  },
  coldSupport: {
    type: Number,
    label: "Resistencia al frío (grados mínimos)",
    optional: true
  },
  notes: {
    type: Array,
    optional: true,
    label: "Notas",
    autoform: {
      rows: 10
    },
    optional: true
  },
  'notes.$': {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  spaccing: {
    type: Object,
    label: "Separación",
    optional: true
  },
  'spaccing.seed': {
    type: Number,
    label: "Semillas",
    optional: true
  },
  'spaccing.seedDeep': {
    type: Number,
    label: "Profundidad semillas",
    optional: true
  },
  'spaccing.plant': {
    type: Number,
    label: "Plantas",
    optional: true
  },
  'spaccing.plantLines': {
    type: Number,
    label: "Lineas de plantación",
    optional: true
  },
  land: {
    type: Object,
    label: "Tierra",
    optional: true
  },
  'land.type': {
    type: Object,
    label: "Tipo"
  },
  'land.type.any': {
    type: Boolean,
    label: "Admite cualquier tipo"
  },
  'land.type.preferred': {
    type: String,
    label: "Tipo preferido",
    optional: true
  },
  'land.ph': {
    type: Object,
    label: "PH",
    optional: true
  },
  'land.ph.from': {
    type: Number,
    decimal: true,
    label: "Desde",
    optional: true
  },
  'land.ph.to': {
    type: Number,
    decimal: true,
    label: "Hasta",
    optional: true
  },
  sun: {
    type: Object,
    label: "Preferencias de sol",
    optional: true
  },
  'sun.sunExposition': {
    type: Number,
    label: "Grado de exposición al sol",
    optional: true
  },
  'sun.sunExpositionDescription': {
    type: String,
    label: "Grado de exposición al sol",
    optional: true
  },
  'sun.shadowExposition': {
    type: Number,
    label: "Grado de exposición a la sombra",
    optional: true
  },
  'sun.shadowExpositionDescription': {
    type: String,
    label: "Grado de exposición a la sombra",
    optional: true
  },
  'water': {
    type: Object,
    label: "Preferencias de regado",
    optional: true
  },
  'water.exposition': {
    type: Number,
    decimal: true,
    label: "Grado de regado",
    optional: true
  },
  'water.expositionDescription': {
    type: String,
    label: "Grado de regado",
    optional: true
  },
  associations: {
    type: Object,
    label: "Asociaciones",
    optional: true
  },
  'associations.ok': {
    type: Array,
    label: "Compatibilidades",
    optional: true
  },
  'associations.ok.$': {
    type: String,
    autoform: {
      options: () => {
        return Crops.find().map( (c) => {
          return {label: `${c.variant} - ${c.name}`, value: c._id}
        })
      }
    }
  },
  'associations.no': {
    type: Array,
    label: "Incompatibilidades",
    optional: true
  },
  'associations.no.$': {
    type: String,
    autoform: {
      options: () => {
        return Crops.find().map( (c) => {
          return {label: `${c.variant} - ${c.name}`, value: c._id}
        })
      }
    }
  },
  
  info: {
    type: Object,
    label: "Info",
    optional: true
  },

  'info.seed': {
    type: Array,
    optional: true,
    label: "Semilla"
  },
  'info.seed.$': {
    type: Object,
    optional: true
  },
  'info.seed.$.name': {
    type: String,
    optional: true,
    label: "Nombre"
  },
  'info.seed.$.url': {
    type: String,
    optional: true,
    label: "URL"
  },
  'info.seed.$.isVideo': {
    type: Boolean,
    optional: true,
    label: "¿En un vídeo?"
  },
  'info.seed.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: "¿Es un contenido destacado?"
  },
  'info.seed.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
  },

  'info.seeding': {
    type: Array,
    optional: true,
    label: "Siembra"
  },
  'info.seeding.$': {
    type: Object,
    optional: true
  },
  'info.seeding.$.name': {
    type: String,
    optional: true,
    label: "Nombre"
  },
  'info.seeding.$.url': {
    type: String,
    optional: true,
    label: "URL"
  },
  'info.seeding.$.isVideo': {
    type: Boolean,
    optional: true,
    label: "¿En un vídeo?"
  },
  'info.seeding.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: "¿Es un contenido destacado?"
  },
  'info.seeding.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
  },

  'info.harvest': {
    type: Array,
    optional: true,
    label: "Cosecha"
  },
  'info.harvest.$': {
    type: Object,
    optional: true
  },
  'info.harvest.$.name': {
    type: String,
    optional: true,
    label: "Nombre"
  },
  'info.harvest.$.url': {
    type: String,
    optional: true
  },
  'info.harvest.$.isVideo': {
    type: Boolean,
    optional: true,
    label: "¿En un vídeo?"
  },
  'info.harvest.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: "¿Es un contenido destacado?"
  },
  'info.harvest.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
  },

  'info.general': {
    type: Array,
    optional: true
  },
  'info.general.$': {
    type: Object,
    optional: true
  },
  'info.general.$.name': {
    type: String,
    optional: true,
    label: "Nombre"
  },
  'info.general.$.url': {
    type: String,
    optional: true,
    label: "URL"
  },
  'info.general.$.isVideo': {
    type: Boolean,
    optional: true,
    label: "¿En un vídeo?"
  },
  'info.general.$.isHighlighted': {
    type: Boolean,
    optional: true,
    label: "¿Es un contenido destacado?"
  },
  'info.general.$.lastChecked': {
    type: Date,
    optional: true,
    label: "Última comprobación"
  },

  highlightedImage: {
    type: String,
    optional: true,
    label: "Imagen destacada"
  },

  /*

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // COMPOSITION
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  composition: {
    type: Object,
    label: "Composición (cada 100gr)",
    optional: true
  },

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // COMPOSITION - FRESCO
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  'composition.fresh': {
    type: Object,
    label: "Fresco",
    optional: true
  },
  'composition.fresh.energy': {
    optional: true,
    type: Object,
    label: "Energía (kcal)"
  },
  'composition.fresh.energy.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.energy.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.lipids': {
    optional: true,
    type: Object,
    label: "Lípidos (g)"
  },
  'composition.fresh.lipids.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.lipids.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fibers': {
    optional: true,
    type: Object,
    label: "Fibras (g)"
  },
  'composition.fresh.fibers.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fibers.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.proteins': {
    optional: true,
    type: Object,
    label: "Proteínas (kcal)"
  },
  'composition.fresh.proteins.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.proteins.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.carbohydrates': {
    optional: true,
    type: Object,
    label: "Carbohidratos (g)"
  },
  'composition.fresh.carbohydrates.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.carbohydrates.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // COMPOSITION - ÁCIDOS GRASOS
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  'composition.fresh.fattyAcids': {
    optional: true,
    type: Object,
    label: "Ácidos grasos"
  },

  'composition.fresh.fattyAcids.saturated': {
    optional: true,
    type: Object,
    label: "Saturados (g)"
  },

  'composition.fresh.fattyAcids.saturated.from': {
    optional: true,
    type: Number,
    label: "De"
  },

  'composition.fresh.fattyAcids.saturated.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fattyAcids.monoins': {
    optional: true,
    type: Object,
    label: "Monoinsat (g)"
  },

  'composition.fresh.fattyAcids.monoins.from': {
    optional: true,
    type: Number,
    label: "De"
  },

  'composition.fresh.fattyAcids.monoins.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fattyAcids.poliinsaturated': {
    optional: true,
    type: Object,
    label: "Poliinsat (g)"
  },

  'composition.fresh.fattyAcids.poliinsaturated.from': {
    optional: true,
    type: Number,
    label: "De"
  },

  'composition.fresh.fattyAcids.poliinsaturated.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // COMPOSITION - MINERALES
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  'composition.fresh.minerals': {
    optional: true,
    type: Object,
    label: "Minerales"
  },

  'composition.fresh.minerals.calcium': {
    optional: true,
    type: Object,
    label: "Calcio (mg)"
  },
  'composition.fresh.minerals.calcium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.calcium.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.minerals.zinc': {
    optional: true,
    type: Object,
    label: "Cinc (mg)"
  },
  'composition.fresh.minerals.zinc.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.zinc.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.minerals.chlorine': {
    optional: true,
    type: Object,
    label: "Cloro (mg)"
  },
  'composition.fresh.minerals.chlorine.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.chlorine.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.fresh.minerals.phosphorus': {
    optional: true,
    type: Object,
    label: "Fósforo (mg)"
  },
  'composition.fresh.minerals.phosphorus.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.phosphorus.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.fresh.minerals.iron': {
    optional: true,
    type: Object,
    label: "Hierro (mg)"
  },
  'composition.fresh.minerals.iron.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.iron.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.minerals.magnesium': {
    optional: true,
    type: Object,
    label: "Magnesio (mg)"
  },
  'composition.fresh.minerals.magnesium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.magnesium.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.minerals.manganese': {
    optional: true,
    type: Object,
    label: "Manganeso (mg)"
  },
  'composition.fresh.minerals.manganese.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.manganese.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.fresh.minerals.potassium': {
    optional: true,
    type: Object,
    label: "Potasio (mg)"
  },
  'composition.fresh.minerals.potassium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.potassium.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.fresh.minerals.selenium': {
    optional: true,
    type: Object,
    label: "Selenio (µg)"
  },
  'composition.fresh.minerals.selenium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.selenium.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.fresh.minerals.sodium': {
    optional: true,
    type: Object,
    label: "Sodio (mg)"
  },
  'composition.fresh.minerals.sodium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.sodium.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.fresh.minerals.iodo': {
    optional: true,
    type: Object,
    label: "Yodo (µg)"
  },
  'composition.fresh.minerals.iodo.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.minerals.iodo.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.fresh.fatsolubleVitamin': {
    optional: true,
    type: Object,
    label: "Vitaminas Liposolubles"
  },
  'composition.fresh.fatsolubleVitamin.AReti': {
    optional: true,
    type: Object,
    label: "A Retinol (µg)"
  },
  'composition.fresh.fatsolubleVitamin.AReti.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.AReti.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.fresh.fatsolubleVitamin.ACarot': {
    optional: true,
    type: Object,
    label: "A Carotenoides (µg)"
  },
  'composition.fresh.fatsolubleVitamin.ACarot.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.ACarot.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fatsolubleVitamin.EToco': {
    optional: true,
    type: Object,
    label: "E o Tocoferol (mg)"
  },
  'composition.fresh.fatsolubleVitamin.EToco.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.EToco.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fatsolubleVitamin.KFilo': {
    optional: true,
    type: Object,
    label: "K o Filoquinona (µg)"
  },
  'composition.fresh.fatsolubleVitamin.KFilo.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.KFilo.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fatsolubleVitamin.B1Tia': {
    optional: true,
    type: Object,
    label: "B1 o Tiamina (mg)"
  },
  'composition.fresh.fatsolubleVitamin.B1Tia.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.B1Tia.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fatsolubleVitamin.B2Ribo': {
    optional: true,
    type: Object,
    label: "B2 o Riboflavina (mg)"
  },
  'composition.fresh.fatsolubleVitamin.B2Ribo.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.B2Ribo.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fatsolubleVitamin.B3Nia': {
    optional: true,
    type: Object,
    label: "B3 o Niacina (mg)"
  },
  'composition.fresh.fatsolubleVitamin.B3Nia.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.B3Nia.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fatsolubleVitamin.B5Pan': {
    optional: true,
    type: Object,
    label: "B5 o Ác. Pantoténico (mg)"
  },
  'composition.fresh.fatsolubleVitamin.B5Pan.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.B5Pan.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fatsolubleVitamin.B6Piri': {
    optional: true,
    type: Object,
    label: "B6 o Piridoxina (mg)"
  },
  'composition.fresh.fatsolubleVitamin.B6Piri.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.B6Piri.to': {
    optional: true,
    type: Number,
    label: "A"
  },


  'composition.fresh.fatsolubleVitamin.B9Afo': {
    optional: true,
    type: Object,
    label: "B9 o Ácido Fólico (mg)"
  },
  'composition.fresh.fatsolubleVitamin.B9Afo.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.B9Afo.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.fresh.fatsolubleVitamin.CAsc': {
    optional: true,
    type: Object,
    label: "C o Ác. Ascórbico (mg)"
  },
  'composition.fresh.fatsolubleVitamin.CAsc.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.fresh.fatsolubleVitamin.CAsc.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // COMPOSITION - HERVIDO
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  'composition.boiled': {
    type: Object,
    label: "Hervido",
    optional: true
  },
  'composition.boiled.energy': {
    optional: true,
    type: Object,
    label: "Energía (kcal)"
  },
  'composition.boiled.energy.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.energy.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.lipids': {
    optional: true,
    type: Object,
    label: "Lípidos (g)"
  },
  'composition.boiled.lipids.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.lipids.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fibers': {
    optional: true,
    type: Object,
    label: "Fibras (g)"
  },
  'composition.boiled.fibers.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fibers.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.proteins': {
    optional: true,
    type: Object,
    label: "Proteínas (kcal)"
  },
  'composition.boiled.proteins.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.proteins.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.carbohydrates': {
    optional: true,
    type: Object,
    label: "Carbohidratos (g)"
  },
  'composition.boiled.carbohydrates.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.carbohydrates.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // COMPOSITION - ÁCIDOS GRASOS
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  'composition.boiled.fattyAcids': {
    optional: true,
    type: Object,
    label: "Ácidos grasos"
  },

  'composition.boiled.fattyAcids.saturated': {
    optional: true,
    type: Object,
    label: "Saturados (g)"
  },

  'composition.boiled.fattyAcids.saturated.from': {
    optional: true,
    type: Number,
    label: "De"
  },

  'composition.boiled.fattyAcids.saturated.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fattyAcids.monoins': {
    optional: true,
    type: Object,
    label: "Monoinsat (g)"
  },

  'composition.boiled.fattyAcids.monoins.from': {
    optional: true,
    type: Number,
    label: "De"
  },

  'composition.boiled.fattyAcids.monoins.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fattyAcids.poliinsaturated': {
    optional: true,
    type: Object,
    label: "Poliinsat (g)"
  },

  'composition.boiled.fattyAcids.poliinsaturated.from': {
    optional: true,
    type: Number,
    label: "De"
  },

  'composition.boiled.fattyAcids.poliinsaturated.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // COMPOSITION - MINERALES
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  'composition.boiled.minerals': {
    optional: true,
    type: Object,
    label: "Minerales"
  },

  'composition.boiled.minerals.calcium': {
    optional: true,
    type: Object,
    label: "Calcio (mg)"
  },
  'composition.boiled.minerals.calcium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.calcium.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.minerals.zinc': {
    optional: true,
    type: Object,
    label: "Cinc (mg)"
  },
  'composition.boiled.minerals.zinc.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.zinc.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.minerals.chlorine': {
    optional: true,
    type: Object,
    label: "Cloro (mg)"
  },
  'composition.boiled.minerals.chlorine.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.chlorine.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.boiled.minerals.phosphorus': {
    optional: true,
    type: Object,
    label: "Fósforo (mg)"
  },
  'composition.boiled.minerals.phosphorus.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.phosphorus.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.boiled.minerals.iron': {
    optional: true,
    type: Object,
    label: "Hierro (mg)"
  },
  'composition.boiled.minerals.iron.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.iron.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.minerals.magnesium': {
    optional: true,
    type: Object,
    label: "Magnesio (mg)"
  },
  'composition.boiled.minerals.magnesium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.magnesium.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.minerals.manganese': {
    optional: true,
    type: Object,
    label: "Manganeso (mg)"
  },
  'composition.boiled.minerals.manganese.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.manganese.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.boiled.minerals.potassium': {
    optional: true,
    type: Object,
    label: "Potasio (mg)"
  },
  'composition.boiled.minerals.potassium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.potassium.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.boiled.minerals.selenium': {
    optional: true,
    type: Object,
    label: "Selenio (µg)"
  },
  'composition.boiled.minerals.selenium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.selenium.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.boiled.minerals.sodium': {
    optional: true,
    type: Object,
    label: "Sodio (mg)"
  },
  'composition.boiled.minerals.sodium.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.sodium.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.boiled.minerals.iodo': {
    optional: true,
    type: Object,
    label: "Yodo (µg)"
  },
  'composition.boiled.minerals.iodo.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.minerals.iodo.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.boiled.fatsolubleVitamin': {
    optional: true,
    type: Object,
    label: "Vitaminas Liposolubles"
  },
  'composition.boiled.fatsolubleVitamin.AReti': {
    optional: true,
    type: Object,
    label: "A Retinol (µg)"
  },
  'composition.boiled.fatsolubleVitamin.AReti.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.AReti.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  'composition.boiled.fatsolubleVitamin.ACarot': {
    optional: true,
    type: Object,
    label: "A Carotenoides (µg)"
  },
  'composition.boiled.fatsolubleVitamin.ACarot.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.ACarot.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fatsolubleVitamin.EToco': {
    optional: true,
    type: Object,
    label: "E o Tocoferol (mg)"
  },
  'composition.boiled.fatsolubleVitamin.EToco.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.EToco.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fatsolubleVitamin.KFilo': {
    optional: true,
    type: Object,
    label: "K o Filoquinona (µg)"
  },
  'composition.boiled.fatsolubleVitamin.KFilo.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.KFilo.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fatsolubleVitamin.B1Tia': {
    optional: true,
    type: Object,
    label: "B1 o Tiamina (mg)"
  },
  'composition.boiled.fatsolubleVitamin.B1Tia.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.B1Tia.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fatsolubleVitamin.B2Ribo': {
    optional: true,
    type: Object,
    label: "B2 o Riboflavina (mg)"
  },
  'composition.boiled.fatsolubleVitamin.B2Ribo.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.B2Ribo.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fatsolubleVitamin.B3Nia': {
    optional: true,
    type: Object,
    label: "B3 o Niacina (mg)"
  },
  'composition.boiled.fatsolubleVitamin.B3Nia.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.B3Nia.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fatsolubleVitamin.B5Pan': {
    optional: true,
    type: Object,
    label: "B5 o Ác. Pantoténico (mg)"
  },
  'composition.boiled.fatsolubleVitamin.B5Pan.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.B5Pan.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fatsolubleVitamin.B6Piri': {
    optional: true,
    type: Object,
    label: "B6 o Piridoxina (mg)"
  },
  'composition.boiled.fatsolubleVitamin.B6Piri.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.B6Piri.to': {
    optional: true,
    type: Number,
    label: "A"
  },


  'composition.boiled.fatsolubleVitamin.B9Afo': {
    optional: true,
    type: Object,
    label: "B9 o Ácido Fólico (mg)"
  },
  'composition.boiled.fatsolubleVitamin.B9Afo.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.B9Afo.to': {
    optional: true,
    type: Number,
    label: "A"
  },

  'composition.boiled.fatsolubleVitamin.CAsc': {
    optional: true,
    type: Object,
    label: "C o Ác. Ascórbico (mg)"
  },
  'composition.boiled.fatsolubleVitamin.CAsc.from': {
    optional: true,
    type: Number,
    label: "De"
  },
  'composition.boiled.fatsolubleVitamin.CAsc.to': {
    optional: true,
    type: Number,
    label: "A"
  },
  */

  
  
  
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    autoform: {
      type: 'hidden'
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },


});

Crops.attachSchema(CropSchema);