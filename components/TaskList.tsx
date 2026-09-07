import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskCard from './TaskCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeColors } from '../lib/theme';
import { Task, TaskStatus } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onStatusChange, onEdit, onDelete }: TaskListProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors);

  if (tasks.length === 0) {
    return <Text style={styles.emptyText}>{t('list.empty')}</Text>;
  }

  return (
    <View style={styles.list}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    list: { gap: 12 },
    emptyText: { textAlign: 'center', color: colors.mutedText, paddingVertical: 16 },
  });
}
