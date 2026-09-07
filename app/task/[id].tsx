import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TaskForm, { TaskFormValue } from '../../components/TaskForm';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { getTaskById, updateTask } from '../../db/tasks';
import { normalizeDateInput, normalizeTimeInput } from '../../lib/date';
import { ThemeColors } from '../../lib/theme';

const emptyForm: TaskFormValue = {
  title: '',
  description: '',
  startDate: '',
  startTime: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending',
};

export default function TaskDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [form, setForm] = useState<TaskFormValue>(emptyForm);

  useEffect(() => {
    if (!id) return;
    const task = getTaskById(id);
    if (!task) return;
    setForm({
      title: task.title,
      description: task.description ?? '',
      startDate: task.startDate ?? '',
      startTime: task.startTime ?? '',
      dueDate: task.dueDate ?? '',
      priority: task.priority,
      status: task.status,
    });
  }, [id]);

  const handleSave = () => {
    if (!id || !form.title.trim()) {
      Alert.alert(t('alert.requiredTitleTitle'), t('alert.requiredTitleMessageEdit'));
      return;
    }

    const startDate = normalizeDateInput(form.startDate);
    if (form.startDate.trim() && !startDate) {
      Alert.alert(t('alert.invalidDateTitle'), t('alert.invalidStartDateMessage'));
      return;
    }

    const startTime = normalizeTimeInput(form.startTime);
    if (form.startTime.trim() && !startTime) {
      Alert.alert(t('alert.invalidTimeTitle'), t('alert.invalidTimeMessage'));
      return;
    }

    const dueDate = normalizeDateInput(form.dueDate);
    if (form.dueDate.trim() && !dueDate) {
      Alert.alert(t('alert.invalidDateTitle'), t('alert.invalidDueDateMessage'));
      return;
    }

    updateTask(id, {
      title: form.title.trim(),
      description: form.description.trim(),
      startDate,
      startTime,
      dueDate,
      priority: form.priority,
      status: form.status,
    });

    router.back();
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 44 }]}>
      <Text style={styles.title}>{t('taskDetail.title')}</Text>
      <TaskForm value={form} onChange={setForm} onSubmit={handleSave} submitLabel={t('taskDetail.save')} />
    </ScrollView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: colors.background },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: colors.text },
  });
}
