// src/screens/SwipeScreen.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import collegesData from '../data/colleges.json';
import { RootStackParamList } from '../navigation/Stacks';
import { haversineDistance } from '../utils/distance';

// ← import your generated logo map and sanitizer
import { collegeLogos, defaultLogo, sanitize } from '../utils/collegeLogos';

type Props = NativeStackScreenProps<RootStackParamList, 'Swipe'>;
const { width, height } = Dimensions.get('window');

interface CollegeCard {
  id: number;
  name: string;
  city: string;
  state: string;
  distance: number;
}

export default function SwipeScreen({ route, navigation }: Props) {
  const initialRadius = route.params.radiusKm;
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CollegeCard[]>([]);
  const [extended, setExtended] = useState(false);
  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 10,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, g) => {
        const threshold = width * 0.25;
        if (g.dx > threshold) swipe('right');
        else if (g.dx < -threshold) swipe('left');
        else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização negada');
        setLoading(false);
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      loadCards(coords.latitude, coords.longitude, initialRadius);
      setLoading(false);
    })();
  }, []);

  function loadCards(lat: number, lng: number, radius: number) {
    const mapped = (collegesData as any[]).map(c => ({
      id: +c.id,
      name: c.colleges as string,
      city: c.city as string,
      state: c.state as string,
      distance: haversineDistance(
        lat,
        lng,
        parseFloat(c.lat),
        parseFloat(c.lng)
      ),
    }));
    const filtered = mapped
      .filter(c => c.distance <= radius)
      .sort((a, b) => a.distance - b.distance);
    setCards(filtered);
    setIndex(0);
  }

  function swipe(dir: 'left' | 'right') {
    const toX = dir === 'right' ? width : -width;
    Animated.timing(position, {
      toValue: { x: toX, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      const next = index + 1;
      if (next >= cards.length) {
        if (!extended) {
          setExtended(true);
          Location.getCurrentPositionAsync({}).then(pos =>
            loadCards(pos.coords.latitude, pos.coords.longitude, 99999)
          );
        } else {
          navigation.replace('Matches');
          return;
        }
      }
      setIndex(next);
    });
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const card = cards[index];
  if (!card) {
    return (
      <View style={styles.loader}>
        <Text>Nenhuma faculdade restante.</Text>
      </View>
    );
  }

  // lookup logo from static map
  const key = sanitize(card.name);
  const logoSource = collegeLogos[key] ?? defaultLogo;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <ImageBackground
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('DiscoverySettings')}>
            <Ionicons name="filter-outline" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CARD */}
      <View style={styles.cardContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[position.getLayout(), styles.card]}
        >
          <ImageBackground source={logoSource} style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Nearby</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardTitle}>{card.name}</Text>
              <Text style={styles.cardSubtitle}>
                {card.city}, {card.state}
              </Text>
              <Text style={styles.cardDistance}>
                {Math.round(card.distance)} km away
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => swipe('left')}>
          <Ionicons name="close-circle" size={48} color="#F06A6A" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipe('right')}>
          <Ionicons name="heart-circle" size={48} color="#6A0DAD" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: '#121212' },
  loader:           { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header:           {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  logo:             { width: 100, height: 40 },
  headerIcons:      { flexDirection: 'row' },

  cardContainer:    {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:             {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#222',          // dark base
  },
  badge:            {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.2)', // light translucent
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText:        { color: '#fff', fontSize: 12 },

  cardFooter:       {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)', // dark overlay
  },
  cardTitle:        { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  cardSubtitle:     { fontSize: 18, color: '#ddd', marginTop: 4 },
  cardDistance:     { fontSize: 14, color: '#ccc', marginTop: 2 },

  buttons:          {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 32,
  },
});
