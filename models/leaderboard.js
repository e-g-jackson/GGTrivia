module.exports = function (sequelize, DataTypes) {
  var Leaderboard = sequelize.define("leaderboard", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50]
      }
    },
    score: {
      type: DataTypes.INTEGER,
    }
  },{
    timestamps: false
  });
  return Leaderboard;
};
