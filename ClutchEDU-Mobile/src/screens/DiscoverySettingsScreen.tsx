// src/screens/DiscoverySettingsScreen.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RootStackParamList } from '../navigation/Stacks';

type Props = NativeStackScreenProps<RootStackParamList, 'DiscoverySettings'>;

export default function DiscoverySettingsScreen({ navigation, route }: Props) {
  const [locationDesc, setLocationDesc] = useState('Buscando localização...');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [radiusKm, setRadiusKm] = useState(10);
  const [extendAfter, setExtendAfter] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationDesc('Permissão negada');
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      setCoords(pos.coords);
      setLocationDesc(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
    })();
  }, []);

  function onDone() {
    navigation.replace('Swipe', {
      radiusKm,
      course: '',
      scholarship: false,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#000"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discovery Settings</Text>
        <TouchableOpacity onPress={onDone}>
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{locationDesc}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Maximum Distance</Text>
        <Text style={styles.value}>{radiusKm} km</Text>
      </View>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={500}
        step={1}
        value={radiusKm}
        onValueChange={setRadiusKm}
      />

      <View style={[styles.row, { marginTop: 20 }]}>
        <Text style={styles.label}>Extend after exhaustion</Text>
        <Switch
          value={extendAfter}
          onValueChange={setExtendAfter}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection:'row', justifyContent:'space-between',
    alignItems:'center', marginBottom: 24
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  done: { color: '#007AFF', fontSize: 16 },
  row: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600' },
  value: { fontSize: 14, color: '#666', marginTop: 4 },
});
