const contatosController = {
  index: (req, res) => {
    res.send('get contatos')
  },

  show: (req, res) => {
    res.send(`get contato ${req.params.id}`)
  },

  search: (req, res) => {
    res.send('função search')
  },

  create: (req, res) => {
    res.send('postar um contato')
  },

  destroy: (req, res) => {
    res.send('delete contatos')
  },

  update: (req, res) => {
    res.send('atualiza contatos')
  }
}

module.exports = contatosController