const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')
const { HORA, LINK_DESCADASTRO } = require('../support/dominio')

Given('que a assinante {string} está na lista', function (nome) {
  this.servico.cadastrarAssinante(nome)
})

Given('que a assinante {string} se descadastrou', function (nome) {
  this.servico.descadastrar(nome)
})

Given('que a assinante {string} pediu o retorno à lista há {int} horas', function (nome, horas) {
  this.servico.descadastrar(nome)
  this.servico.pedirRetorno(nome)
  this.servico.avancarRelogio(horas * HORA)
})

When('a assinante {string} usa o link de descadastro', function (nome) {
  this.servico.descadastrar(nome)
})

When('o NewsFlow envia à assinante {string} o e-mail {string}', function (nome, assunto) {
  this.emailRecebido = this.servico.enviarEmail(nome, assunto)
})

When('a assinante {string} pede o retorno à lista', function (nome) {
  this.servico.pedirRetorno(nome)
})

When('a assinante {string} usa o link de confirmação', function (nome) {
  this.mensagem = this.servico.confirmarRetorno(nome)
})

Then('a assinante {string} está {situacao}', function (nome, situacao) {
  assert.equal(this.servico.assinantes.get(nome).naLista, situacao === 'na lista')
})

Then('a assinante {string} recebe o e-mail {string}', function (nome, assunto) {
  const assuntos = this.servico.assinantes.get(nome).emails.map((email) => email.assunto)
  assert.ok(assuntos.includes(assunto), `E-mails recebidos: ${assuntos.join(', ')}`)
})

Then('o e-mail recebido traz o link de descadastro', function () {
  assert.ok(this.emailRecebido.links.includes(LINK_DESCADASTRO))
})
