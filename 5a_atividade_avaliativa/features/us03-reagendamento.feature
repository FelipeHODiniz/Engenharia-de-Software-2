# language: pt
@US03 @RN03
Funcionalidade: Reagendar ou cancelar envio
  Como gestora
  Quero mudar o horário de um envio ou cancelá-lo
  Para reagir a imprevistos sem enviar uma edição fora de hora

  Contexto:
    Dado que agora são "10/03/2027 às 08:00"
    E que a edição "Informativo #42" está agendada para "10/03/2027 às 10:00"

  @feliz
  Cenário: Reagendamento para um novo horário
    Quando a gestora reagenda o envio para "10/03/2027 às 14:00"
    Então o disparo está agendado para "10/03/2027 às 14:00"
    E a mensagem exibida é "Envio reagendado"

  @limite
  Esquema do Cenário: Limite de 2 reagendamentos
    Dado que o envio já foi reagendado <feitos>
    Quando a gestora reagenda o envio para "11/03/2027 às 09:00"
    Então a mensagem exibida é "<mensagem>"
    E o envio soma <total> reagendamentos

    Exemplos:
      | feitos  | mensagem                                  | total |
      | 0 vezes | Envio reagendado                          | 1     |
      | 1 vez   | Envio reagendado                          | 2     |
      | 2 vezes | O limite de 2 reagendamentos foi atingido | 2     |

  @excecao
  Cenário: Reagendamento sem a antecedência mínima mantém o horário anterior
    Quando a gestora reagenda o envio para "10/03/2027 às 08:10"
    Então a mensagem exibida é "O envio precisa de ao menos 15 minutos"
    E o disparo está agendado para "10/03/2027 às 10:00"

  @limite
  Esquema do Cenário: Cancelamento até 5 minutos antes do horário marcado
    Dado que faltam <minutos> minutos para o horário marcado
    Quando a gestora cancela o envio
    Então a mensagem exibida é "<mensagem>"
    E a edição está no estado "<estado>"

    Exemplos:
      | minutos | mensagem                                                   | estado    |
      | 6       | Envio cancelado                                            | cancelada |
      | 5       | Envio cancelado                                            | cancelada |
      | 4       | O cancelamento só é permitido até 5 minutos antes do envio | agendada  |
