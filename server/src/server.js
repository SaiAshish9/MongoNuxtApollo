require("dotenv").config();
const { ApolloServer, gql, UserInputError } = require("apollo-server"),
  { nanoid } = require("nanoid"),
  fs = require("fs"),
  path = require("path"),
  mongoose = require("mongoose"),
  Query = require("./Query"),
  Mutation=require("./Mutation")

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// const typeDefs = gql`
// `;
// const data = require("./data");

const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers
});

server.listen().then(({ url }) => {
  console.log("Server started at " + url);
});
