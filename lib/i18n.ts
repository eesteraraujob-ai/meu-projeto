export type Language = 'pt' | 'en';

const pt = {
  'home.title': 'Minhas tarefas',
  'home.profile': 'Perfil',
  'home.addTask': 'Adicionar tarefa',
  'home.summary.pending': 'Pendente',
  'home.summary.inProgress': 'Em andamento',
  'home.summary.completed': 'Concluída',

  'form.title': 'Título',
  'form.description': 'Descrição',
  'form.startDate': 'Data de início (DD/MM/AAAA ou AAAA-MM-DD)',
  'form.startTime': 'Hora de início (HH:MM)',
  'form.dueDate': 'Data de conclusão (DD/MM/AAAA ou AAAA-MM-DD)',
  'form.priority': 'Prioridade',
  'form.status': 'Status',

  'filter.title': 'Filtros',
  'filter.status': 'Status',
  'filter.priority': 'Prioridade',
  'filter.date': 'Data',
  'filter.all': 'Todas',
  'filter.dateScope.all': 'Todas',
  'filter.dateScope.today': 'Hoje',
  'filter.dateScope.this_week': 'Esta semana',
  'filter.dateScope.overdue': 'Atrasadas',
  'filter.dateScope.none': 'Sem data',

  'card.start': 'Início',
  'card.due': 'Conclusão',
  'card.priority': 'Prioridade',
  'card.status': 'Status',
  'card.edit': 'Editar',
  'card.delete': 'Excluir',

  'transition.start': 'Iniciar',
  'transition.complete': 'Concluir',
  'transition.pause': 'Pausar',
  'transition.reopenPending': 'Reabrir como pendente',
  'transition.reopenInProgress': 'Reabrir em andamento',

  'list.empty': 'Nenhuma tarefa encontrada.',

  'taskDetail.title': 'Editar tarefa',
  'taskDetail.save': 'Salvar',

  'status.pending': 'Pendente',
  'status.in_progress': 'Em andamento',
  'status.completed': 'Concluída',

  'priority.low': 'Baixa',
  'priority.medium': 'Média',
  'priority.high': 'Alta',

  'common.noDate': 'Sem data',
  'common.noTime': 'Sem hora',
  'common.back': 'Voltar',

  'alert.requiredTitleTitle': 'Título obrigatório',
  'alert.requiredTitleMessageCreate': 'Informe um título para salvar a tarefa.',
  'alert.requiredTitleMessageEdit': 'O título da tarefa não pode ficar vazio.',
  'alert.invalidDateTitle': 'Data inválida',
  'alert.invalidStartDateMessage': 'Informe a data de início no formato DD/MM/AAAA ou AAAA-MM-DD.',
  'alert.invalidDueDateMessage': 'Informe a data de conclusão no formato DD/MM/AAAA ou AAAA-MM-DD.',
  'alert.invalidTimeTitle': 'Hora inválida',
  'alert.invalidTimeMessage': 'Informe a hora de início no formato HH:MM.',

  'profile.title': 'Perfil',
  'profile.tasksSection': 'Tarefas',
  'profile.total': 'Total',
  'profile.completed': 'Concluídas',
  'profile.pending': 'Pendentes',
  'profile.themeSection': 'Tema',
  'profile.light': 'Claro',
  'profile.dark': 'Escuro',
  'profile.languageSection': 'Idioma',
  'profile.portuguese': 'Português',
  'profile.english': 'English',
  'profile.aboutSection': 'Sobre o app',
  'profile.aboutDescription':
    'Gerenciador de tarefas pessoal e local-first: os dados ficam só no seu dispositivo, sem servidor e sem conta.',
  'profile.version': 'Versão',
};

type Translations = typeof pt;

const en: Translations = {
  'home.title': 'My tasks',
  'home.profile': 'Profile',
  'home.addTask': 'Add task',
  'home.summary.pending': 'Pending',
  'home.summary.inProgress': 'In progress',
  'home.summary.completed': 'Completed',

  'form.title': 'Title',
  'form.description': 'Description',
  'form.startDate': 'Start date (DD/MM/YYYY or YYYY-MM-DD)',
  'form.startTime': 'Start time (HH:MM)',
  'form.dueDate': 'Due date (DD/MM/YYYY or YYYY-MM-DD)',
  'form.priority': 'Priority',
  'form.status': 'Status',

  'filter.title': 'Filters',
  'filter.status': 'Status',
  'filter.priority': 'Priority',
  'filter.date': 'Date',
  'filter.all': 'All',
  'filter.dateScope.all': 'All',
  'filter.dateScope.today': 'Today',
  'filter.dateScope.this_week': 'This week',
  'filter.dateScope.overdue': 'Overdue',
  'filter.dateScope.none': 'No date',

  'card.start': 'Start',
  'card.due': 'Due',
  'card.priority': 'Priority',
  'card.status': 'Status',
  'card.edit': 'Edit',
  'card.delete': 'Delete',

  'transition.start': 'Start',
  'transition.complete': 'Complete',
  'transition.pause': 'Pause',
  'transition.reopenPending': 'Reopen as pending',
  'transition.reopenInProgress': 'Reopen as in progress',

  'list.empty': 'No tasks found.',

  'taskDetail.title': 'Edit task',
  'taskDetail.save': 'Save',

  'status.pending': 'Pending',
  'status.in_progress': 'In progress',
  'status.completed': 'Completed',

  'priority.low': 'Low',
  'priority.medium': 'Medium',
  'priority.high': 'High',

  'common.noDate': 'No date',
  'common.noTime': 'No time',
  'common.back': 'Back',

  'alert.requiredTitleTitle': 'Title required',
  'alert.requiredTitleMessageCreate': 'Enter a title to save the task.',
  'alert.requiredTitleMessageEdit': "The task's title cannot be empty.",
  'alert.invalidDateTitle': 'Invalid date',
  'alert.invalidStartDateMessage': 'Enter the start date as DD/MM/YYYY or YYYY-MM-DD.',
  'alert.invalidDueDateMessage': 'Enter the due date as DD/MM/YYYY or YYYY-MM-DD.',
  'alert.invalidTimeTitle': 'Invalid time',
  'alert.invalidTimeMessage': 'Enter the start time as HH:MM.',

  'profile.title': 'Profile',
  'profile.tasksSection': 'Tasks',
  'profile.total': 'Total',
  'profile.completed': 'Completed',
  'profile.pending': 'Pending',
  'profile.themeSection': 'Theme',
  'profile.light': 'Light',
  'profile.dark': 'Dark',
  'profile.languageSection': 'Language',
  'profile.portuguese': 'Português',
  'profile.english': 'English',
  'profile.aboutSection': 'About the app',
  'profile.aboutDescription':
    'A personal, local-first task manager: your data stays on your device, with no server and no account.',
  'profile.version': 'Version',
};

export const translations: Record<Language, Translations> = { pt, en };
export type TranslationKey = keyof Translations;
