const db = require('../config/connection');
const { User } = require('../models');

const userSeeds = require('./userSeeds.json');
const citySeeds = require('./citySeeds.json');
const { get } = require('../models/City');

db.once('open', async () => {
 try {
  await User.deleteMany({});

  const users = await User.create(userSeeds);
  const cities = Array.from(citySeeds);

  for (city of cities) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.savedCities.push(city);
    users[0].savedCities.push(city);
    await tempUser.save();
    await users[0].save();
  };

  //loop through users , get a random city for each user
  for(user of users){
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    user.homeCity = randomCity._id;
    await user.save();
  }

 
} catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('all done!');
  process.exit(0);
});