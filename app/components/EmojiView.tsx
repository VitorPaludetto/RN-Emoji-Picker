import { emoji } from '@/utils/parseEmojis';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export const EmojiView = ({
  name,
  unicode,
  category,
  group,
  htmlCode,
}: emoji) => {
  return (
    <View style={styles.container}>
      <Link
        style={styles.text}
        href={{
          pathname: '/modal',
          params: { name, unicode, category, group, htmlCode },
        }}
      >
        {unicode}
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 36,
  },
});
