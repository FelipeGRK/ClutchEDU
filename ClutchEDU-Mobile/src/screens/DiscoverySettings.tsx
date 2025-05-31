// src/screens/DiscoverySettings.tsx
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { regionMapping } from '../utils/regions';

type Props = {
  visible: boolean;
  initialRegion: string | null;
  initialState: string | null;
  onApply: (region: string | null, state: string | null) => void;
  onClose: () => void;
};

export default function DiscoverySettings({
  visible,
  initialRegion,
  initialState,
  onApply,
  onClose
}: Props) {
  const [region, setRegion] = useState<string | null>(initialRegion);
  const [state, setState]   = useState<string | null>(initialState);

  useEffect(() => {
    // Whenever the modal opens, reset the selected pills
    if (visible) {
      setRegion(initialRegion);
      setState(initialState);
    }
  }, [visible, initialRegion, initialState]);

  const regions = Object.keys(regionMapping);

  // Show only 2‐letter codes for states in that region
  const statesAbbr = region
    ? regionMapping[region].filter((s) => s.length === 2)
    : [];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          {/* header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Discovery Settings</Text>
            <TouchableOpacity onPress={() => onApply(region, state)}>
              <Text style={styles.apply}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* body */}
          <ScrollView contentContainerStyle={styles.body}>
            {/* Region picker */}
            <Text style={styles.label}>Search by Region</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {regions.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.pill, region === r && styles.pillSelected]}
                  onPress={() => {
                    setRegion(r);
                    setState(null);
                  }}
                >
                  <Text
                    style={[
                      styles.pillText,
                      region === r && styles.pillTextSelected
                    ]}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* State picker (abbreviations only) */}
            {region && (
              <>
                <Text style={[styles.label, { marginTop: 20 }]}>
                  Search by State
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {statesAbbr.map((abbr) => (
                    <TouchableOpacity
                      key={abbr}
                      style={[styles.pill, state === abbr && styles.pillSelected]}
                      onPress={() => setState(abbr)}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          state === abbr && styles.pillTextSelected
                        ]}
                      >
                        {abbr}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  close: { color: '#888', fontSize: 16 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  apply: { color: '#0af', fontSize: 16 },

  body: { padding: 16 },
  label: { color: '#ccc', fontSize: 14, marginBottom: 8 },

  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#333',
    borderRadius: 20,
    marginRight: 8,
  },
  pillSelected: {
    backgroundColor: '#6A0DAD',
  },
  pillText: {
    color: '#fff',
    fontSize: 14,
  },
  pillTextSelected: {
    fontWeight: 'bold',
  },
});
