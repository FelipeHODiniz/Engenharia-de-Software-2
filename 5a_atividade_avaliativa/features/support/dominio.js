// Domínio em memória do NewsFlow: o foco do exercício é o encadeamento
// Gherkin -> step -> verificação. O relógio é controlado, sem esperas reais.
const FUSO = 'America/Sao_Paulo'
const MINUTO = 60 * 1000
const HORA = 60 * MINUTO
const ANTECEDENCIA_MINIMA = 15 * MINUTO
const LIMITE_REAGENDAMENTOS = 2
const LIMITE_SEGMENTOS = 5
const JANELA_CANCELAMENTO = 5 * MINUTO
const VALIDADE_RETORNO = 48 * HORA
const LINK_DESCADASTRO = 'link de descadastro'

const formatador = new Intl.DateTimeFormat('en-GB', {
  timeZone: FUSO, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
})

function partesNoFuso(instante) {
  const partes = {}
  for (const { type, value } of formatador.formatToParts(instante)) partes[type] = value
  return partes
}

function formatarDataHora(instante) {
  const p = partesNoFuso(instante)
  return `${p.day}/${p.month}/${p.year} às ${p.hour}:${p.minute}`
}

function interpretarDataHora(texto) {
  const achado = /^(\d{2})\/(\d{2})\/(\d{4}) às (\d{2}):(\d{2})$/.exec(texto)
  if (!achado) throw new Error(`Data e hora inválidas: ${texto}`)
  const [dia, mes, ano, hora, minuto] = achado.slice(1).map(Number)
  const comoUtc = Date.UTC(ano, mes - 1, dia, hora, minuto)
  const p = partesNoFuso(comoUtc)
  const noFuso = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute)
  return comoUtc + (comoUtc - noFuso)
}

class Servico {
  constructor() {
    this.agora = interpretarDataHora('01/01/2027 às 08:00')
    this.segmentos = new Map()
    this.assinantes = new Map()
  }

  definirAgora(texto) { this.agora = interpretarDataHora(texto) }
  avancarRelogio(ms) { this.agora += ms }

  // US01: aprovação
  criarEdicao(titulo, autora) {
    return { titulo, autora, estado: 'rascunho', comentario: null, disparo: null }
  }

  enviarParaRevisao(edicao) { edicao.estado = 'em revisão' }

  aprovar(edicao, revisora) {
    if (revisora === edicao.autora) return 'A autora não pode aprovar a própria edição'
    edicao.estado = 'aprovada'
    return 'Edição aprovada'
  }

  reprovar(edicao, comentario) {
    if (!comentario || !comentario.trim()) return 'O comentário é obrigatório para reprovar'
    edicao.estado = 'rascunho'
    edicao.comentario = comentario
    return 'Edição devolvida ao rascunho'
  }

  // US02: agendamento e segmentação
  definirSegmento(nome, quantidade) {
    const membros = new Set()
    for (let i = 1; i <= quantidade; i++) membros.add(`${nome}-${i}`)
    this.segmentos.set(nome, membros)
  }

  compartilharAssinantes(quantidade, nomeOrigem, nomeDestino) {
    const destino = this.segmentos.get(nomeDestino)
    const compartilhados = [...this.segmentos.get(nomeOrigem)].slice(0, quantidade)
    const removidos = [...destino].slice(0, quantidade)
    removidos.forEach((id) => destino.delete(id))
    compartilhados.forEach((id) => destino.add(id))
  }

  agendar(edicao, nomesSegmentos, instante) {
    if (edicao.estado !== 'aprovada') return 'O envio exige a aprovação de uma revisora'
    if (nomesSegmentos.length > LIMITE_SEGMENTOS) return 'Uma edição vai para no máximo 5 segmentos'
    if (nomesSegmentos.some((nome) => this.segmentos.get(nome).size === 0)) {
      return 'Segmento sem assinantes bloqueia o agendamento'
    }
    if (instante - this.agora < ANTECEDENCIA_MINIMA) return 'O envio precisa de ao menos 15 minutos'
    edicao.disparo = { instante, segmentos: nomesSegmentos, reagendamentos: 0 }
    edicao.estado = 'agendada'
    return 'Envio agendado'
  }

  emailsDoDisparo(disparo) {
    const destinatarios = new Set()
    for (const nome of disparo.segmentos) {
      for (const id of this.segmentos.get(nome)) destinatarios.add(id)
    }
    return [...destinatarios]
  }

  // US03: reagendamento e cancelamento
  reagendar(edicao, instante) {
    const { disparo } = edicao
    if (disparo.reagendamentos >= LIMITE_REAGENDAMENTOS) return 'O limite de 2 reagendamentos foi atingido'
    if (instante - this.agora < ANTECEDENCIA_MINIMA) return 'O envio precisa de ao menos 15 minutos'
    disparo.instante = instante
    disparo.reagendamentos += 1
    return 'Envio reagendado'
  }

  cancelar(edicao) {
    if (edicao.disparo.instante - this.agora < JANELA_CANCELAMENTO) {
      return 'O cancelamento só é permitido até 5 minutos antes do envio'
    }
    edicao.estado = 'cancelada'
    return 'Envio cancelado'
  }

  // US04: descadastro e retorno
  cadastrarAssinante(nome) {
    this.assinantes.set(nome, { naLista: true, emails: [], pedidoDeRetorno: null })
  }

  enviarEmail(nome, assunto) {
    const email = { assunto, links: [LINK_DESCADASTRO] }
    this.assinantes.get(nome).emails.push(email)
    return email
  }

  descadastrar(nome) {
    this.assinantes.get(nome).naLista = false
    this.enviarEmail(nome, 'Confirmação de descadastro')
  }

  pedirRetorno(nome) {
    this.assinantes.get(nome).pedidoDeRetorno = this.agora
    this.enviarEmail(nome, 'Confirme seu retorno em até 48 horas')
  }

  confirmarRetorno(nome) {
    const assinante = this.assinantes.get(nome)
    if (this.agora - assinante.pedidoDeRetorno > VALIDADE_RETORNO) return 'O link de confirmação venceu'
    assinante.naLista = true
    return 'Retorno confirmado'
  }
}

module.exports = Servico
module.exports.formatarDataHora = formatarDataHora
module.exports.interpretarDataHora = interpretarDataHora
module.exports.MINUTO = MINUTO
module.exports.HORA = HORA
module.exports.LINK_DESCADASTRO = LINK_DESCADASTRO
