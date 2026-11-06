# language: pt
@US04 @RN06
Funcionalidade: Descadastrar-se da lista
  Como assinante
  Quero sair da lista pelo próprio e-mail e poder voltar quando quiser
  Para receber somente o que me interessa, sem depender de ninguém

  Contexto:
    Dado que agora são "10/03/2027 às 08:00"
    E que a assinante "Dora" está na lista

  @feliz
  Cenário: Descadastro tem efeito imediato e é confirmado por e-mail
    Quando a assinante "Dora" usa o link de descadastro
    Então a assinante "Dora" está fora da lista
    E a assinante "Dora" recebe o e-mail "Confirmação de descadastro"

  @alternativo
  Esquema do Cenário: Todo e-mail traz o link de descadastro
    Quando o NewsFlow envia à assinante "Dora" o e-mail "<email>"
    Então o e-mail recebido traz o link de descadastro

    Exemplos:
      | email                   |
      | Informativo #42         |
      | Confirmação de cadastro |
      | Recibo                  |

  @alternativo
  Cenário: Pedido de retorno não recoloca a assinante na lista antes da confirmação
    Dado que a assinante "Dora" se descadastrou
    Quando a assinante "Dora" pede o retorno à lista
    Então a assinante "Dora" está fora da lista
    E a assinante "Dora" recebe o e-mail "Confirme seu retorno em até 48 horas"

  @limite
  Esquema do Cenário: Link de confirmação do retorno vale por 48 horas
    Dado que a assinante "Dora" pediu o retorno à lista há <horas> horas
    Quando a assinante "Dora" usa o link de confirmação
    Então a mensagem exibida é "<mensagem>"
    E a assinante "Dora" está <situacao>

    Exemplos:
      | horas | mensagem                     | situacao      |
      | 47    | Retorno confirmado           | na lista      |
      | 48    | Retorno confirmado           | na lista      |
      | 49    | O link de confirmação venceu | fora da lista |

  @excecao
  Cenário: Link vencido exige um novo pedido de retorno
    Dado que a assinante "Dora" pediu o retorno à lista há 72 horas
    Quando a assinante "Dora" usa o link de confirmação
    Então a mensagem exibida é "O link de confirmação venceu"
    E a assinante "Dora" está fora da lista
