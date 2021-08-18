const db = require('../config/connection');
const { User, City } = require('../models');
const userSeeds = require('./userSeeds.json');
const citySeeds = require('./citySeeds.json');

db.once('open', async () => {
 try {
  await City.deleteMany({});
  await User.deleteMany({});

  await User.create(userSeeds);
  await City.create(citySeeds);

 
} catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('all done!');
  process.exit(0);
});