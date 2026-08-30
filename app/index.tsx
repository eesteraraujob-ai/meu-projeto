import React, { useCallback, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import TaskForm, { TaskFormValue } from '../components/TaskForm';
import FilterBar, { TaskFilterValue } from '../components/FilterBar';
import TaskList from '../components/TaskList';
import { createTask, deleteTask, getAllTasks, updateTask } from '../db/tasks';
import { matchesDueDateScope, normalizeDateInput } from '../lib/date';
import { STATUS_LABELS, TASK_STATUSES } from '../constants/statuses';
import { Task, TaskStatus } from '../types/task';

const defaultForm: TaskFormValue = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending',
};

const defaultFilter: TaskFilterValue = {
  status: 'all',
  priority: 'all',
  dueDateScope: 'all',
};

export default function HomeScreen() {
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
      Alert.alert('Título obrigatório', 'Informe um título para salvar a tarefa.');
      return;
    }

    const dueDate = normalizeDateInput(form.dueDate);
    if (form.dueDate.trim() && !dueDate) {
      Alert.alert('Data inválida', 'Informe a data no formato AAAA-MM-DD.');
      return;
    }

    createTask({
      title: form.title.trim(),
      description: form.description.trim(),
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Minhas tarefas</Text>

      <View style={styles.summaryBox}>
        {TASK_STATUSES.map((status) => (
          <View key={status} style={styles.summaryItem}>
            <Text style={styles.summaryCount}>{statusCounts[status]}</Text>
            <Text style={styles.summaryLabel}>{STATUS_LABELS[status]}</Text>
          </View>
        ))}
      </View>

      <TaskForm value={form} onChange={setForm} onSubmit={handleCreate} submitLabel="Adicionar tarefa" />

      <View style={styles.spacer} />

      <FilterBar filter={filter} onChange={setFilter} />

      <View style={styles.spacer} />

      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  summaryBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    justifyContent: 'space-around',
  },
  summaryItem: { alignItems: 'center' },
  summaryCount: { fontSize: 20, fontWeight: '700' },
  summaryLabel: { color: '#64748b' },
  spacer: { height: 18 },
});
