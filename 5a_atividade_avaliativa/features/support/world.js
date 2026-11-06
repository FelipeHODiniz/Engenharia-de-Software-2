const { setWorldConstructor, defineParameterType } = require('@cucumber/cucumber')
const Servico = require('./dominio')

defineParameterType({ name: 'situacao', regexp: /na lista|fora da lista/, transformer: (texto) => texto })

class MundoDoNewsFlow {
  constructor() {
    this.servico = new Servico()
    this.edicao = null
    this.mensagem = null
    this.emailRecebido = null
  }

  criarEdicaoAprovada(titulo) {
    this.edicao = this.servico.criarEdicao(titulo, 'Ana')
    this.servico.enviarParaRevisao(this.edicao)
    this.servico.aprovar(this.edicao, 'Carla')
  }
}

setWorldConstructor(MundoDoNewsFlow)
