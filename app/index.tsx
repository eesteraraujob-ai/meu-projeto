import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { createTask, deleteTask, getAllTasks, updateTask, Task, TaskPriority, TaskStatus } from '../db/tasks';

const defaultForm = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium' as TaskPriority,
  status: 'pending' as TaskStatus,
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [filter, setFilter] = useState<{ status: TaskStatus | 'all'; priority: TaskPriority | 'all' }>({
    status: 'all',
    priority: 'all',
  });

  const loadTasks = async () => {
    const list = await getAllTasks();
    setTasks(list);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = filter.status === 'all' || task.status === filter.status;
      const priorityMatch = filter.priority === 'all' || task.priority === filter.priority;
      return statusMatch && priorityMatch;
    });
  }, [tasks, filter]);

  const handleCreate = async () => {
    if (!form.title.trim()) {
      Alert.alert('Título obrigatório', 'Informe um título para salvar a tarefa.');
      return;
    }

    await createTask({
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate || null,
      priority: form.priority,
      status: form.status,
    });

    setForm(defaultForm);
    loadTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleStatusChange = async (id: string, nextStatus: TaskStatus) => {
    await updateTask(id, { status: nextStatus });
    loadTasks();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Minhas tarefas</Text>

      <View style={styles.formBox}>
        <TextInput
          value={form.title}
          onChangeText={(value) => setForm((prev) => ({ ...prev, title: value }))}
          placeholder="Título"
          style={styles.input}
        />
        <TextInput
          value={form.description}
          onChangeText={(value) => setForm((prev) => ({ ...prev, description: value }))}
          placeholder="Descrição"
          style={[styles.input, styles.textArea]}
          multiline
        />
        <TextInput
          value={form.dueDate}
          onChangeText={(value) => setForm((prev) => ({ ...prev, dueDate: value }))}
          placeholder="Data de conclusão (YYYY-MM-DD)"
          style={styles.input}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Prioridade</Text>
          <TextInput
            value={form.priority}
            onChangeText={(value) => setForm((prev) => ({ ...prev, priority: value as TaskPriority }))}
            style={styles.inputSmall}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <TextInput
            value={form.status}
            onChangeText={(value) => setForm((prev) => ({ ...prev, status: value as TaskStatus }))}
            style={styles.inputSmall}
          />
        </View>

        <Pressable style={styles.primaryButton} onPress={handleCreate}>
          <Text style={styles.primaryButtonText}>Adicionar tarefa</Text>
        </Pressable>
      </View>

      <View style={styles.filtersBox}>
        <Text style={styles.sectionTitle}>Filtros</Text>
        <View style={styles.filterRow}>
          <Pressable style={styles.filterButton} onPress={() => setFilter({ ...filter, status: 'all' })}>
            <Text>Todos</Text>
          </Pressable>
          <Pressable style={styles.filterButton} onPress={() => setFilter({ ...filter, status: 'pending' })}>
            <Text>Pendentes</Text>
          </Pressable>
          <Pressable style={styles.filterButton} onPress={() => setFilter({ ...filter, status: 'in_progress' })}>
            <Text>Em andamento</Text>
          </Pressable>
          <Pressable style={styles.filterButton} onPress={() => setFilter({ ...filter, status: 'completed' })}>
            <Text>Concluídas</Text>
          </Pressable>
        </View>

        <View style={styles.filterRow}>
          <Pressable style={styles.filterButton} onPress={() => setFilter({ ...filter, priority: 'all' })}>
            <Text>Todas</Text>
          </Pressable>
          <Pressable style={styles.filterButton} onPress={() => setFilter({ ...filter, priority: 'low' })}>
            <Text>Baixa</Text>
          </Pressable>
          <Pressable style={styles.filterButton} onPress={() => setFilter({ ...filter, priority: 'medium' })}>
            <Text>Média</Text>
          </Pressable>
          <Pressable style={styles.filterButton} onPress={() => setFilter({ ...filter, priority: 'high' })}>
            <Text>Alta</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
        ) : (
          filteredTasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              {task.description ? <Text>{task.description}</Text> : null}
              {task.dueDate ? <Text>Data: {task.dueDate}</Text> : null}
              <Text>Prioridade: {task.priority}</Text>
              <Text>Status: {task.status}</Text>

              <View style={styles.taskActions}>
                <Pressable
                  style={styles.smallButton}
                  onPress={() => router.push({ pathname: '/task/[id]', params: { id: task.id } })}
                >
                  <Text>Editar</Text>
                </Pressable>
                <Pressable
                  style={styles.smallButton}
                  onPress={() => handleStatusChange(task.id, 'completed')}
                >
                  <Text>Concluir</Text>
                </Pressable>
                <Pressable style={styles.dangerButton} onPress={() => handleDelete(task.id)}>
                  <Text>Excluir</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  formBox: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 18 },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { width: 100, fontWeight: '600' },
  inputSmall: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  filtersBox: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
    marginRight: 8,
    marginBottom: 8,
  },
  taskList: { gap: 12 },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  taskTitle: { fontSize: 18, fontWeight: '700' },
  taskActions: { flexDirection: 'row', marginTop: 8, gap: 8 },
  smallButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dangerButton: {
    backgroundColor: '#fecaca',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  emptyText: { textAlign: 'center', color: '#64748b', paddingVertical: 16 },
});
