import { fetchEmojis } from '@/utils/fetchEmojis';
import { emoji, parseEmojis } from '@/utils/parseEmojis';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { EmojiView } from './components/EmojiView';

export default function Home() {
  const flatListRef = useRef<FlatList<emoji>>(null);

  const { isFetching, error, data } = useQuery({
    queryKey: ['emojiFetch'],
    queryFn: fetchEmojis,
  });

  if (isFetching) return <Text>Waiting for emoji...</Text>;

  if (error) return <Text>There's something wrong {error.message}</Text>;

  const parsedEmojis = parseEmojis(data);

  const scrollToTop = () => {
    flatListRef.current?.scrollToIndex({ index: 0 });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={scrollToTop} title="Scroll to top" />
      <FlatList
        ref={flatListRef}
        data={parsedEmojis}
        renderItem={({ item }: ListRenderItemInfo<emoji>) => {
          return (
            <EmojiView
              name={item.name}
              unicode={item.unicode}
              category={item.category}
              group={item.group}
              htmlCode={item.htmlCode}
            />
          );
        }}
        keyExtractor={(item) => item.name}
        numColumns={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
