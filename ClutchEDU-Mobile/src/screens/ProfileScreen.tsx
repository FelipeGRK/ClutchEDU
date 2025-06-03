import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

export default function UserProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Banner */}
        <Image
          source={{ uri: 'https://i.imgur.com/Vh6rX0w.jpeg' }} // Replace with actual banner or highlight video preview
          style={styles.banner}
        />

        {/* Profile Info */}
        <View style={styles.profileBox}>
          <Image
            source={{ uri: 'https://i.imgur.com/2nCt3Sbl.jpg' }} // Replace with user avatar
            style={styles.avatar}
          />
          <Text style={styles.username}>Felipe "GRK" Siqueira</Text>
          <Text style={styles.rank}>Immortal 2 - Valorant</Text>
        </View>

        {/* Esports Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Esports Overview</Text>
          <View style={styles.statsRow}>
            <StatBox label="Games" value="250+" />
            <StatBox label="Wins" value="170" />
            <StatBox label="K/D" value="1.42" />
          </View>
        </View>

        {/* Favorite Titles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main Games</Text>
          <View style={styles.gamesRow}>
            <GameBadge title="Valorant" />
            <GameBadge title="CS2" />
            <GameBadge title="Overwatch 2" />
          </View>
        </View>

        {/* Video Clip Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Clip</Text>
          <Image
            source={{ uri: 'https://i.imgur.com/JtT2f2P.png' }} // Replace with clip thumbnail
            style={styles.clipPreview}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Watch Highlight</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function GameBadge({ title }: { title: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { paddingBottom: 40 },
  banner: { width: '100%', height: 180 },
  profileBox: {
    alignItems: 'center',
    marginTop: -40,
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  username: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  rank: { color: '#aaa', fontSize: 14 },

  section: { paddingHorizontal: 16, paddingTop: 24 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 12 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { alignItems: 'center', flex: 1 },
  statValue: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 13, marginTop: 4 },

  gamesRow: { flexDirection: 'row', gap: 8 },
  badge: {
    backgroundColor: '#6A0DAD',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8
  },
  badgeText: { color: '#fff', fontWeight: 'bold' },

  clipPreview: { width: '100%', height: 160, borderRadius: 8, marginTop: 8 },
  button: {
    backgroundColor: '#6A0DAD',
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
