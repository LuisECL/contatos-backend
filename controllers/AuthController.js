const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {sequelize} = require('../database/models');

const AuthController = {
  login: async (req, res) => {

    // Capturar o email e a senha
    let {email, senha} = req.body;

    // Levantar do BD o usuário com o email dado
    let sql = `SELECT id, senha, nome FROM usuarios WHERE email='${email}'`;
    let resultados = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT})

    // Caso não haja usuário, retornar erro 402
    if (resultados.length == 0){
      return res.status(403).json({msg:"Falha no login"})
    }

    let id = resultados[0].id;
    let senhaCriptografada = resultados[0].senha;
    let nome = resultados[0].nome;


    // Testar a senha do usuário
    if(!bcrypt.compareSync(senha, senhaCriptografada)){
      return res.status(403).json({msg:"Falha no login"})
    };

    let usuario = {
      id,
      nome,
      email
    };

    // Criar o token
    let token = jwt.sign(usuario, "SEGREDO");

    // Retornar msg de sucesso (200) e o token
    return res.status(200).json({token, usuario});
  }
}

module.exports = AuthController;