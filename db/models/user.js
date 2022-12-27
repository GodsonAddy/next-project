"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Account, {
        foreignKey: {
          type: Types.UUID,
          allowNull: false,
          unique: true,
        },
      });

      User.hasOne(models.Session, {
        foreignKey: {
          type: Types.UUID,
          allowNull: false,
          unique: true,
        },
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      creator: DataTypes.BOOLEAN,
      color: DataTypes.STRING,
      email_verified: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  User.beforeSave(async function (user) {
    let colorCharacters = "0123456789ABCDEF";
    let hashColor = "#";

    for (let i = 0; i < 6; i++) {
      hashColor += colorCharacters[Math.floor(Math.random() * 16)];
    }
    user.color = hashColor;
  });

  return User;
};
