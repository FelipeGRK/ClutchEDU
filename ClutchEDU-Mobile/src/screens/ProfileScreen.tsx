// src/screens/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>ClutchEDU</Text>
        </View>
      </SafeAreaView>

      {/* PROFILE SECTION (NO BACKGROUND WRAPPER) */}
      <View style={styles.profileArea}>
        <View style={styles.card}>
          {/* AVATAR */}
          <Image
            source={require('../../assets/images/felipeprofile.png')}
            style={styles.avatar}
          />

          {/* USERNAME */}
          <Text style={styles.username}>@Gamer123</Text>

          {/* DETAILS */}
          <Text style={styles.detail}>🎖️ Rank: <Text style={styles.highlight}>Immortal</Text></Text>
          <Text style={styles.detail}>🎮 Games Played: <Text style={styles.highlight}>218</Text></Text>
          <Text style={styles.detail}>🕹️ Main Game: <Text style={styles.highlight}>Valorant</Text></Text>

          {/* BIO */}
          <Text style={styles.bio}>
            🎧 Passionate about collegiate esports and competitive gaming.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#1c1c1e',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  appName: {
    color: '#6A0DAD',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#6A0DAD',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  detail: {
    fontSize: 16,
    color: '#aaa',
    marginVertical: 2,
  },
  highlight: {
    color: '#fff',
    fontWeight: '600',
  },
  bio: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
});
