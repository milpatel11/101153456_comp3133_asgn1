const mongoose = require("mongoose");
const express = require("express");

const TypeDefs = require("./typeDefs");
const Resolvers = require("./resolver");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server-express");

const app = express();

app.use(bodyParser.json());
app.use("*", cors());
let portA = process.env.PORT != undefined ? process.env.PORT : 7000;

console.log(portA);
app.listen(
  (portA,
  () =>
    console.log(
      `🚀 Server ready at http://localhost:${portA}${server.graphqlPath}`
    ))
);

const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers,
});
server.applyMiddleware({ app });

const connect = mongoose.connect(
  "mongodb+srv://FullStack:Milan1234@cluster0.vqnac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

connect.then(
  (db) => {
    console.log("Successfull Connection!");
  },
  (err) => {
    console.log(err);
  }
);

dotenv.config();
