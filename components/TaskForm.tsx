import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { TASK_PRIORITIES } from '../constants/priorities';
import { TASK_STATUSES } from '../constants/statuses';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeColors } from '../lib/theme';
import { TranslationKey } from '../lib/i18n';
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
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors);

  const setField = <K extends keyof TaskFormValue>(field: K, fieldValue: TaskFormValue[K]) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <View style={styles.box}>
      <TextInput
        value={value.title}
        onChangeText={(text) => setField('title', text)}
        placeholder={t('form.title')}
        placeholderTextColor={colors.mutedText}
        style={styles.input}
      />
      <TextInput
        value={value.description}
        onChangeText={(text) => setField('description', text)}
        placeholder={t('form.description')}
        placeholderTextColor={colors.mutedText}
        style={[styles.input, styles.textArea]}
        multiline
      />
      <TextInput
        value={value.startDate}
        onChangeText={(text) => setField('startDate', text)}
        placeholder={t('form.startDate')}
        placeholderTextColor={colors.mutedText}
        style={styles.input}
      />
      <TextInput
        value={value.startTime}
        onChangeText={(text) => setField('startTime', text)}
        placeholder={t('form.startTime')}
        placeholderTextColor={colors.mutedText}
        style={styles.input}
        keyboardType="numbers-and-punctuation"
      />
      <TextInput
        value={value.dueDate}
        onChangeText={(text) => setField('dueDate', text)}
        placeholder={t('form.dueDate')}
        placeholderTextColor={colors.mutedText}
        style={styles.input}
      />

      <Text style={styles.label}>{t('form.priority')}</Text>
      <View style={styles.chipRow}>
        {TASK_PRIORITIES.map((priority) => (
          <Pressable
            key={priority}
            style={[styles.chip, value.priority === priority && styles.chipActive]}
            onPress={() => setField('priority', priority)}
          >
            <Text style={value.priority === priority ? styles.chipTextActive : styles.chipText}>
              {t(`priority.${priority}` as TranslationKey)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>{t('form.status')}</Text>
      <View style={styles.chipRow}>
        {TASK_STATUSES.map((status) => (
          <Pressable
            key={status}
            style={[styles.chip, value.status === status && styles.chipActive]}
            onPress={() => setField('status', status)}
          >
            <Text style={value.status === status ? styles.chipTextActive : styles.chipText}>
              {t(`status.${status}` as TranslationKey)}
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

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    box: { backgroundColor: colors.card, borderRadius: 12, padding: 12 },
    input: {
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 12,
      color: colors.text,
    },
    textArea: { minHeight: 80, textAlignVertical: 'top' },
    label: { fontWeight: '600', marginBottom: 8, color: colors.text },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.chipBackground,
    },
    chipActive: { backgroundColor: colors.chipActiveBackground },
    chipText: { color: colors.chipText },
    chipTextActive: { color: colors.chipActiveText, fontWeight: '700' },
    primaryButton: {
      backgroundColor: colors.primaryButtonBackground,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
    },
    primaryButtonText: { color: colors.primaryButtonText, fontWeight: '700' },
  });
}
