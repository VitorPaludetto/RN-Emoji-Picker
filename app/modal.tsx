import * as Clipboard from 'expo-clipboard';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ModalScreen() {
  const isPresented = router.canGoBack();
  const defaultEmoji = String.fromCodePoint(0x1f600);

  const {
    name,
    unicode = defaultEmoji,
    category,
    group,
  } = useLocalSearchParams();

  const isSingleString = (unicode: string | string[]): unicode is string => {
    return typeof unicode === 'string';
  };

  // Function to handle the clipboard copy
  const handleCopyToClipboard = async (unicode: string | string[]) => {
    await Clipboard.setStringAsync(
      isSingleString(unicode) ? unicode : unicode[0]
    );
  };

  // Wrapper function to handle the onPress event
  const createOnPressHandler = (unicode: string | string[]) => {
    return () => {
      handleCopyToClipboard(unicode);
    };
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  // };

  return (
    <View style={styles.container}>
      <Link href="/" style={styles.close}>
        <Text>{String.fromCodePoint(0x26cc)}</Text>
      </Link>
      <TouchableOpacity onPress={createOnPressHandler(unicode)}>
        <Text style={[styles.title, { fontSize: 64 }]}>{unicode}</Text>
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{category}</Text>
      <Text style={styles.description}>{group}</Text>
      {!isPresented && <Link href="../">Dismiss</Link>}

      <Text style={styles.message}>
        Click on the emoji to copy it to the clipboard!
      </Text>

      {/* <Button onPress={fetchCopiedText} title="fetch" /> */}

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 32,
  },
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  message: {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    marginBottom: 10,
  },
});
