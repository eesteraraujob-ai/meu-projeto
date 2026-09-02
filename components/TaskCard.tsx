import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PRIORITY_LABELS } from '../constants/priorities';
import { STATUS_LABELS } from '../constants/statuses';
import { formatDateLabel, formatTimeLabel } from '../lib/date';
import { Task, TaskStatus } from '../types/task';

const STATUS_TRANSITIONS: Record<TaskStatus, { status: TaskStatus; label: string }[]> = {
  pending: [
    { status: 'in_progress', label: 'Iniciar' },
    { status: 'completed', label: 'Concluir' },
  ],
  in_progress: [
    { status: 'pending', label: 'Pausar' },
    { status: 'completed', label: 'Concluir' },
  ],
  completed: [
    { status: 'pending', label: 'Reabrir como pendente' },
    { status: 'in_progress', label: 'Reabrir em andamento' },
  ],
};

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      {task.description ? <Text>{task.description}</Text> : null}
      <Text>Início: {formatDateLabel(task.startDate)} · {formatTimeLabel(task.startTime)}</Text>
      <Text>Conclusão: {formatDateLabel(task.dueDate)}</Text>
      <Text>Prioridade: {PRIORITY_LABELS[task.priority]}</Text>
      <Text>Status: {STATUS_LABELS[task.status]}</Text>

      <View style={styles.actions}>
        {(STATUS_TRANSITIONS[task.status] ?? []).map((transition) => (
          <Pressable
            key={transition.status}
            style={styles.smallButton}
            onPress={() => onStatusChange(task.id, transition.status)}
          >
            <Text>{transition.label}</Text>
          </Pressable>
        ))}
        <Pressable style={styles.smallButton} onPress={() => onEdit(task.id)}>
          <Text>Editar</Text>
        </Pressable>
        <Pressable style={styles.dangerButton} onPress={() => onDelete(task.id)}>
          <Text>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 12, gap: 6 },
  title: { fontSize: 18, fontWeight: '700' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 8 },
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
});
