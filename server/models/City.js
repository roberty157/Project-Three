const { Schema, /*model*/ } = require('mongoose');

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
    // saved book id from teleport
  cityId: {
    type: String,
    //required: true,
  },
  image: {
    type: String,
  },
  healthcare: {
    type: Number,
  },
  taxation: {
    type: Number,
  },
  education: {
    type: Number,
  },
  housing: {
    type: Number,
  },
  costOfLiving: {
    type: Number,
  },
  safety: {
    type: Number,
  },
  environmentalQuality: {
    type: Number,
  },
  economy: {
    type: Number,
  },
  population: {
    type: Number,
  },
  region: {
    type: String,
  },
});

//keep citySchema as a schema and don't convert to model
//const City = model('City', citySchema);

module.exports = citySchema;