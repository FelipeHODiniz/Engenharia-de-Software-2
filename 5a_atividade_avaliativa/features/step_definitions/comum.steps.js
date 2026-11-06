const { Given, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que agora são {string}', function (dataHora) {
  this.servico.definirAgora(dataHora)
})

Then('a mensagem exibida é {string}', function (esperada) {
  assert.equal(this.mensagem, esperada)
})

Then('a edição está no estado {string}', function (esperado) {
  assert.equal(this.edicao.estado, esperado)
})
