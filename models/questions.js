module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define("questions", {
    question: {
      type: DataTypes.STRING,
      validate: {len: [1, 500]
      }
    },
    option1: {
      type: DataTypes.STRING,
      validate: {len: [1,255]
      }
    },
    option2: {
      type: DataTypes.STRING,
      validate: {len: [1,255]
      }
    },
    option3: {
      type: DataTypes.STRING,
      validate: {len: [1,255]
      }
    },
    option4: {
      type: DataTypes.STRING,
      validate: {len: [1,255]
      }
    },
    correctAnswer: {
      type: DataTypes.STRING,
      validate: {len: [1,255]
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {len: [1,50]
      }
    }
  },{
    timestamps: false
  });
  return Questions;
};