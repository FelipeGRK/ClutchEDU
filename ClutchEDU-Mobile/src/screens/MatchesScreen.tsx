import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import collegesData from '../data/colleges.json';
import { RootStackParamList } from '../navigation/Stacks';

type Props = NativeStackScreenProps<RootStackParamList, 'Matches'>;

type Match = {
  match_id: number;
  college_id: number;
  name: string;
  city: string;
  state: string;
};

export default function MatchesScreen({ navigation }: Props) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localMatches = (collegesData as any[]).map((c) => ({
      match_id: Number(c.id),
      college_id: Number(c.id),
      name: c.colleges as string,
      city: c.city as string,
      state: c.state as string,
    }));

    setMatches(localMatches);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>Você ainda não deu match em nenhuma faculdade.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER COM LOGO */}
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

      <FlatList
        data={matches}
        keyExtractor={(item) => item.match_id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Chat', {
                matchId: item.match_id,
                collegeName: item.name,
              })
            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>
              {item.city}, {item.state}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    backgroundColor: '#1c1c1e',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
  appName: {
    color: '#6A0DAD',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 4,
  },

  list: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 18, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#555', marginTop: 4 },
});
