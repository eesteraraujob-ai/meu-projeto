import { Ionicons } from '@expo/vector-icons';
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
      <Pressable style={styles.backButton} onPress={() => router.back()} accessibilityLabel={t('common.back')}>
        <Ionicons name="chevron-back" size={20} color={colors.text} />
      </Pressable>

      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={colors.mutedText} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatCard label={t('profile.total')} value={counts.total} colors={colors} />
        <StatCard label={t('profile.completed')} value={counts.completed} colors={colors} />
        <StatCard label={t('profile.pending')} value={counts.pending} colors={colors} />
      </View>

      <View style={styles.listCard}>
        <View style={styles.listRow}>
          <View style={styles.listRowHeader}>
            <Ionicons name="color-palette-outline" size={18} color={colors.text} />
            <Text style={styles.listRowLabel}>{t('profile.themeSection')}</Text>
          </View>
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
        </View>

        <View style={styles.divider} />

        <View style={styles.listRow}>
          <View style={styles.listRowHeader}>
            <Ionicons name="globe-outline" size={18} color={colors.text} />
            <Text style={styles.listRowLabel}>{t('profile.languageSection')}</Text>
          </View>
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
        </View>

        <View style={styles.divider} />

        <View style={styles.listRow}>
          <View style={styles.listRowHeader}>
            <Ionicons name="information-circle-outline" size={18} color={colors.text} />
            <Text style={styles.listRowLabel}>{t('profile.aboutSection')}</Text>
          </View>
          <Text style={styles.aboutName}>{Constants.expoConfig?.name ?? 'Task Manager'}</Text>
          <Text style={styles.aboutVersion}>
            {t('profile.version')} {Constants.expoConfig?.version ?? '1.0.0'}
          </Text>
          <Text style={styles.aboutDescription}>{t('profile.aboutDescription')}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({ label, value, colors }: { label: string; value: number; colors: ThemeColors }) {
  const styles = createStyles(colors);
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statValueBox}>
        <Text style={styles.statValue}>{value}</Text>
      </View>
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
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    avatarWrapper: { alignItems: 'center', marginBottom: 32 },
    avatar: {
      width: 84,
      height: 84,
      borderRadius: 42,
      backgroundColor: colors.chipBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: 'center',
      gap: 8,
    },
    statLabel: { color: colors.mutedText, fontSize: 12, fontWeight: '600', textAlign: 'center' },
    statValueBox: {
      backgroundColor: colors.inputBackground,
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 16,
      minWidth: 44,
      alignItems: 'center',
    },
    statValue: { fontSize: 18, fontWeight: '700', color: colors.text },
    listCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      padding: 16,
    },
    listRow: { paddingVertical: 12, gap: 10 },
    listRowHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    listRowLabel: { fontSize: 15, fontWeight: '700', color: colors.text },
    divider: { height: 1, backgroundColor: colors.divider },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.chipBackground,
    },
    chipActive: { backgroundColor: colors.chipActiveBackground },
    chipText: { color: colors.chipText, fontWeight: '600' },
    chipTextActive: { color: colors.chipActiveText, fontWeight: '700' },
    aboutName: { fontSize: 15, fontWeight: '700', color: colors.text },
    aboutVersion: { color: colors.mutedText },
    aboutDescription: { color: colors.text },
  });
}
