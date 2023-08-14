const DataType = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
});

module.exports = User;
