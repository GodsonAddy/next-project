"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User);
    }
  }
  Account.init(
    {
      type: DataTypes.STRING,
      provider: DataTypes.STRING,
      provider_account_id: DataTypes.STRING,
      refresh_token: DataTypes.TEXT,
      access_token: DataTypes.TEXT,
      expires_at: DataTypes.INTEGER,
      token_type: DataTypes.STRING,
      scope: DataTypes.STRING,
      id_token: DataTypes.TEXT,
      session_state: DataTypes.STRING,
      oauth_token_secret: DataTypes.STRING,
      oauth_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
    }
  );
  return Account;
};
