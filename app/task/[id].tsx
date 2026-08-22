import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getTaskById, updateTask } from '../../db/tasks';
import { TaskPriority, TaskStatus } from '../../types/task';

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState<TaskStatus>('pending');

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return;
      const task = await getTaskById(id);
      if (!task) return;
      setTitle(task.title);
      setDescription(task.description ?? '');
      setDueDate(task.dueDate ?? '');
      setPriority(task.priority);
      setStatus(task.status);
    };

    loadTask();
  }, [id]);

  const handleSave = async () => {
    if (!id || !title.trim()) {
      Alert.alert('Título obrigatório', 'O título da tarefa não pode ficar vazio.');
      return;
    }

    await updateTask(id, {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority,
      status,
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar tarefa</Text>

      <TextInput value={title} onChangeText={setTitle} placeholder="Título" style={styles.input} />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição"
        style={[styles.input, styles.textArea]}
        multiline
      />
      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Data de conclusão (YYYY-MM-DD)"
        style={styles.input}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Prioridade</Text>
        <TextInput value={priority} onChangeText={(value) => setPriority(value as TaskPriority)} style={styles.inputSmall} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <TextInput value={status} onChangeText={(value) => setStatus(value as TaskStatus)} style={styles.inputSmall} />
      </View>

      <Pressable style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Salvar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  textArea: { minHeight: 90, textAlignVertical: 'top' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { width: 100, fontWeight: '600' },
  inputSmall: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
});
