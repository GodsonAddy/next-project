"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("verification_tokens", {
      id: {
        type: Sequelize.UUID,
      },
      identifier: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
        unique: true,
      },
      expires: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("verification_tokens");
  },
};
