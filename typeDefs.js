const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Hotel {
    hotel_id: ID!
    hotel_name: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
    user_id: String!
  }

  type Booking {
    id: ID!
    hotel_id: String!
    booking_String: String!
    booking_start: String!
    booking_end: String!
    user_id: String!
  }

  type User {
    userId: ID!
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getHotel: [Hotel]
    getHotelByID(hotel_id: ID!): Hotel
    getHotelByName(hotel_name: String!): [Hotel]
    getHotelByCity(city: String!): [Hotel]
  }

  input HotelInfo {
    hotel_name: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
    user_id: String!
  }

  input BookingInfo {
    hotel_id: String!
    booking_String: String!
    booking_start: String!
    booking_end: String!
    user_id: String!
  }

  input UserInfo {
    username: String!
    password: String!
    email: String!
  }

  type Mutation {
    addHotel(hotelInfo: HotelInfo): Hotel!
    addUser(userInfo: UserInfo): User!
    addBooking(bookingInfo: BookingInfo): Booking!
  }
`;
