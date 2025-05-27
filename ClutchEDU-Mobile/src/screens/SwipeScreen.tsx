import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import collegesData from '../data/colleges.json';
import { RootStackParamList } from '../navigation/Stacks';
import { haversineDistance } from '../utils/distance';

type Props = NativeStackScreenProps<RootStackParamList, 'Swipe'>;
const { width, height } = Dimensions.get('window');

interface CollegeCard {
  id: number;
  name: string;
  city: string;
  state: string;
  distance: number;
  imageUri?: string;
}

export default function SwipeScreen({ route, navigation }: Props) {
  const { radiusKm: initialRadius } = route.params;
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CollegeCard[]>([]);
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });
  const [extended, setExtended] = useState(false);
  const swiperRef = useRef<Swiper<CollegeCard>>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return Alert.alert('Permissão de localização negada');
      }
      const pos = await Location.getCurrentPositionAsync({});
      setUserCoords(pos.coords);
      filterCards(pos.coords, initialRadius);
      setLoading(false);
    })();
  }, []);

  function filterCards(coords: { latitude: number; longitude: number }, radius: number) {
    const mapped = (collegesData as any[]).map(c => ({
      id: +c.id,
      name: c.colleges,
      city: c.city,
      state: c.state,
      distance: haversineDistance(
        coords.latitude,
        coords.longitude,
        parseFloat(c.lat),
        parseFloat(c.lng)
      ),
      imageUri: c.image || undefined,
    }));
    const filtered = mapped
      .filter(c => c.distance <= radius)
      .sort((a, b) => a.distance - b.distance);
    setCards(filtered);
  }

  function onSwiped(index: number) {
    // ao swipar a última carta:
    if (index === cards.length - 1) {
      if (!extended) {
        // primeiro exaure o raio inicial, depois estende para TODAS
        setExtended(true);
        filterCards(userCoords, 99999);
        swiperRef.current?.swipeBack(); // reseta para a carta 0
      } else {
        navigation.replace('Matches');
      }
    }
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* ─── CABEÇALHO CUSTOM ─────────────────────────────────── */}
      <View style={styles.header}>
        <ImageBackground
          source={require('../../assets/tinder-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.replace('DiscoverySettings')}>
            <Ionicons name="filter-outline" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── SWIPER ───────────────────────────────────────────── */}
      <Swiper
        ref={swiperRef}
        cards={cards}
        verticalSwipe={false}
        stackSize={3}
        backgroundColor="#f5f5f5"
        onSwiped={onSwiped}
        onSwipedLeft={() => {}}
        onSwipedRight={() => {}}
        animateCardOpacity
        containerStyle={{ flex: 1 }}
        cardStyle={styles.card}
        renderCard={(card) =>
          card ? (
            <ImageBackground
              source={card.imageUri ? { uri: card.imageUri } : require('../../assets/college-placeholder.jpg')}
              style={styles.card}
            >
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Nearby</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardTitle}>{card.name}</Text>
                <Text style={styles.cardSubtitle}>{card.city}, {card.state}</Text>
                <Text style={styles.cardDistance}>{Math.round(card.distance)} km away</Text>
              </View>
            </ImageBackground>
          ) : null
        }
      />

      {/* ─── BOTÕES DE AÇÃO ───────────────────────────────────── */}
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => swiperRef.current?.swipeBack()}>
          <Ionicons name="arrow-undo-circle-outline" size={36} color="#F5A623" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swiperRef.current?.swipeLeft()}>
          <Ionicons name="close-circle" size={48} color="#F06A6A" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swiperRef.current?.swipeRight()}>
          <Ionicons name="heart-circle" size={48} color="#6A0DAD" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  logo: { width: 100, height: 40 },
  headerIcons: { flexDirection: 'row' },

  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: { color: '#fff', fontSize: 12 },

  cardFooter: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
  },
  cardTitle: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  cardSubtitle: { fontSize: 18, color: '#fff', marginTop: 4 },
  cardDistance: { fontSize: 14, color: '#fff', marginTop: 2 },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 32,
  },
});
