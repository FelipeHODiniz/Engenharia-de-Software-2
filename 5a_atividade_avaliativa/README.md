# NewsFlow BDD

Cenários executáveis do NewsFlow, a plataforma de newsletters e notificações da Vértice. Comece pelos arquivos `.feature`: eles descrevem o comportamento em linguagem de negócio.

**Dupla:** Beatriz Miranda Paiva e Felipe Henrique Oliveira Diniz

## Como rodar

```bash
npm install
npm test           # executa a suíte e gera relatorios/cucumber-report.html
npm run test:dry   # valida a sintaxe e confere se todo passo tem implementação
```

## Histórias e rastreabilidade

| História | Título | Regras | Cenários |
|---|---|---|---|
| US01 | Aprovar edição | RN02 | `features/us01-aprovacao.feature` |
| US02 | Agendar envio | RN03 (antecedência), RN04 | `features/us02-agendamento.feature` |
| US03 | Reagendar ou cancelar envio | RN03 (reagendamento e cancelamento) | `features/us03-reagendamento.feature` |
| US04 | Descadastrar-se da lista | RN06 | `features/us04-descadastro.feature` |

O detalhamento e as decisões de interpretação estão em `docs/historias.md`. Tags úteis: `@feliz`, `@excecao`, `@alternativo`, `@limite`, além de `@US01` a `@US04` e `@RN02` a `@RN06`. Exemplo: `npx cucumber-js --tags "@limite"`.

## Fora de escopo

- **RN01 (Rascunho):** ficou de fora porque a perda de texto afeta só o trabalho interno, enquanto as histórias escolhidas protegem o que chega ao assinante.
- **RN05 (Frequência):** ficou de fora porque depende de acompanhar vários disparos ao longo de semanas e formaria uma história própria.
- **RN07 (Falha de entrega):** ficou de fora porque trata do que acontece depois do disparo, etapa em que este recorte termina.
- **RN08 (Notificação):** ficou de fora porque trata do canal push, e as histórias escolhidas tratam do e-mail.

## Decisões técnicas

- O domínio é em memória (`features/support/dominio.js`), como o exercício permite.
- O relógio é controlado pelos cenários, sem esperas reais. As datas são sempre interpretadas no fuso America/Sao_Paulo.
- O estado de cada cenário fica no World, que é recriado a cada execução.

## Saída de `npm test`

```text
COLAR AQUI A SAÍDA REAL DE npm test
```
