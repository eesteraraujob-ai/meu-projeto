import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TaskForm, { TaskFormValue } from '../../components/TaskForm';
import { getTaskById, updateTask } from '../../db/tasks';
import { normalizeDateInput } from '../../lib/date';

const emptyForm: TaskFormValue = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending',
};

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [form, setForm] = useState<TaskFormValue>(emptyForm);

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return;
      const task = await getTaskById(id);
      if (!task) return;
      setForm({
        title: task.title,
        description: task.description ?? '',
        dueDate: task.dueDate ?? '',
        priority: task.priority,
        status: task.status,
      });
    };

    loadTask();
  }, [id]);

  const handleSave = async () => {
    if (!id || !form.title.trim()) {
      Alert.alert('Título obrigatório', 'O título da tarefa não pode ficar vazio.');
      return;
    }

    const dueDate = normalizeDateInput(form.dueDate);
    if (form.dueDate.trim() && !dueDate) {
      Alert.alert('Data inválida', 'Informe a data no formato AAAA-MM-DD.');
      return;
    }

    await updateTask(id, {
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate,
      priority: form.priority,
      status: form.status,
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar tarefa</Text>
      <TaskForm value={form} onChange={setForm} onSubmit={handleSave} submitLabel="Salvar" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
});
