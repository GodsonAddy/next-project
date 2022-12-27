"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accounts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING,
        unique: true,
      },
      provider_account_id: {
        type: Sequelize.STRING,
        unique: true,
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      access_token: {
        type: Sequelize.TEXT,
      },
      expires_at: {
        type: Sequelize.INTEGER,
      },
      token_type: {
        type: Sequelize.STRING,
      },
      scope: {
        type: Sequelize.STRING,
      },
      id_token: {
        type: Sequelize.TEXT,
      },
      session_state: {
        type: Sequelize.STRING,
      },
      oauth_token_secret: {
        type: Sequelize.STRING,
      },
      oauth_token: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("accounts");
  },
};
