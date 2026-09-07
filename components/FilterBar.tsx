import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TASK_PRIORITIES } from '../constants/priorities';
import { TASK_STATUSES } from '../constants/statuses';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { DueDateScope } from '../lib/date';
import { TranslationKey } from '../lib/i18n';
import { ThemeColors } from '../lib/theme';
import { TaskPriority, TaskStatus } from '../types/task';

export interface TaskFilterValue {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  dueDateScope: DueDateScope;
}

const DATE_SCOPES: DueDateScope[] = ['all', 'today', 'this_week', 'overdue', 'none'];

interface FilterBarProps {
  filter: TaskFilterValue;
  onChange: (filter: TaskFilterValue) => void;
}

export default function FilterBar({ filter, onChange }: FilterBarProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors);

  return (
    <View style={styles.box}>
      <Text style={styles.sectionTitle}>{t('filter.title')}</Text>

      <Text style={styles.label}>{t('filter.status')}</Text>
      <View style={styles.row}>
        <FilterChip
          label={t('filter.all')}
          active={filter.status === 'all'}
          onPress={() => onChange({ ...filter, status: 'all' })}
          colors={colors}
        />
        {TASK_STATUSES.map((status) => (
          <FilterChip
            key={status}
            label={t(`status.${status}` as TranslationKey)}
            active={filter.status === status}
            onPress={() => onChange({ ...filter, status })}
            colors={colors}
          />
        ))}
      </View>

      <Text style={styles.label}>{t('filter.priority')}</Text>
      <View style={styles.row}>
        <FilterChip
          label={t('filter.all')}
          active={filter.priority === 'all'}
          onPress={() => onChange({ ...filter, priority: 'all' })}
          colors={colors}
        />
        {TASK_PRIORITIES.map((priority) => (
          <FilterChip
            key={priority}
            label={t(`priority.${priority}` as TranslationKey)}
            active={filter.priority === priority}
            onPress={() => onChange({ ...filter, priority })}
            colors={colors}
          />
        ))}
      </View>

      <Text style={styles.label}>{t('filter.date')}</Text>
      <View style={styles.row}>
        {DATE_SCOPES.map((scope) => (
          <FilterChip
            key={scope}
            label={t(`filter.dateScope.${scope}` as TranslationKey)}
            active={filter.dueDateScope === scope}
            onPress={() => onChange({ ...filter, dueDateScope: scope })}
            colors={colors}
          />
        ))}
      </View>
    </View>
  );
}

function FilterChip({
  label,
  active,
  onPress,
  colors,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  colors: ThemeColors;
}) {
  const styles = createStyles(colors);
  return (
    <Pressable style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={active ? styles.chipTextActive : styles.chipText}>{label}</Text>
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    box: {
      backgroundColor: colors.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      padding: 16,
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4, color: colors.text },
    label: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.mutedText,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 8,
      marginTop: 12,
    },
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.chipBackground,
    },
    chipActive: { backgroundColor: colors.chipActiveBackground },
    chipText: { color: colors.chipText, fontWeight: '600' },
    chipTextActive: { color: colors.chipActiveText, fontWeight: '700' },
  });
}
