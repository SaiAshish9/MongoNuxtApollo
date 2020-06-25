const { Character, validateCharacter } = require("./models/Character")

const Query = {
  characters: () =>
    Character.find({}, (err, characters) => {
      if (err) {
        console.log(err);
      }
      return characters;
    }),
  //    query,data
  character: (_, { id }) =>
    Character.findById(id, (err, character) => {
      if (err) {
        console.log(err);
      }
      return character;
    })
};

module.exports = Query