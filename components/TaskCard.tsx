import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { formatDateLabel, formatTimeLabel } from '../lib/date';
import { TranslationKey } from '../lib/i18n';
import { ThemeColors } from '../lib/theme';
import { Task, TaskStatus } from '../types/task';

const STATUS_TRANSITIONS: Record<TaskStatus, { status: TaskStatus; labelKey: TranslationKey }[]> = {
  pending: [
    { status: 'in_progress', labelKey: 'transition.start' },
    { status: 'completed', labelKey: 'transition.complete' },
  ],
  in_progress: [
    { status: 'pending', labelKey: 'transition.pause' },
    { status: 'completed', labelKey: 'transition.complete' },
  ],
  completed: [
    { status: 'pending', labelKey: 'transition.reopenPending' },
    { status: 'in_progress', labelKey: 'transition.reopenInProgress' },
  ],
};

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      {task.description ? <Text style={styles.text}>{task.description}</Text> : null}
      <Text style={styles.text}>
        {t('card.start')}: {formatDateLabel(task.startDate, t('common.noDate'))} · {formatTimeLabel(task.startTime, t('common.noTime'))}
      </Text>
      <Text style={styles.text}>
        {t('card.due')}: {formatDateLabel(task.dueDate, t('common.noDate'))}
      </Text>
      <Text style={styles.text}>
        {t('card.priority')}: {t(`priority.${task.priority}` as TranslationKey)}
      </Text>
      <Text style={styles.text}>
        {t('card.status')}: {t(`status.${task.status}` as TranslationKey)}
      </Text>

      <View style={styles.actions}>
        {(STATUS_TRANSITIONS[task.status] ?? []).map((transition) => (
          <Pressable
            key={transition.status}
            style={styles.smallButton}
            onPress={() => onStatusChange(task.id, transition.status)}
          >
            <Text style={styles.smallButtonText}>{t(transition.labelKey)}</Text>
          </Pressable>
        ))}
        <Pressable style={styles.smallButton} onPress={() => onEdit(task.id)}>
          <Text style={styles.smallButtonText}>{t('card.edit')}</Text>
        </Pressable>
        <Pressable style={styles.dangerButton} onPress={() => onDelete(task.id)}>
          <Text style={styles.dangerButtonText}>{t('card.delete')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: { backgroundColor: colors.card, borderRadius: 10, padding: 12, gap: 6 },
    title: { fontSize: 18, fontWeight: '700', color: colors.text },
    text: { color: colors.text },
    actions: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 8 },
    smallButton: {
      backgroundColor: colors.chipBackground,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    smallButtonText: { color: colors.chipText },
    dangerButton: {
      backgroundColor: colors.dangerBackground,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    dangerButtonText: { color: colors.dangerText },
  });
}
