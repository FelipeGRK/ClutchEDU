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
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import collegesData from '../data/colleges.json';
import { RootStackParamList } from '../navigation/Stacks';
import DiscoverySettingsModal from '../screens/DiscoverySettings';
import { collegeLogos, defaultLogo, sanitize } from '../utils/collegeLogos';
import { haversineDistance } from '../utils/distance';
import { locationMatchesState, regionMapping } from '../utils/regions';

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
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  // filter state
  const [filterRadius, setFilterRadius] = useState(initialRadius);
  const [filterRegion, setFilterRegion] = useState<string | null>(null);
  const [filterState, setFilterState]   = useState<string | null>(null);
  const [showFilter, setShowFilter]     = useState(false);

  // swipe gesture
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 10,
      onPanResponderMove: Animated.event(
        [ null, { dx: position.x, dy: position.y } ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, g) => {
        const thr = width * 0.25;
        if (g.dx > thr) swipe('right');
        else if (g.dx < -thr) swipe('left');
        else Animated.spring(position, { toValue: { x:0,y:0 }, useNativeDriver: false }).start();
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
      const { coords } = await Location.getCurrentPositionAsync();
      setUserCoords(coords);
      loadCards(coords.latitude, coords.longitude, filterRadius, false, filterRegion, filterState);
      setLoading(false);
    })();
  }, []);

  function loadCards(
    lat: number,
    lng: number,
    radius: number,
    isExtended: boolean,
    region: string | null,
    state: string | null
  ) {
    const mapped = (collegesData as any[]).map(c => ({
      id: +c.id,
      name: c.colleges as string,
      city: c.city as string,
      state: c.state as string,
      distance: haversineDistance(lat, lng, parseFloat(c.lat), parseFloat(c.lng)),
    }));

    let filtered = mapped.filter(c => c.distance <= radius);

    // filter by region
    if (region) {
      const allowed = regionMapping[region];
      filtered = filtered.filter(c => allowed.some(st => locationMatchesState(c.state, st)));
    }

    // filter by state
    if (state) {
      filtered = filtered.filter(c => locationMatchesState(c.state, state));
    }

    filtered.sort((a,b) => a.distance - b.distance);
    setCards(filtered);
    setIndex(0);
    setExtended(isExtended);
  }

  function swipe(dir: 'left'|'right') {
    const toX = dir==='right'? width:-width;
    Animated.timing(position, {
      toValue: { x: toX, y:0 },
      duration: 200,
      useNativeDriver: false
    }).start(() => {
      position.setValue({x:0,y:0});
      const nxt = index+1;
      if (nxt >= cards.length) {
        if (!extended && userCoords) {
          loadCards(userCoords.latitude, userCoords.longitude, 99999, true, filterRegion, filterState);
        } else {
          navigation.replace('Matches');
          return;
        }
      }
      setIndex(nxt);
    });
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  const card = cards[index];
  if (!card) {
    return (
      <View style={styles.loader}>
        <Text style={styles.emptyText}>Nenhuma faculdade restante.</Text>
      </View>
    );
  }

  const key = sanitize(card.name);
  const logoSource = collegeLogos[key] ?? defaultLogo;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView style={styles.header}>
        <View style={styles.logoContainer}>
          <ImageBackground
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>ClutchEDU</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={()=>setShowFilter(true)}>
            <Ionicons name="filter-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:16}}>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={28} color="#fff"/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* CARD */}
      <View style={styles.cardContainer}>
        <Animated.View {...panResponder.panHandlers} style={[position.getLayout(), styles.card]}>
          <ImageBackground source={logoSource} style={styles.card}>
            <View style={styles.bottomOverlay}/>
            <View style={styles.badge}><Text style={styles.badgeText}>Nearby</Text></View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardTitle}>{card.name}</Text>
              <Text style={styles.cardSubtitle}>{card.city}, {card.state}</Text>
              <Text style={styles.cardDistance}>{Math.round(card.distance)} km away</Text>
            </View>
          </ImageBackground>
        </Animated.View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.buttons}>
        <TouchableOpacity onPress={()=>swipe('left')}>
          <Ionicons name="close-circle" size={48} color="#F06A6A"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>swipe('right')}>
          <Ionicons name="heart-circle" size={48} color="#6A0DAD"/>
        </TouchableOpacity>
      </View>

      {/* FILTER MODAL */}
      <DiscoverySettingsModal
        visible={showFilter}
        initialRegion={filterRegion}
        initialState={filterState}
        onApply={(region, state) => {
          setFilterRegion(region);
          setFilterState(state);
          if (userCoords) {
            loadCards(
              userCoords.latitude,
              userCoords.longitude,
              filterRadius,
              false,
              region,
              state
            );
          }
          setShowFilter(false);
        }}
        onClose={()=>setShowFilter(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex:1, backgroundColor:'#000' },
  loader:       { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000' },
  emptyText:    { color:'#fff', fontSize:16 },

  header:       {
    backgroundColor:'#1c1c1e',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:12
  },
  logoContainer:{ flexDirection:'row', alignItems:'center' },
  logo:         { width:120, height:40 },
  appName:      { color:'#6A0DAD', fontSize:20, fontWeight:'bold', marginLeft: 4 },

  headerIcons:  { flexDirection:'row', paddingRight:12 },

  cardContainer:{ flex:1, alignItems:'center', justifyContent:'center' },
  card:         {
    width:width*0.9,
    height:height*0.7,
    borderRadius:16,
    overflow:'hidden',
    backgroundColor:'#1c1c1e'
  },
  bottomOverlay:{
    position:'absolute', left:0, right:0, bottom:0,
    height:120, backgroundColor:'rgba(0,0,0,0.6)'
  },
  badge:{ position:'absolute', top:16,left:16,
    backgroundColor:'rgba(0,0,0,0.5)',
    paddingHorizontal:8,paddingVertical:4,
    borderRadius:4,zIndex:2
  },
  badgeText:{ color:'#fff', fontSize:12 },

  cardFooter:{
    position:'absolute', bottom:24,left:16,right:16,zIndex:2
  },
  cardTitle:   { fontSize:28, color:'#fff', fontWeight:'bold' },
  cardSubtitle:{ fontSize:18, color:'#fff', marginTop:4 },
  cardDistance:{ fontSize:14, color:'#fff', marginTop:2 },

  buttons:{ flexDirection:'row', justifyContent:'space-evenly', marginBottom:32 }
});
