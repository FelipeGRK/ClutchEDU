// src/screens/SwipeScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import collegesData from '../data/colleges.json';
import { RootStackParamList } from '../navigation/Stacks';
import { haversineDistance } from '../utils/distance';

type Props = NativeStackScreenProps<RootStackParamList, 'Swipe'>;

interface College {
  id: number;
  name: string;
  city: string;
  state: string;
  distance: number;
  scholarship: boolean;
  // você pode adicionar outros campos se quiser
}

export default function SwipeScreen({ route, navigation }: Props) {
  const { radiusKm, course, scholarship } = route.params;
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList<College>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização negada');
        setLoading(false);
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      // mapear e filtrar
      const mapped = (collegesData as any[]).map((c) => ({
        id: +c.id,
        name: c.colleges,
        city: c.city,
        state: c.state,
        scholarship: c.has_scholarship === '1',
        // distância em km
        distance: haversineDistance(
          latitude,
          longitude,
          parseFloat(c.lat),
          parseFloat(c.lng)
        ),
      }));

      const filtered = mapped
        .filter((c) => c.distance <= radiusKm)
        .filter((c) => (scholarship ? c.scholarship : true))
        // se quiser filtrar por curso, adicione aqui…
        .sort((a, b) => a.distance - b.distance);

      setColleges(filtered);
      setLoading(false);
    })();
  }, []);

  function goToNext() {
    const next = currentIndex + 1;
    if (next < colleges.length) {
      flatListRef.current?.scrollToIndex({ index: next });
    } else {
      navigation.replace('Matches');
    }
  }

  function handleLike() {
    // aqui você pode manter o post via axios para gravar o "like"
    goToNext();
  }

  function handleDislike() {
    goToNext();
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (colleges.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>Nenhuma faculdade encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={colleges}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>
              {item.city}, {item.state}
            </Text>
            <Text style={styles.distance}>
              {Math.round(item.distance)} km
            </Text>
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(
            e.nativeEvent.contentOffset.x /
              Dimensions.get('window').width
          );
          setCurrentIndex(idx);
        }}
      />

      <View style={styles.buttons}>
        <Button title="✕" onPress={handleDislike} />
        <Button title="♥" onPress={handleLike} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  card: {
    width: Dimensions.get('window').width,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginTop: 8 },
  distance: { fontSize: 14, marginTop: 6, color: '#666' },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    backgroundColor: '#fff',
  },
});
