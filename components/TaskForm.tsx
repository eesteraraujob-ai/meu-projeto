import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { PRIORITY_LABELS, TASK_PRIORITIES } from '../constants/priorities';
import { STATUS_LABELS, TASK_STATUSES } from '../constants/statuses';
import { TaskPriority, TaskStatus } from '../types/task';

export interface TaskFormValue {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

interface TaskFormProps {
  value: TaskFormValue;
  onChange: (value: TaskFormValue) => void;
  onSubmit: () => void;
  submitLabel: string;
}

export default function TaskForm({ value, onChange, onSubmit, submitLabel }: TaskFormProps) {
  const setField = <K extends keyof TaskFormValue>(field: K, fieldValue: TaskFormValue[K]) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <View style={styles.box}>
      <TextInput
        value={value.title}
        onChangeText={(text) => setField('title', text)}
        placeholder="Título"
        style={styles.input}
      />
      <TextInput
        value={value.description}
        onChangeText={(text) => setField('description', text)}
        placeholder="Descrição"
        style={[styles.input, styles.textArea]}
        multiline
      />
      <TextInput
        value={value.startDate}
        onChangeText={(text) => setField('startDate', text)}
        placeholder="Data de início (DD/MM/AAAA ou AAAA-MM-DD)"
        style={styles.input}
      />
      <TextInput
        value={value.startTime}
        onChangeText={(text) => setField('startTime', text)}
        placeholder="Hora de início (HH:MM)"
        style={styles.input}
        keyboardType="numbers-and-punctuation"
      />
      <TextInput
        value={value.dueDate}
        onChangeText={(text) => setField('dueDate', text)}
        placeholder="Data de conclusão (DD/MM/AAAA ou AAAA-MM-DD)"
        style={styles.input}
      />

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.chipRow}>
        {TASK_PRIORITIES.map((priority) => (
          <Pressable
            key={priority}
            style={[styles.chip, value.priority === priority && styles.chipActive]}
            onPress={() => setField('priority', priority)}
          >
            <Text style={value.priority === priority ? styles.chipTextActive : styles.chipText}>
              {PRIORITY_LABELS[priority]}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Status</Text>
      <View style={styles.chipRow}>
        {TASK_STATUSES.map((status) => (
          <Pressable
            key={status}
            style={[styles.chip, value.status === status && styles.chipActive]}
            onPress={() => setField('status', status)}
          >
            <Text style={value.status === status ? styles.chipTextActive : styles.chipText}>
              {STATUS_LABELS[status]}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.primaryButton} onPress={onSubmit}>
        <Text style={styles.primaryButtonText}>{submitLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: '#fff', borderRadius: 12, padding: 12 },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  label: { fontWeight: '600', marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
  },
  chipActive: { backgroundColor: '#2563eb' },
  chipText: { color: '#0f172a' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
});
