const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que a edição {string} foi escrita por {string}', function (titulo, autora) {
  this.edicao = this.servico.criarEdicao(titulo, autora)
})

Given('que a edição foi enviada para revisão', function () {
  this.servico.enviarParaRevisao(this.edicao)
})

When('a revisora {string} aprova a edição', function (revisora) {
  this.mensagem = this.servico.aprovar(this.edicao, revisora)
})

When('a revisora {string} reprova a edição com o comentário {string}', function (_revisora, comentario) {
  this.mensagem = this.servico.reprovar(this.edicao, comentario)
})

When('a revisora {string} reprova a edição sem comentário', function (_revisora) {
  this.mensagem = this.servico.reprovar(this.edicao, '')
})

Then('o comentário da reprovação é {string}', function (esperado) {
  assert.equal(this.edicao.comentario, esperado)
})
