'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('usuarios',
     [
       {
        id: 1,
        nome: "Rafaela",
        email: "rafaela@meta.com",
        senha: bcrypt.hashSync('123456', 10)
      },
       {
        id: 2,
        nome: "Ligia",
        email: "ligia@google.com",
        senha: bcrypt.hashSync('123456', 10)
       },
       {
        id: 3,
        nome: "Elvis",
        email: "elvis@microsoft.com",
        senha: bcrypt.hashSync('123456', 10)
       }
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('usuarios', null, {});

  }
};