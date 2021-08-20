const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async(parent,args,context)=>{
      //console.log(args);
      if(context.user){
          return User.findOne({_id:context.user._id})
      }
      throw new AuthenticationError('You need to be logged in!');
    }

  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveCity: async (parent,args,context)=>{
      console.log('args',args);
      const city = args.input;

      if(context.user){
        const user = await User.findOne({_id:context.user._id });
          await User.findOneAndUpdate(
              {_id:context.user._id},
              {$addToSet:{savedCities:{...city}}}
          );
          
          return user;
      }

      throw new AuthenticationError('You need to be logged in!');

    },
    removeCity: async (parent,{cityName},context)=>{
      if(context.user){
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedCities: { name: cityName } } },
              { new: true }
          )
          return updatedUser;
      }
      throw new AuthenticationError('you need to be logged in!');
      
    },
    saveHomeCity: async(parent, args,context)=>{
      const city = args.input;

      if(context.user){
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {homeCity:{...city} },
            { new: true }
        )
        return updatedUser;
      }
    throw new AuthenticationError('you need to be logged in!');
    }

  },
};

module.exports = resolvers;
