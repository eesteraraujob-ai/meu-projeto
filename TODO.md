# TODO — Próximos passos

Levantamento feito em 2026-08-25 comparando o código atual com [spec.md](specs/001-task-manager/spec.md), [plan.md](specs/001-task-manager/plan.md), [data-model.md](specs/001-task-manager/data-model.md) e [tasks.md](specs/001-task-manager/tasks.md).

**Resumo:** `tasks.md` marca as 25 tarefas como concluídas, mas parte delas não está no código. O fluxo principal (criar, listar, editar, concluir, excluir) funciona; faltam filtro por data, validação de prioridade/status e o refresh da lista após edição.

---

## P0 — Bugs e requisitos não atendidos

### 1. Lista não atualiza depois de editar uma tarefa
`app/index.tsx` carrega as tarefas só na montagem (`useEffect(..., [])`). Ao editar em `/task/[id]` e voltar, a home continua mostrando os dados antigos, porque a tela não é desmontada pelo Stack.

- Trocar por `useFocusEffect` do `expo-router` em [app/index.tsx:27-29](app/index.tsx#L27-L29).
- Viola **FR-009** ("manter a informação atualizada após qualquer criação, edição ou mudança de status").

### 2. Filtro por data não existe
O `useMemo` de filtragem em [app/index.tsx:31-37](app/index.tsx#L31-L37) só cobre status e prioridade.

- Implementar o filtro por data (sugestão de escopos: hoje, esta semana, atrasadas, sem data).
- Viola **FR-007**; faz o passo 6 do [quickstart](specs/001-task-manager/quickstart.md#L22) falhar.
- Corresponde a T016/T018, marcadas como concluídas sem estarem.

### 3. Prioridade e status aceitam texto livre
Nas duas telas os campos são `TextInput` com cast direto (`value as TaskPriority`), então dá para salvar `"banana"` como prioridade.

- [app/index.tsx:94-107](app/index.tsx#L94-L107) e [app/task/[id].tsx:69-74](app/task/[id].tsx#L69-L74).
- Substituir por seletores (chips/segmented) alimentados por `TASK_PRIORITIES` e `TASK_STATUSES`.
- Viola as regras de validação do data-model e o princípio IV da constituição ("falhar de forma clara; falha silenciosa é proibida"). Corresponde a T014.

### 4. Data de conclusão não é validada nem normalizada
O campo aceita qualquer string e vai direto para o banco. `normalizeDateInput` já existe em [lib/date.ts:1](lib/date.ts#L1) e nunca é chamado — o contrato exige ISO para ordenação estável.

- Aplicar `normalizeDateInput` no salvamento e `formatDateLabel` na exibição.

### 5. `tsconfig.json` quebrado — `npx tsc --noEmit` falha
`"ignoreDeprecations": "6.0"` é inválido no TypeScript 5.9 → `error TS5103`. Trocando para `"5.0"` o projeto compila sem nenhum erro.

- Corrigir [tsconfig.json:20](tsconfig.json#L20).
- Adicionar `"typecheck": "tsc --noEmit"` aos scripts do [package.json](package.json#L6-L11) — é o único gate automático coerente com a constituição (que dispensa testes, não checagem de tipos).

---

## P1 — Aderência ao plano e às user stories

### 6. Código morto: `constants/` e `lib/` não são importados em lugar nenhum
`TASK_PRIORITIES`, `TASK_STATUSES`, `normalizeDateInput` e `formatDateLabel` existem mas nunca são usados. Os itens 3 e 4 resolvem isso ao consumi-los; se algo sobrar sem uso, remover — a constituição proíbe código especulativo.

### 7. Transições de status incompletas (US3)
A lista só oferece "Concluir". Não há como levar uma tarefa de pendente → em andamento, nem reabrir uma concluída, a não ser digitando no campo livre da tela de edição.

- Expor as transições do [data-model](specs/001-task-manager/data-model.md#L38-L44) direto no card.
- Corresponde a T013/T020.

### 8. Resumo de progresso ausente (US3)
T019 pede "status summary and progress affordances" na tela principal — não existe.

- Adicionar contadores de pendentes / em andamento / concluídas no topo da lista. Atende **SC-004**.

### 9. Componentes previstos no plano não foram extraídos
`components/` está vazia. O plano previa `TaskForm.tsx`, `TaskList.tsx`, `TaskCard.tsx` e `FilterBar.tsx` (T009, T010, T015); hoje tudo está inline em `app/index.tsx`, que já tem 246 linhas misturando formulário, filtros, lista e estilos.

- Extrair pelo menos `TaskCard` e `FilterBar` — são o que mais cresce com os itens 2, 7 e 8.
- Decisão alternativa válida: se preferir manter tudo inline por simplicidade, **atualizar o plano** para refletir isso em vez de deixar a divergência.

### 10. Sincronizar `tasks.md` com a realidade
Reabrir T009, T010, T013, T014, T015, T016, T018, T019, T020 e T024 (o quickstart não passa hoje) e marcar de novo só depois da verificação manual.

---

## P2 — Consistência e higiene

### 11. Exclusão de tarefa não está especificada
`deleteTask` está implementado e o botão "Excluir" está na tela, mas nenhum FR cobre exclusão e o contrato diz que delete/archive só entra "se o escopo do produto crescer além da versão inicial" ([task-db.md:33](specs/001-task-manager/contracts/task-db.md#L33)).

- Decidir: adicionar um FR-011 na spec ou remover o botão. Hoje o código está à frente da spec.

### 12. Importação de tipos inconsistente
`app/index.tsx` importa `Task`/`TaskPriority`/`TaskStatus` de `db/tasks`, enquanto `app/task/[id].tsx` importa de `types/task`. O re-export em [db/tasks.ts:4](db/tasks.ts#L4) só existe para sustentar isso.

- Padronizar em `types/task` e remover o re-export.

### 13. Verificar o suporte a web de verdade
`app.json` declara a plataforma `web` e o último commit menciona "suporte web", mas `expo-sqlite` na web exige configuração adicional e `db/index.ts` chama `initializeDb()` como efeito colateral de import ([db/index.ts:20](db/index.ts#L20)) — se falhar na web, o bundle inteiro quebra no carregamento.

- Rodar `npm run web` e confirmar. Se não funcionar, ou configurar o SQLite web ou remover `"web"` de `platforms`.

### 14. Repositório `async` sobre API síncrona
Todas as funções de `db/tasks.ts` são `async` mas usam `getAllSync`/`runSync`. Não é bug, mas sugere I/O assíncrono que não existe. Manter como está (permite trocar de driver depois) ou simplificar para síncrono — escolha consciente, não acidental.

### 15. `ignoreDeprecations` e `lib: ["esnext"]`
O `tsconfig` sobrescreve `lib` sem incluir `dom`, apesar do alvo web. Compila hoje, mas revisar junto do item 13.

---

## Ordem sugerida

1. **Sanidade** — itens 5 e 13: fazer o typecheck e o `npm run web` passarem antes de mexer em feature.
2. **Fechar as user stories** — itens 1, 2, 3, 4, 7, 8: é o que falta para spec e código baterem.
3. **Limpeza** — itens 6, 9, 11, 12: consolidar depois que o comportamento estiver correto.
4. **Sincronizar a documentação** — item 10 e reexecutar o [quickstart](specs/001-task-manager/quickstart.md) inteiro como validação manual final.
