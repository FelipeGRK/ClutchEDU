// src/screens/FilterScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import { RootStackParamList } from '../navigation/Stacks';

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

export default function FilterScreen({ navigation }: Props) {
  const [radiusKm, setRadiusKm] = useState(10);
  const [course, setCourse] = useState('');
  const [scholarship, setScholarship] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Raio (km):</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={String(radiusKm)}
        onChangeText={t => setRadiusKm(+t)}
      />

      <Text style={styles.label}>Curso:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Computer Science"
        value={course}
        onChangeText={setCourse}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Só com scholarship?</Text>
        <Switch value={scholarship} onValueChange={setScholarship} />
      </View>

      <Button
        title="Começar Swipe"
        onPress={() =>
          navigation.replace('Swipe', { radiusKm, course, scholarship })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
});
