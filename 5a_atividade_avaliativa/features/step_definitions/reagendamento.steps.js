const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')
const { interpretarDataHora, HORA, MINUTO } = require('../support/dominio')

Given('que a edição {string} está agendada para {string}', function (titulo, dataHora) {
  this.criarEdicaoAprovada(titulo)
  this.servico.definirSegmento('Clientes Premium', 1200)
  const mensagem = this.servico.agendar(this.edicao, ['Clientes Premium'], interpretarDataHora(dataHora))
  assert.equal(mensagem, 'Envio agendado')
})

Given('que o envio já foi reagendado {int} vez(es)', function (vezes) {
  for (let i = 1; i <= vezes; i++) {
    const mensagem = this.servico.reagendar(this.edicao, this.edicao.disparo.instante + HORA)
    assert.equal(mensagem, 'Envio reagendado')
  }
})

Given('que faltam {int} minutos para o horário marcado', function (minutos) {
  this.servico.agora = this.edicao.disparo.instante - minutos * MINUTO
})

When('a gestora reagenda o envio para {string}', function (dataHora) {
  this.mensagem = this.servico.reagendar(this.edicao, interpretarDataHora(dataHora))
})

When('a gestora cancela o envio', function () {
  this.mensagem = this.servico.cancelar(this.edicao)
})

Then('o envio soma {int} reagendamentos', function (total) {
  assert.equal(this.edicao.disparo.reagendamentos, total)
})
