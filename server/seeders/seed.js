const db = require('../config/connection');
const { User, City } = require('../models');

const userSeeds = require('./userSeeds.json');
const citySeeds = require('./citySeeds.json');

db.once('open', async () => {
 try {
  await User.deleteMany({});
  await City.deleteMany({});


  const users = await User.create(userSeeds);
  const cities = await City.create(citySeeds);

  for (city of cities) {
    console.log(city);
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.savedCities.push(city._id);
    users[0].savedCities.push(city._id);
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