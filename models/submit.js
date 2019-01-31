module.exports = function(sequelize, DataTypes) {
  var Submit = sequelize.define("submitted", {
    question: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 500]
      }
    },
    correctAnswer: {
      type: DataTypes.STRING,
      validate: {
        len: [1,255]
      }
    },
    option1: {
      type: DataTypes.STRING,
      validate: {
        len: [1,255]
      }
    },
    option2: {
      type: DataTypes.STRING,
      validate: {
        len: [1,255]
      }
    },
    option3: {
      type: DataTypes.STRING,
      validate: {
        len: [1,255]
      }
    }
  });
  return Submit;
};