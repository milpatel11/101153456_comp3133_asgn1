const { __DirectiveLocation } = require("graphql");
const Hotels = require("./models/Hotel");
const User = require("./models/User");
const Booking = require("./models/Booking");

exports.resolvers = {
  Query: {
    getHotel: async (parent, args) => {
      return await Hotels.find({});
    },
    getHotelByID: async (parent, args) => {
      return await Hotels.findById(args.hotel_id);
    },
    getHotelByName: async (parent, args) => {
      return await Hotels.findByName(args.hotel_id);
    },
    getHotelByCity: async (parent, args) => {
      return await Hotels.find({ city: args.city });
    },
  },
  Mutation: {
    addHotel: async (
      parent,
      {
        hotelInfo: {
          hotel_id,
          hotel_name,
          street,
          city,
          postal_code,
          price,
          email,
          user_id,
        },
      },
      context
    ) => {
      const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      const isValidEmail = emailExpression.test(String(email).toLowerCase());

      const errors = {};
      if (!isValidEmail) {
        errors.email = "Invalid Email";
      }

      if (!hotel_name) {
        errors.hotel_name = "Invalid Hotel";
      }

      if (!street) {
        errors.street = "Invalid Street Name";
      }
      if (!city) {
        errors.city = "Invalid City Name";
      }

      if (!postal_code) {
        errors.postal_code = "Invalid Postal Code";
      }

      if (errors) {
        throw new Error("Errors : " + errors);
      }

      let newHotel = new Hotels({
        hotel_name,
        street,
        city,
        postal_code,
        price,
        email,
        user_id,
      });

      const hotelres = await newHotel.save();

      return {
        ...hotelres._doc,
        hotel_id: hotelres._id,
      };
    },

    addUser: async (parent, { userInfo: { username, password, email } }) => {
      const newuser = new User({
        username,
        password,
        email,
      });
      const errorsUser = {};
      if (!username) {
        errorsUser.username = "Invalid User Name";
      }
      if (!password) {
        errorsUser.password = "Invalid Password";
      }
      if (!email) {
        errorsUser.email = "Invalid Email address";
      }

      if (errorsUser) {
        throw new Error("Errors : " + errorsUser);
      }
      const userRes = await newuser.save();
      return {
        ...userRes._doc,
        hotel_id: userRes._id,
      };
    },

    addBooking: async (
      parent,
      { bookingInfo: { h_id, b_date, b_start, b_end, u_id } }
    ) => {
      const nb = new Booking({
        h_id,
        b_date,
        b_start,
        b_end,
        u_id,
      });

      const errorBooking = {};
      if (!h_id) {
        errorBooking.Hotel_id = "Invalid Hotel";
      }
      if (!b_date) {
        errorBooking.Hotel_id = "Invalid Booking Date";
      }
      if (!b_start) {
        errorBooking.Hotel_id = "Invalid Check-in Date";
      }
      if (!b_end) {
        errorBooking.Hotel_id = "Invalid Checkout Date";
      }
      if (!u_id) {
        errorBooking.Hotel_id = "Invalid User";
      }

      if (errorBooking) {
        throw new Error("Error : " + errorBooking);
      }
      const nbRes = await nb.save();

      return {
        ...nbRes._doc,
        id: userRes._id,
      };
    },
  },
};
