const express = require('express');
const contatosController = require('../controllers/ContatosController');
const router = express.Router();

/*
Listar contatos                              | GET     | /contatos
Listar informações de um contato específico  | GET     | /contatos/:id
Buscar contato                               | GET     | /contatos/search
Cadastrar um contato                         | POST    | /contatos
Deletar um contato                           | DELETE  | /contatos/:id
Alterar um contato                           | UPDATE  | /contatos/:id
*/

router.get('/', contatosController.index);
router.get('/:id', contatosController.show);
router.get('/search', contatosController.search);
router.post('/', contatosController.create);
router.delete('/:id', contatosController.destroy);
router.put('/:id', contatosController.update);

module.exports = router;