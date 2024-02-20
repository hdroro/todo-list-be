"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  //OBJECT RELATIONAL MAPPING
  Task_User.init(
    {
      userId: DataTypes.INTEGER,
      taskId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task_User",
    }
  );
  return Task_User;
};
