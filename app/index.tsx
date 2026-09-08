import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import TaskForm, { TaskFormValue } from '../components/TaskForm';
import FilterBar, { TaskFilterValue } from '../components/FilterBar';
import TaskList from '../components/TaskList';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { createTask, deleteTask, getAllTasks, updateTask } from '../db/tasks';
import { matchesDueDateScope, normalizeDateInput, normalizeTimeInput } from '../lib/date';
import { ThemeColors } from '../lib/theme';
import { TASK_STATUSES } from '../constants/statuses';
import { Task, TaskStatus } from '../types/task';

const defaultForm: TaskFormValue = {
  title: '',
  description: '',
  startDate: '',
  startTime: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending',
};

const defaultFilter: TaskFilterValue = {
  status: 'all',
  priority: 'all',
  dueDateScope: 'all',
};

const SUMMARY_LABEL_KEYS: Record<TaskStatus, 'home.summary.pending' | 'home.summary.inProgress' | 'home.summary.completed'> = {
  pending: 'home.summary.pending',
  in_progress: 'home.summary.inProgress',
  completed: 'home.summary.completed',
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<TaskFormValue>(defaultForm);
  const [filter, setFilter] = useState<TaskFilterValue>(defaultFilter);

  const loadTasks = useCallback(() => {
    setTasks(getAllTasks());
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = filter.status === 'all' || task.status === filter.status;
      const priorityMatch = filter.priority === 'all' || task.priority === filter.priority;
      const dateMatch = matchesDueDateScope(task.dueDate, filter.dueDateScope);
      return statusMatch && priorityMatch && dateMatch;
    });
  }, [tasks, filter]);

  const statusCounts = useMemo(() => {
    return tasks.reduce(
      (counts, task) => {
        counts[task.status] += 1;
        return counts;
      },
      { pending: 0, in_progress: 0, completed: 0 } as Record<TaskStatus, number>
    );
  }, [tasks]);

  const handleCreate = () => {
    if (!form.title.trim()) {
      Alert.alert(t('alert.requiredTitleTitle'), t('alert.requiredTitleMessageCreate'));
      return;
    }

    const startDate = normalizeDateInput(form.startDate);
    if (form.startDate.trim() && !startDate) {
      Alert.alert(t('alert.invalidDateTitle'), t('alert.invalidStartDateMessage'));
      return;
    }

    const startTime = normalizeTimeInput(form.startTime);
    if (form.startTime.trim() && !startTime) {
      Alert.alert(t('alert.invalidTimeTitle'), t('alert.invalidTimeMessage'));
      return;
    }

    const dueDate = normalizeDateInput(form.dueDate);
    if (form.dueDate.trim() && !dueDate) {
      Alert.alert(t('alert.invalidDateTitle'), t('alert.invalidDueDateMessage'));
      return;
    }

    createTask({
      title: form.title.trim(),
      description: form.description.trim(),
      startDate,
      startTime,
      dueDate,
      priority: form.priority,
      status: form.status,
    });

    setForm(defaultForm);
    loadTasks();
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    loadTasks();
  };

  const handleStatusChange = (id: string, nextStatus: TaskStatus) => {
    updateTask(id, { status: nextStatus });
    loadTasks();
  };

  const handleEdit = (id: string) => {
    router.push({ pathname: '/task/[id]', params: { id } });
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 44 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <Pressable
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
          accessibilityLabel={t('home.profile')}
        >
          <Ionicons name="person-outline" size={18} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.summaryRow}>
        {TASK_STATUSES.map((status) => (
          <View key={status} style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{t(SUMMARY_LABEL_KEYS[status])}</Text>
            <View style={styles.summaryValueBox}>
              <Text style={styles.summaryCount}>{statusCounts[status]}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeading}>{t('home.createTask')}</Text>
      <TaskForm value={form} onChange={setForm} onSubmit={handleCreate} submitLabel={t('home.addTask')} />

      <View style={styles.spacer} />

      <FilterBar filter={filter} onChange={setFilter} />

      <Text style={styles.listHeading}>
        {t('home.filteredTasks').toUpperCase()} ({filteredTasks.length})
      </Text>

      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </ScrollView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: { fontSize: 28, fontWeight: '700', color: colors.text },
    profileButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    summaryCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: 'center',
      gap: 8,
    },
    summaryLabel: { color: colors.mutedText, fontSize: 12, fontWeight: '600', textAlign: 'center' },
    summaryValueBox: {
      backgroundColor: colors.inputBackground,
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 16,
      minWidth: 44,
      alignItems: 'center',
    },
    summaryCount: { fontSize: 18, fontWeight: '700', color: colors.text },
    sectionHeading: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 12 },
    listHeading: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.mutedText,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginTop: 18,
      marginBottom: 10,
    },
    spacer: { height: 18 },
  });
}
