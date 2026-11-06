const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')
const { formatarDataHora, MINUTO } = require('../support/dominio')

function agendarDaquiA(mundo, segmentos, minutos) {
  const instante = mundo.servico.agora + minutos * MINUTO
  mundo.mensagem = mundo.servico.agendar(mundo.edicao, segmentos, instante)
}

Given('que a edição {string} está aprovada', function (titulo) {
  this.criarEdicaoAprovada(titulo)
})

Given('que o segmento {string} tem {int} assinantes', function (nome, quantidade) {
  this.servico.definirSegmento(nome, quantidade)
})

Given('que existem {int} segmentos com {int} assinantes cada', function (segmentos, assinantes) {
  for (let i = 1; i <= segmentos; i++) this.servico.definirSegmento(`Segmento ${i}`, assinantes)
})

Given('que {int} assinantes estão nos segmentos {string} e {string}', function (quantidade, origem, destino) {
  this.servico.compartilharAssinantes(quantidade, origem, destino)
})

When('a gestora agenda o envio para o segmento {string} daqui a {int} minutos', function (nome, minutos) {
  agendarDaquiA(this, [nome], minutos)
})

When('a gestora agenda o envio para os segmentos {string} e {string} daqui a {int} minutos', function (a, b, minutos) {
  agendarDaquiA(this, [a, b], minutos)
})

When('a gestora agenda o envio para todos os segmentos daqui a {int} minutos', function (minutos) {
  agendarDaquiA(this, [...this.servico.segmentos.keys()], minutos)
})

Then('o disparo está agendado para {string}', function (esperado) {
  assert.equal(formatarDataHora(this.edicao.disparo.instante), esperado)
})

Then('o disparo prevê {int} e-mails, um para cada assinante', function (quantidade) {
  const emails = this.servico.emailsDoDisparo(this.edicao.disparo)
  assert.equal(emails.length, quantidade)
  assert.equal(new Set(emails).size, quantidade)
})
