import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { RootStackParamList } from '../navigation/Stacks';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;
type Message = { id: number; from_user: boolean; text: string; created_at: string };

export default function ChatScreen({ route }: Props) {
  const { matchId } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const flatRef = useRef<FlatList>(null);

  useEffect(() => {
    fetch();
    const iv = setInterval(fetch, 5000);
    return () => clearInterval(iv);

    function fetch() {
      axios
        .get<Message[]>('https://www.esportsfinderusa.com/api/messages.php', {
          params: { match_id: matchId }
        })
        .then((res) => setMessages(res.data))
        .catch(() => {});
    }
  }, []);

  function send() {
    if (!text.trim()) return;
    axios
      .post(
        'https://www.esportsfinderusa.com/api/messages.php',
        { match_id: matchId, from_user: true, text },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        setText('');
        flatRef.current?.scrollToEnd({ animated: true });
      });
  }

  return (
    <View style={styles.container}>
      {/* Header com logo + nome */}
      <SafeAreaView style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>ClutchEDU</Text>
        </View>
      </SafeAreaView>

      {/* Lista de mensagens */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(m) => m.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.from_user ? styles.user : styles.college
              ]}
            >
              <Text style={styles.msg}>{item.text}</Text>
              <Text style={styles.time}>
                {new Date(item.created_at).toLocaleTimeString()}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.list}
        />

        {/* Campo de input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Digite aqui..."
            placeholderTextColor="#888"
          />
          <Button title="Enviar" onPress={send} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2f5' },

  header: {
    backgroundColor: '#1c1c1e',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 40
  },
  appName: {
    color: '#6A0DAD',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 4
  },

  list: { padding: 16 },
  bubble: {
    maxWidth: '80%',
    marginBottom: 12,
    padding: 10,
    borderRadius: 8
  },
  user: { backgroundColor: '#007aff', alignSelf: 'flex-end' },
  college: { backgroundColor: '#ddd', alignSelf: 'flex-start' },
  msg: { color: '#000' },
  time: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
    textAlign: 'right'
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8
  }
});
