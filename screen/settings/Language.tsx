import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import presentAlert from '../../components/Alert';
import ListItem from '../../components/ListItem';
import { useTheme } from '../../components/themes';
import loc from '../../loc';
import { AvailableLanguages, TLanguage } from '../../loc/languages';
import { useSettings } from '../../components/Context/SettingsContext';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: { minHeight: 60 },
});

const Language = () => {
  const { setLanguageStorage, language } = useSettings();
  const { setOptions } = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const stylesHook = StyleSheet.create({
    flex: {
      backgroundColor: colors.background,
    },
    content: {
      paddingBottom: insets.bottom,
    },
  });

  useEffect(() => {
    setOptions({ title: loc.settings.language });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const onLanguageSelect = (item: TLanguage) => {
    const currentLanguage = AvailableLanguages.find(l => l.value === language);
    setLanguageStorage(item.value).then(() => {
      if (currentLanguage?.isRTL !== item.isRTL) {
        presentAlert({ message: loc.settings.language_isRTL });
      }
    });
  };

  const renderItem = ({ item }: { item: TLanguage }) => {
    return (
      <ListItem
        disabled={language === item.value}
        title={item.label}
        checkmark={language === item.value}
        onPress={() => onLanguageSelect(item)}
        containerStyle={styles.row}
      />
    );
  };

  return (
    <FlatList
      style={[styles.flex, stylesHook.flex]}
      contentContainerStyle={stylesHook.content}
      keyExtractor={(_item, index) => `${index}`}
      data={AvailableLanguages}
      renderItem={renderItem}
      initialNumToRender={25}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustContentInsets
    />
  );
};

export default Language;
