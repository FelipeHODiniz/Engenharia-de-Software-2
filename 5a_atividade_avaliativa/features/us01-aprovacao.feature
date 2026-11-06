# language: pt
@US01 @RN02
Funcionalidade: Aprovar edição
  Como revisora
  Quero aprovar ou devolver uma edição antes do envio
  Para que nenhum conteúdo chegue aos assinantes sem uma segunda leitura

  Contexto:
    Dado que a edição "Informativo #42" foi escrita por "Ana"
    E que a edição foi enviada para revisão

  @feliz
  Cenário: Revisora aprova a edição de outra pessoa
    Quando a revisora "Carla" aprova a edição
    Então a mensagem exibida é "Edição aprovada"
    E a edição está no estado "aprovada"

  @excecao
  Cenário: Autora que também é revisora não aprova a própria edição
    Quando a revisora "Ana" aprova a edição
    Então a mensagem exibida é "A autora não pode aprovar a própria edição"
    E a edição está no estado "em revisão"

  @alternativo
  Cenário: Reprovação devolve a edição ao rascunho com o comentário
    Quando a revisora "Carla" reprova a edição com o comentário "Corrigir a data do evento"
    Então a mensagem exibida é "Edição devolvida ao rascunho"
    E a edição está no estado "rascunho"
    E o comentário da reprovação é "Corrigir a data do evento"

  @excecao
  Cenário: Reprovação sem comentário é recusada
    Quando a revisora "Carla" reprova a edição sem comentário
    Então a mensagem exibida é "O comentário é obrigatório para reprovar"
    E a edição está no estado "em revisão"

  @excecao
  Cenário: Edição sem aprovação não pode ser agendada
    Dado que agora são "10/03/2027 às 08:00"
    E que o segmento "Clientes Premium" tem 1200 assinantes
    Quando a gestora agenda o envio para o segmento "Clientes Premium" daqui a 30 minutos
    Então a mensagem exibida é "O envio exige a aprovação de uma revisora"
    E a edição está no estado "em revisão"
