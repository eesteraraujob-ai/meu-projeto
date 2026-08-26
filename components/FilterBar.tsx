import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PRIORITY_LABELS, TASK_PRIORITIES } from '../constants/priorities';
import { STATUS_LABELS, TASK_STATUSES } from '../constants/statuses';
import { DueDateScope } from '../lib/date';
import { TaskPriority, TaskStatus } from '../types/task';

export interface TaskFilterValue {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  dueDateScope: DueDateScope;
}

const DATE_SCOPE_LABELS: Record<DueDateScope, string> = {
  all: 'Todas',
  today: 'Hoje',
  this_week: 'Esta semana',
  overdue: 'Atrasadas',
  none: 'Sem data',
};

const DATE_SCOPES = Object.keys(DATE_SCOPE_LABELS) as DueDateScope[];

interface FilterBarProps {
  filter: TaskFilterValue;
  onChange: (filter: TaskFilterValue) => void;
}

export default function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.sectionTitle}>Filtros</Text>

      <Text style={styles.label}>Status</Text>
      <View style={styles.row}>
        <FilterChip label="Todos" active={filter.status === 'all'} onPress={() => onChange({ ...filter, status: 'all' })} />
        {TASK_STATUSES.map((status) => (
          <FilterChip
            key={status}
            label={STATUS_LABELS[status]}
            active={filter.status === status}
            onPress={() => onChange({ ...filter, status })}
          />
        ))}
      </View>

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.row}>
        <FilterChip
          label="Todas"
          active={filter.priority === 'all'}
          onPress={() => onChange({ ...filter, priority: 'all' })}
        />
        {TASK_PRIORITIES.map((priority) => (
          <FilterChip
            key={priority}
            label={PRIORITY_LABELS[priority]}
            active={filter.priority === priority}
            onPress={() => onChange({ ...filter, priority })}
          />
        ))}
      </View>

      <Text style={styles.label}>Data</Text>
      <View style={styles.row}>
        {DATE_SCOPES.map((scope) => (
          <FilterChip
            key={scope}
            label={DATE_SCOPE_LABELS[scope]}
            active={filter.dueDateScope === scope}
            onPress={() => onChange({ ...filter, dueDateScope: scope })}
          />
        ))}
      </View>
    </View>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={active ? styles.chipTextActive : styles.chipText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: '#fff', borderRadius: 12, padding: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  label: { fontWeight: '600', marginBottom: 6, marginTop: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
  },
  chipActive: { backgroundColor: '#2563eb' },
  chipText: { color: '#0f172a' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
});
