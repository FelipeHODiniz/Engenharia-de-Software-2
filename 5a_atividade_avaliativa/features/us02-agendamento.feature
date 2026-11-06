# language: pt
@US02 @RN03 @RN04
Funcionalidade: Agendar envio
  Como gestora
  Quero agendar o envio de uma edição aprovada para os segmentos escolhidos
  Para que cada público receba a edição na hora certa, sem que eu precise acompanhar o disparo

  Contexto:
    Dado que agora são "10/03/2027 às 08:00"
    E que a edição "Informativo #42" está aprovada

  @feliz
  Cenário: Agendamento com antecedência suficiente
    Dado que o segmento "Clientes Premium" tem 1200 assinantes
    Quando a gestora agenda o envio para o segmento "Clientes Premium" daqui a 30 minutos
    Então o disparo está agendado para "10/03/2027 às 08:30"
    E a mensagem exibida é "Envio agendado"

  @limite
  Esquema do Cenário: Antecedência mínima de 15 minutos
    Dado que o segmento "Clientes Premium" tem 1200 assinantes
    Quando a gestora agenda o envio para o segmento "Clientes Premium" daqui a <minutos> minutos
    Então a mensagem exibida é "<mensagem>"
    E a edição está no estado "<estado>"

    Exemplos:
      | minutos | mensagem                               | estado   |
      | 60      | Envio agendado                         | agendada |
      | 16      | Envio agendado                         | agendada |
      | 15      | Envio agendado                         | agendada |
      | 14      | O envio precisa de ao menos 15 minutos | aprovada |
      | 0       | O envio precisa de ao menos 15 minutos | aprovada |

  @limite
  Esquema do Cenário: Limite de 5 segmentos por edição
    Dado que existem <quantidade> segmentos com 100 assinantes cada
    Quando a gestora agenda o envio para todos os segmentos daqui a 30 minutos
    Então a mensagem exibida é "<mensagem>"
    E a edição está no estado "<estado>"

    Exemplos:
      | quantidade | mensagem                                  | estado   |
      | 4          | Envio agendado                            | agendada |
      | 5          | Envio agendado                            | agendada |
      | 6          | Uma edição vai para no máximo 5 segmentos | aprovada |

  @excecao
  Cenário: Segmento com zero assinantes bloqueia o agendamento
    Dado que o segmento "Lista Beta" tem 0 assinantes
    Quando a gestora agenda o envio para o segmento "Lista Beta" daqui a 30 minutos
    Então a mensagem exibida é "Segmento sem assinantes bloqueia o agendamento"
    E a edição está no estado "aprovada"

  @alternativo
  Cenário: Quem está em dois segmentos recebe um único e-mail
    Dado que o segmento "Clientes Premium" tem 1000 assinantes
    E que o segmento "Belo Horizonte" tem 500 assinantes
    E que 200 assinantes estão nos segmentos "Clientes Premium" e "Belo Horizonte"
    Quando a gestora agenda o envio para os segmentos "Clientes Premium" e "Belo Horizonte" daqui a 30 minutos
    Então o disparo prevê 1300 e-mails, um para cada assinante
