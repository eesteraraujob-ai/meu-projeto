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
      <Text style={styles.fieldLabel}>{t('form.title')}</Text>
      <TextInput
        value={value.title}
        onChangeText={(text) => setField('title', text)}
        placeholder={t('form.titlePlaceholder')}
        placeholderTextColor={colors.mutedText}
        style={styles.input}
      />

      <Text style={styles.fieldLabel}>{t('form.description')}</Text>
      <TextInput
        value={value.description}
        onChangeText={(text) => setField('description', text)}
        placeholder={t('form.descriptionPlaceholder')}
        placeholderTextColor={colors.mutedText}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <View style={styles.row}>
        <View style={styles.rowField}>
          <Text style={styles.fieldLabel}>{t('form.startDateLabel')}</Text>
          <TextInput
            value={value.startDate}
            onChangeText={(text) => setField('startDate', text)}
            placeholder={t('form.startDatePlaceholder')}
            placeholderTextColor={colors.mutedText}
            style={styles.input}
          />
        </View>
        <View style={styles.rowField}>
          <Text style={styles.fieldLabel}>{t('form.startTimeLabel')}</Text>
          <TextInput
            value={value.startTime}
            onChangeText={(text) => setField('startTime', text)}
            placeholder={t('form.startTimePlaceholder')}
            placeholderTextColor={colors.mutedText}
            style={styles.input}
            keyboardType="numbers-and-punctuation"
          />
        </View>
      </View>

      <Text style={styles.fieldLabel}>{t('form.dueDateLabel')}</Text>
      <TextInput
        value={value.dueDate}
        onChangeText={(text) => setField('dueDate', text)}
        placeholder={t('form.dueDatePlaceholder')}
        placeholderTextColor={colors.mutedText}
        style={styles.input}
      />

      <Text style={styles.fieldLabel}>{t('form.priority')}</Text>
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

      <Text style={styles.fieldLabel}>{t('form.status')}</Text>
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
    box: {
      backgroundColor: colors.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      padding: 16,
    },
    fieldLabel: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
    input: {
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 14,
      color: colors.text,
    },
    textArea: { minHeight: 80, textAlignVertical: 'top' },
    row: { flexDirection: 'row', gap: 12 },
    rowField: { flex: 1 },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.chipBackground,
    },
    chipActive: { backgroundColor: colors.chipActiveBackground },
    chipText: { color: colors.chipText, fontWeight: '600' },
    chipTextActive: { color: colors.chipActiveText, fontWeight: '700' },
    primaryButton: {
      backgroundColor: colors.primaryButtonBackground,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 4,
    },
    primaryButtonText: { color: colors.primaryButtonText, fontWeight: '700', fontSize: 16 },
  });
}
