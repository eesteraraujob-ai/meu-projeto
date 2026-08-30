# Task Manager

Gerenciador de tarefas pessoal para acompanhar atividades do dia a dia. Cada tarefa tem título, descrição, data de conclusão, prioridade e status (pendente, em andamento, concluída), com filtros para focar no que importa.

Aplicativo local-first: os dados ficam em um banco SQLite no próprio dispositivo, sem servidor, sem conta e sem sincronização.

## Stack

| Camada | Escolha |
|---|---|
| Linguagem | TypeScript (strict) |
| Runtime | React Native 0.81 via Expo SDK 54 |
| Navegação | Expo Router 6 (file-based, typed routes) |
| Persistência | expo-sqlite (API síncrona) |
| Plataformas | iOS e Android |

O projeto é guiado pelo Spec Kit — especificação, plano e tarefas vivem em [specs/](specs/) e as regras de projeto em [.specify/memory/constitution.md](.specify/memory/constitution.md).

## Como rodar

Pré-requisitos: Node.js e o app Expo Go (ou um emulador/simulador).

```bash
npm install
npm start        # abre o Expo Dev Server (QR code para o Expo Go)
```

Atalhos por plataforma:

```bash
npm run android
npm run ios
```

Não há suíte de testes automatizados — a validação é manual, por decisão registrada na constituição do projeto. O roteiro de verificação está em [quickstart.md](specs/001-task-manager/quickstart.md).

## Estrutura

```text
app/                    telas (Expo Router)
├── _layout.tsx         Stack raiz e estilo do header
├── index.tsx           lista, formulário de criação e filtros
└── task/[id].tsx       edição de uma tarefa
constants/              enums de prioridade e status
db/
├── index.ts            abertura do banco e criação do schema
└── tasks.ts            repositório de tarefas (CRUD)
lib/date.ts             normalização e formatação de datas
types/task.ts           tipos Task, TaskInput, TaskStatus, TaskPriority
specs/001-task-manager/ spec, plano, modelo de dados, contrato e tarefas
```

A UI é dividida em `TaskForm`, `TaskList`, `TaskCard` e `FilterBar` dentro de `components/`.

## Modelo de dados

Tabela única `tasks`, criada automaticamente na primeira execução por `initializeDb()` em [db/index.ts](db/index.ts):

| Coluna | Tipo | Obrigatório | Observação |
|---|---|---|---|
| `id` | TEXT | sim | chave primária, gerada no app |
| `title` | TEXT | sim | não pode ser vazio |
| `description` | TEXT | não | |
| `due_date` | TEXT | não | data ISO (`YYYY-MM-DD`) |
| `priority` | TEXT | sim | `low` \| `medium` \| `high` |
| `status` | TEXT | sim | `pending` \| `in_progress` \| `completed` |
| `created_at` | TEXT | sim | timestamp ISO |
| `updated_at` | TEXT | sim | timestamp ISO |

A listagem ordena por status (pendente → em andamento → concluída), depois por data de conclusão mais próxima e por última modificação.

Contrato completo em [contracts/task-db.md](specs/001-task-manager/contracts/task-db.md); modelo e regras de validação em [data-model.md](specs/001-task-manager/data-model.md).

## API do repositório

Todas as funções ficam em [db/tasks.ts](db/tasks.ts):

```ts
getAllTasks(): Task[]
getTaskById(id: string): Task | null
createTask(input: TaskInput): Task
updateTask(id: string, patches: Partial<TaskInput>): Task | null
deleteTask(id: string): void
```

Funções síncronas de propósito — refletem a API síncrona do `expo-sqlite` (`getAllSync`/`runSync`) usada por baixo, sem I/O assíncrono real a esconder.

As queries são SQL direto, sem camada de abstração — decisão registrada em [research.md](specs/001-task-manager/research.md).

## Princípios do projeto

A [constituição](.specify/memory/constitution.md) é a referência para qualquer mudança:

1. **Pequeno e simples** — uma finalidade clara, sem abstração especulativa.
2. **Legibilidade acima de esperteza** — nomes que descrevem intenção, fluxo direto.
3. **Validação mínima, sem exigência de testes automatizados** — verificação manual e revisão de código.
4. **Mudanças diretas, defensivas e óbvias** — guard clauses; falhar de forma clara, nunca em silêncio.
5. **Simplicidade na entrega** — nova dependência só quando o caminho atual for insuficiente.

## Estado atual

O núcleo funciona: criar, listar, editar, excluir e mudar o status de tarefas (pendente ↔ em andamento ↔ concluída), com filtros por status, prioridade e data. O app é focado em iOS e Android — o suporte a Web foi tentado e removido: o backend web do `expo-sqlite` (worker + WebAssembly) travava na inicialização (`Sync operation timeout`) mesmo com os headers de isolamento configurados. O levantamento completo e os próximos passos estão em [TODO.md](TODO.md).
