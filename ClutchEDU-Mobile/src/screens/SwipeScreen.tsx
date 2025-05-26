// src/screens/SwipeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import * as Location from 'expo-location';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Stacks';

type Props = NativeStackScreenProps<RootStackParamList,'Swipe'>;

export default function SwipeScreen({ route, navigation }: Props) {
  const { radiusKm, course, scholarship } = route.params;
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Solicita permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada');
        return;
      }

      // Pega coords
      const { coords } = await Location.getCurrentPositionAsync({});
      try {
        // Chama sua API (ajuste a URL)
        const res = await axios.get('https://www.esportsfinderusa.com/api/colleges.php', {
          params: {
            lat: coords.latitude,
            lng: coords.longitude,
            radiusKm,
            course,
            scholarship: scholarship ? 1 : 0,
          },
        });
        setColleges(res.data);
      } catch (err) {
        console.error(err);
        alert('Erro ao carregar faculdades');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex:1, backgroundColor:'#f5f5f5' }}>
      <Swiper
        cards={colleges}
        stackSize={3}
        animateCardOpacity
        cardVerticalMargin={50}
        renderCard={card => (
          <View style={{
            flex:1,
            borderRadius:8,
            backgroundColor:'#fff',
            padding:20,
            justifyContent:'center',
            alignItems:'center',
            shadowColor:'#000',
            shadowOpacity:0.1,
            shadowRadius:10,
          }}>
            <Text style={{ fontSize:22, fontWeight:'bold' }}>{card.name}</Text>
            <Text style={{ marginTop:10 }}>{card.city}, {card.state}</Text>
            <Text style={{ marginTop:5 }}>{Math.round(card.distance)} km away</Text>
          </View>
        )}
        onSwipedRight={i => {
          const college = colleges[i];
          // Registra o swipe no backend
          axios.post('https://www.esportsfinderusa.com/api/swipe.php', {
            user_id: /* seu user_id */,
            college_id: college.id,
            dir: 'right',
          });
        }}
        onSwipedAll={() => navigation.replace('Matches')}
      />
    </View>
  );
}
