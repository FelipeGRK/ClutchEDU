// src/screens/ProfileScreen.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>ClutchEDU</Text>
      </View>

      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://via.placeholder.com/120' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>@Gamer123</Text>
        <Text style={styles.rank}>Rank: Immortal</Text>
        <Text style={styles.games}>Games Played: 218</Text>
        <Text style={styles.role}>Main Game: Valorant</Text>
        <Text style={styles.bio}>🎮 Passionate about collegiate esports and competitive gaming.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    backgroundColor: '#1c1c1e',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  logo: { width: 120, height: 40 },
  appName: { color: '#6A0DAD', fontSize: 20, fontWeight: 'bold', marginLeft: 6 },

  profile: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  rank: { color: '#aaa', marginBottom: 4 },
  games: { color: '#aaa', marginBottom: 4 },
  role: { color: '#aaa', marginBottom: 10 },
  bio: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
