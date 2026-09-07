import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getAllTasks } from '../db/tasks';
import { Language } from '../lib/i18n';
import { ThemeColors, ThemeName } from '../lib/theme';
import { Task } from '../types/task';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, colors, setTheme } = useTheme();
  const { language, t, setLanguage } = useLanguage();
  const styles = createStyles(colors);
  const [tasks, setTasks] = useState<Task[]>([]);

  useFocusEffect(
    useCallback(() => {
      setTasks(getAllTasks());
    }, [])
  );

  const counts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 44 }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>‹ {t('common.back')}</Text>
        </Pressable>
        <Text style={styles.title}>{t('profile.title')}</Text>
      </View>

      <Section title={t('profile.tasksSection')} colors={colors}>
        <View style={styles.statsRow}>
          <Stat label={t('profile.total')} value={counts.total} colors={colors} />
          <Stat label={t('profile.completed')} value={counts.completed} colors={colors} />
          <Stat label={t('profile.pending')} value={counts.pending} colors={colors} />
        </View>
      </Section>

      <Section title={t('profile.themeSection')} colors={colors}>
        <View style={styles.chipRow}>
          <ChoiceChip
            label={t('profile.light')}
            active={theme === 'light'}
            onPress={() => setTheme('light' as ThemeName)}
            colors={colors}
          />
          <ChoiceChip
            label={t('profile.dark')}
            active={theme === 'dark'}
            onPress={() => setTheme('dark' as ThemeName)}
            colors={colors}
          />
        </View>
      </Section>

      <Section title={t('profile.languageSection')} colors={colors}>
        <View style={styles.chipRow}>
          <ChoiceChip
            label={t('profile.portuguese')}
            active={language === 'pt'}
            onPress={() => setLanguage('pt' as Language)}
            colors={colors}
          />
          <ChoiceChip
            label={t('profile.english')}
            active={language === 'en'}
            onPress={() => setLanguage('en' as Language)}
            colors={colors}
          />
        </View>
      </Section>

      <Section title={t('profile.aboutSection')} colors={colors}>
        <Text style={styles.aboutName}>{Constants.expoConfig?.name ?? 'Task Manager'}</Text>
        <Text style={styles.aboutVersion}>
          {t('profile.version')} {Constants.expoConfig?.version ?? '1.0.0'}
        </Text>
        <Text style={styles.aboutDescription}>{t('profile.aboutDescription')}</Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, colors, children }: { title: string; colors: ThemeColors; children: React.ReactNode }) {
  const styles = createStyles(colors);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Stat({ label, value, colors }: { label: string; value: number; colors: ThemeColors }) {
  const styles = createStyles(colors);
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ChoiceChip({
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
    container: { flex: 1, padding: 16, backgroundColor: colors.background },
    header: { marginBottom: 16 },
    backLink: { color: colors.primaryButtonBackground, fontWeight: '600', fontSize: 16, marginBottom: 8 },
    title: { fontSize: 28, fontWeight: '700', color: colors.text },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: colors.text },
    statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
    statItem: { alignItems: 'center' },
    statValue: { fontSize: 20, fontWeight: '700', color: colors.text },
    statLabel: { color: colors.mutedText },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.chipBackground,
    },
    chipActive: { backgroundColor: colors.chipActiveBackground },
    chipText: { color: colors.chipText },
    chipTextActive: { color: colors.chipActiveText, fontWeight: '700' },
    aboutName: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 4 },
    aboutVersion: { color: colors.mutedText, marginBottom: 8 },
    aboutDescription: { color: colors.text },
  });
}
