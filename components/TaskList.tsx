import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskCard from './TaskCard';
import { Task, TaskStatus } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onStatusChange, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>;
  }

  return (
    <View style={styles.list}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
  emptyText: { textAlign: 'center', color: '#64748b', paddingVertical: 16 },
});
