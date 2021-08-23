const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from City.js
const citySchema = require('./City');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  //changed savedCities type to an array of citySchema
  savedCities: [citySchema]
  /*[
    {
      type: Schema.Types.ObjectId,
      ref: "City"
    }
  ],
  */,
  homeCity: {
      type: Schema.Types.ObjectId,
      ref: "City"
    },
},
  {
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('cityCount').get(function () {
  return this.savedCities.length;
});


const User = model('User', userSchema);

module.exports = User;
