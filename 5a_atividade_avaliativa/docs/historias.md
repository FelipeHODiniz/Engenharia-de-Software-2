# Histórias de usuário — NewsFlow

As quatro histórias acompanham uma edição da aprovação ao disparo e terminam no direito do assinante de sair da lista.

## US01 — Aprovar edição

**Como** revisora
**Quero** aprovar ou devolver uma edição antes do envio
**Para** que nenhum conteúdo chegue aos assinantes sem uma segunda leitura

**Critérios de aceitação**
- Uma revisora diferente da autora pode aprovar a edição.
- A autora não aprova a própria edição, mesmo quando também atua como revisora.
- A reprovação devolve a edição ao rascunho com um comentário.
- A reprovação sem comentário é recusada.
- Uma edição sem aprovação não pode ser agendada.

**Regras cobertas:** RN02
**Prioridade:** Alta — um erro enviado a 40 mil assinantes não pode ser desfeito.
**Cenários:** features/us01-aprovacao.feature

## US02 — Agendar envio

**Como** gestora
**Quero** agendar o envio de uma edição aprovada para os segmentos escolhidos
**Para** que cada público receba a edição na hora certa, sem que eu precise acompanhar o disparo

**Critérios de aceitação**
- O envio é agendado para no mínimo 15 minutos à frente, no fuso America/Sao_Paulo.
- Uma edição vai para no máximo 5 segmentos.
- Um segmento com zero assinantes bloqueia o agendamento.
- Quem está em dois segmentos recebe um único e-mail.

**Regras cobertas:** RN03 (antecedência mínima) e RN04
**Prioridade:** Alta — é o momento em que o trabalho da equipe chega ao público.
**Cenários:** features/us02-agendamento.feature

## US03 — Reagendar ou cancelar envio

**Como** gestora
**Quero** mudar o horário de um envio ou cancelá-lo
**Para** reagir a imprevistos sem enviar uma edição fora de hora

**Critérios de aceitação**
- Um envio pode ser reagendado até 2 vezes.
- O novo horário também respeita a antecedência mínima de 15 minutos.
- Um reagendamento recusado mantém o horário anterior.
- O cancelamento é permitido até 5 minutos antes do horário marcado.

**Regras cobertas:** RN03 (reagendamento e cancelamento)
**Prioridade:** Média — o imprevisto é menos frequente que o agendamento, mas um envio errado afeta toda a lista.
**Cenários:** features/us03-reagendamento.feature

## US04 — Descadastrar-se da lista

**Como** assinante
**Quero** sair da lista pelo próprio e-mail e poder voltar quando quiser
**Para** receber somente o que me interessa, sem depender de ninguém

**Critérios de aceitação**
- Todo e-mail traz o link de descadastro.
- O descadastro tem efeito imediato e é confirmado por e-mail.
- O pedido de retorno não recoloca a assinante na lista antes da confirmação.
- O link de confirmação do retorno vale por 48 horas.

**Regras cobertas:** RN06
**Prioridade:** Alta — respeitar a saída do assinante protege a confiança na marca e a reputação da lista.
**Cenários:** features/us04-descadastro.feature

## Decisões de interpretação

As regras não detalham estes pontos. A dupla adotou as leituras abaixo, que devem ser confirmadas com o negócio em um projeto real.

- "Até" e "no mínimo" incluem o próprio limite: 15 minutos, 5 minutos antes e 48 horas ainda são aceitos.
- O reagendamento obedece à mesma antecedência mínima de 15 minutos do agendamento.
- Uma tentativa recusada de reagendar não consome uma das 2 oportunidades.
