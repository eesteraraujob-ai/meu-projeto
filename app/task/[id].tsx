import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TaskForm, { TaskFormValue } from '../../components/TaskForm';
import { getTaskById, updateTask } from '../../db/tasks';
import { normalizeDateInput, normalizeTimeInput } from '../../lib/date';

const emptyForm: TaskFormValue = {
  title: '',
  description: '',
  startDate: '',
  startTime: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending',
};

export default function TaskDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [form, setForm] = useState<TaskFormValue>(emptyForm);

  useEffect(() => {
    if (!id) return;
    const task = getTaskById(id);
    if (!task) return;
    setForm({
      title: task.title,
      description: task.description ?? '',
      startDate: task.startDate ?? '',
      startTime: task.startTime ?? '',
      dueDate: task.dueDate ?? '',
      priority: task.priority,
      status: task.status,
    });
  }, [id]);

  const handleSave = () => {
    if (!id || !form.title.trim()) {
      Alert.alert('Título obrigatório', 'O título da tarefa não pode ficar vazio.');
      return;
    }

    const startDate = normalizeDateInput(form.startDate);
    if (form.startDate.trim() && !startDate) {
      Alert.alert('Data inválida', 'Informe a data de início no formato DD/MM/AAAA ou AAAA-MM-DD.');
      return;
    }

    const startTime = normalizeTimeInput(form.startTime);
    if (form.startTime.trim() && !startTime) {
      Alert.alert('Hora inválida', 'Informe a hora de início no formato HH:MM.');
      return;
    }

    const dueDate = normalizeDateInput(form.dueDate);
    if (form.dueDate.trim() && !dueDate) {
      Alert.alert('Data inválida', 'Informe a data de conclusão no formato DD/MM/AAAA ou AAAA-MM-DD.');
      return;
    }

    updateTask(id, {
      title: form.title.trim(),
      description: form.description.trim(),
      startDate,
      startTime,
      dueDate,
      priority: form.priority,
      status: form.status,
    });

    router.back();
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 44 }]}>
      <Text style={styles.title}>Editar tarefa</Text>
      <TaskForm value={form} onChange={setForm} onSubmit={handleSave} submitLabel="Salvar" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
});
