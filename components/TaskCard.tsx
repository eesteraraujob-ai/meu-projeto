import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { formatDateLabel, formatTimeLabel } from '../lib/date';
import { TranslationKey } from '../lib/i18n';
import { ThemeColors } from '../lib/theme';
import { Task, TaskPriority, TaskStatus } from '../types/task';

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

function statusBadgeColors(colors: ThemeColors, status: TaskStatus) {
  if (status === 'in_progress') {
    return { background: colors.statusInProgressBackground, text: colors.statusInProgressText };
  }
  if (status === 'completed') {
    return { background: colors.statusCompletedBackground, text: colors.statusCompletedText };
  }
  return { background: colors.statusPendingBackground, text: colors.statusPendingText };
}

function priorityDotColor(colors: ThemeColors, priority: TaskPriority) {
  if (priority === 'high') return colors.priorityHigh;
  if (priority === 'medium') return colors.priorityMedium;
  return colors.priorityLow;
}

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
  const badge = statusBadgeColors(colors, task.status);
  const transitions = STATUS_TRANSITIONS[task.status] ?? [];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={[styles.badge, { backgroundColor: badge.background }]}>
          <Text style={[styles.badgeText, { color: badge.text }]}>
            {t(`status.${task.status}` as TranslationKey)}
          </Text>
        </View>
      </View>

      {task.description ? <Text style={styles.description}>{task.description}</Text> : null}

      <View style={styles.infoRows}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('card.start')}:</Text>
          <Text style={styles.infoValue}>
            {formatDateLabel(task.startDate, t('common.noDate'))} · {formatTimeLabel(task.startTime, t('common.noTime'))}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('card.due')}:</Text>
          <Text style={styles.infoValue}>{formatDateLabel(task.dueDate, t('common.noDate'))}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('card.priority')}:</Text>
          <View style={styles.priorityValue}>
            <View style={[styles.priorityDot, { backgroundColor: priorityDotColor(colors, task.priority) }]} />
            <Text style={styles.infoValue}>{t(`priority.${task.priority}` as TranslationKey)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actions}>
        {transitions.map((transition) => (
          <Pressable
            key={transition.status}
            style={styles.outlineButton}
            onPress={() => onStatusChange(task.id, transition.status)}
          >
            <Text style={styles.outlineButtonText}>{t(transition.labelKey)}</Text>
          </Pressable>
        ))}
        <View style={styles.actionsRow}>
          <Pressable style={[styles.outlineButton, styles.actionsRowButton]} onPress={() => onEdit(task.id)}>
            <Text style={styles.outlineButtonText}>{t('card.edit')}</Text>
          </Pressable>
          <Pressable style={[styles.dangerButton, styles.actionsRowButton]} onPress={() => onDelete(task.id)}>
            <Text style={styles.dangerButtonText}>{t('card.delete')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      padding: 16,
      gap: 10,
    },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
    title: { fontSize: 17, fontWeight: '700', color: colors.text, flexShrink: 1 },
    badge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
    badgeText: { fontSize: 12, fontWeight: '700' },
    description: { color: colors.mutedText },
    infoRows: { gap: 6 },
    infoRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
    infoLabel: { color: colors.mutedText, fontWeight: '600' },
    infoValue: { color: colors.text },
    priorityValue: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    priorityDot: { width: 8, height: 8, borderRadius: 4 },
    divider: { height: 1, backgroundColor: colors.divider },
    actions: { gap: 8 },
    actionsRow: { flexDirection: 'row', gap: 8 },
    actionsRowButton: { flex: 1 },
    outlineButton: {
      backgroundColor: colors.outlineButtonBackground,
      borderWidth: 1,
      borderColor: colors.outlineButtonBorder,
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: 'center',
    },
    outlineButtonText: { color: colors.outlineButtonText, fontWeight: '600' },
    dangerButton: {
      backgroundColor: colors.dangerBackground,
      borderWidth: 1,
      borderColor: colors.dangerBorder,
      borderRadius: 10,
      paddingVertical: 10,
      alignItems: 'center',
    },
    dangerButtonText: { color: colors.dangerText, fontWeight: '600' },
  });
}
