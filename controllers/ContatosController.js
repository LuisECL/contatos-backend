const uid = 1;
const {sequelize, Sequelize} = require('../database/models');

const contatosController = {
  index: async (req, res) => {
    let sql = `SELECT id, nome FROM contatos WHERE usuarios_id = ${uid}`;
    let contatos = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})

    res.status(200).json(contatos);
  },

  show: async (req, res) => {
    let sql = `SELECT id, nome FROM contatos WHERE usuarios_id = ${uid} AND id=${req.params.id}`;
    let resultado = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});

    if(resultado.length == 0) {
      res.status(404).json({msg: "Contato inexistente"})
    } else {
      res.status(200).json(resultado[0])
    }

    res.json(contato);
  },

  search: async (req, res) => {
    let trechoBuscado = req.query.q;
    let sql = `SELECT id, nome FROM contatos WHERE usuarios_id = ${uid} AND nome LIKE '%${trechoBuscado}%'`;
    let resultado = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});

    res.status(200).json(resultado);
  },

  create: async (req, res) => {
    // Capturando as info do body
    let {nome, emails, telefones} = req.body;

    // Salvar o nome do contato
    let sql = `INSERT INTO contatos (nome, usuarios_id) VALUES ("${nome}", ${uid})`;
    let resultado = await sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});

    // Levantar o ID do contato recém criado
    let [idCriado, nLinhas] = resultado;

    // Salvar os emails
    emails = emails.map(e=>{return {email: e, contatos_id: idCriado}});
    sequelize.queryInterface.bulkInsert('emails', emails);

    //Salvar os telefones
    telefones = telefones.map(t=>{return {telefone: t, contatos_id: idCriado}});
    sequelize.queryInterface.bulkInsert('telefones', telefones);

    // Enviar uma resposta pro cliente
    res.json({msg:'Ok', idCriado})
  },

  destroy: (req, res) => {
    res.send('delete contatos')
  },

  update: (req, res) => {
    res.send('atualiza contatos')
  }
}

module.exports = contatosController