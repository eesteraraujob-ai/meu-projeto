# TODO — Próximos passos

Levantamento original feito em 2026-08-25; revisado em 2026-08-29, 2026-08-30 e 2026-09-02 conforme o app foi testado num iPhone real via Expo Go.

**Resumo:** os gaps do levantamento original (refresh da lista, filtro por data, validação de prioridade/status, normalização de data, tsconfig, componentização, transições de status, resumo de progresso, suporte a web, inconsistência async/sync no repositório) foram todos resolvidos. `tasks.md` está sincronizado com a realidade. Resta validar o quickstart de ponta a ponta.

---

## Pendências

### 1. Concluir a validação do quickstart num dispositivo real (T024)
Conseguimos conectar no iPhone via Expo Go (30/08) depois de trocar de rede — o `fetch failed` anterior era mesmo problema de rede local (provável AP isolation), não do app. A partir daí, bugs reais apareceram só ao rodar em hardware de verdade (nenhum aparecia no typecheck nem no teste via browser/Playwright):

- **Crash ao renderizar uma tarefa com status inválido** ([components/TaskCard.tsx](components/TaskCard.tsx)): `STATUS_TRANSITIONS[task.status]` quebrava com `Cannot read property 'map' of undefined` para qualquer tarefa cujo status no SQLite do aparelho não fosse exatamente `pending`/`in_progress`/`completed` — resíduo de testes antigos, de antes dos seletores (T014) existirem. Corrigido com fallback para array vazio.
- **Validação de data rejeitava entradas corretas** ([lib/date.ts](lib/date.ts)): `normalizeDateInput` dependia do parser lenient do `new Date(string)`, que só reconhece `AAAA-MM-DD` de forma confiável; qualquer variação (`DD/MM/AAAA`, `DD-MM-AAAA`) era rejeitada como inválida. Reescrito para reconhecer explicitamente os dois formatos.
- **Data exibida um dia antes da salva** (mesmo arquivo): `formatDateLabel` passava a data por `new Date(string)` + `toLocaleDateString`, que interpreta uma string `AAAA-MM-DD` como meia-noite UTC e depois formata no fuso local do aparelho — num fuso atrás de UTC (como o do Brasil) isso sempre exibia o dia anterior. O mesmo problema afetava `matchesDueDateScope` ao calcular "hoje"/"esta semana" via `toISOString()`. Corrigido: `formatDateLabel` agora só manipula a string ISO diretamente (sem `Date`/fuso nenhum) e `matchesDueDateScope` calcula "hoje" a partir dos componentes locais (`getFullYear`/`getMonth`/`getDate`) em vez de UTC. Confirmado corrigido no aparelho em 02/09.

Resolvido e confirmado no aparelho. Falta só rodar o roteiro completo de [quickstart.md](specs/001-task-manager/quickstart.md) do início ao fim como validação manual final.

### 2. Limpar dados de teste inválidos no SQLite do aparelho
Existem pelo menos 2 tarefas no banco do iPhone usado nos testes com `status`/`priority` sendo o rótulo em português (`"Pendente"`, `"Alta "`) em vez do valor do enum (`pending`, `high`) — resíduo de quando os campos ainda eram texto livre, antes de T014. O guard em `TaskCard.tsx` evita que isso derrube a tela, mas essas tarefas não têm botões de transição de status. Apagar pela própria UI (Excluir) quando for revalidar o quickstart.
