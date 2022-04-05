const {sequelize} = require('../database/models')

const AuthController = {
  login: async (req, res) => {

    // Capturar o email e a senha
    let {email, senha} = req.body;

    // Levantar do BD o usuário com o email dado
    let sql = `SELECT id, senha FROM usuarios WHERE email='${email}'`;
    let resultados = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT})

    // Caso não haja usuário, retornar erro 402
    if (resultados.length == 0){
      return res.status(403).json({msg:"Falha no login"})
    } else {
      return res.status(200).json({msg:"Encontrou usuário com email dado"})
    }

    // Testar a senha do usuário

    // Se a senha não estiver ok, retornar o erro 403

    // TODO: Criar o token

    // TODO: Retornar msg de sucesso (200) e o token
  }
}

module.exports = AuthController;