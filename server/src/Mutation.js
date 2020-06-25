const { Character, validateCharacter } = require("./models/Character"),
  { User, validateUser } = require("./models/User"),
  { ApolloServer, gql, UserInputError } = require("apollo-server"),
  bcrypt = require("bcrypt"),
  lodash = require("lodash"),
  jwt = require("jsonwebtoken"),
  { sendConfirmationEmail } = require("./service/EmailService");

const Mutation = {
  addCharacter(_, payload) {
    // const storeCharacter = {
    //   id: nanoid(),
    //   ...payload
    // };

    const { value, error } = validateCharacter(payload, {
      abortEarly: false
    });

    if (error) {
      throw new UserInputError("Failed to create a character", {
        validationErrors: error.details
      });
    }
    return Character.create(payload);
  },
  async signup(_, { user }) {
    const { value, error } = validateUser(user);
    if (error) {
      throw new UserInputError("Failed to create a character", {
        validationErrors: error.details
      });
    }
    const password = await bcrypt.hash(user.password, 10);
    const registerUser = await User.create({
      ...value,
      password
    });

    sendConfirmationEmail(registerUser);

    const token = await jwt.sign(
      {
        _id: registerUser._id
      },
      process.env.SECRET
    );

    return {
      token,
      user: lodash.pick(registerUser, ["id", "name", "email"])
    };
  },
  async confirmEmail(_, { token }) {
    try {
      const {_id} = jwt.verify(token, process.env.SECRET);
    //   return true;
    const user=User.findById(_id)
    user.emailVerified=true;
    user.save();
    return true
    } catch (e) {
      return false;
    }
  }
};

module.exports = Mutation;
