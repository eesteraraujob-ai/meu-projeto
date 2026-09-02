# TODO — Próximos passos

Levantamento original feito em 2026-08-25; revisado em 2026-08-29, 2026-08-30 e 2026-09-02 conforme o app foi testado num iPhone real via Expo Go.

**Resumo:** os gaps do levantamento original (refresh da lista, filtro por data, validação de prioridade/status, normalização de data, tsconfig, componentização, transições de status, resumo de progresso, suporte a web, inconsistência async/sync no repositório) foram todos resolvidos. `tasks.md` está sincronizado com a realidade. Resta validar o quickstart de ponta a ponta.

---

## Pendências

### 1. Concluir a validação do quickstart num dispositivo real (T024)
Conseguimos conectar no iPhone via Expo Go (30/08) depois de trocar de rede — o `fetch failed` anterior era mesmo problema de rede local (provável AP isolation), não do app. A partir daí, dois bugs reais apareceram só ao rodar em hardware de verdade (nenhum dos dois aparecia no typecheck nem no teste via browser/Playwright):

- **Crash ao renderizar uma tarefa com status inválido** ([components/TaskCard.tsx](components/TaskCard.tsx)): `STATUS_TRANSITIONS[task.status]` quebrava com `Cannot read property 'map' of undefined` para qualquer tarefa cujo status no SQLite do aparelho não fosse exatamente `pending`/`in_progress`/`completed` — resíduo de testes antigos, de antes dos seletores (T014) existirem. Corrigido com fallback para array vazio.
- **Validação de data rejeitava entradas corretas** ([lib/date.ts](lib/date.ts)): `normalizeDateInput` dependia do parser lenient do `new Date(string)`, que só reconhece `AAAA-MM-DD` de forma confiável; qualquer variação (`DD/MM/AAAA`, `DD-MM-AAAA`) era rejeitada como inválida, mesmo sendo o formato natural para um usuário brasileiro. Reescrito para reconhecer explicitamente os dois formatos e validar como data de calendário real.

Ainda falta: confirmar que a correção da data resolveu de fato no aparelho (aguardando confirmação do usuário) e rodar o roteiro completo de [quickstart.md](specs/001-task-manager/quickstart.md) do início ao fim como validação manual final.
