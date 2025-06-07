// src/screens/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
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

      <ScrollView contentContainerStyle={styles.profileArea}>
        <View style={styles.card}>
          {/* AVATAR */}
          <Image
            source={require('../../assets/images/felipeprofile.png')}
            style={styles.avatar}
          />

          {/* USERNAME */}
          <Text style={styles.username}>@Gamer123</Text>

          {/* DETAILS */}
          <Text style={styles.detail}>🥇 Rank: <Text style={styles.highlight}>Immortal</Text></Text>
          <Text style={styles.detail}>🎮 Games Played: <Text style={styles.highlight}>218</Text></Text>
          <Text style={styles.detail}>🕹️ Main Game: <Text style={styles.highlight}>Valorant</Text></Text>
          <Text style={styles.detail}>🎯 Secondary Game: <Text style={styles.highlight}>CS:GO</Text></Text>

          {/* BIO */}
          <Text style={styles.bio}>
            🎧 Passionate about collegiate esports and competitive gaming.
          </Text>

          {/* HOBBIES */}
          <Text style={styles.sectionTitle}>🎮 Hobbies</Text>
          <Text style={styles.sectionText}>
            - Streaming on Twitch{"\n"}
            - Practicing aim routines{"\n"}
            - Coaching lower-rank players{"\n"}
            - Watching pro Valorant tournaments
          </Text>

          {/* HIGHLIGHT VIDEO (Placeholder) */}
          <Text style={styles.sectionTitle}>🎬 Highlight Video</Text>
          <View style={styles.videoBox}>
            <Text style={styles.videoText}>[ Video clip or embedded YouTube/Twitch highlight ]</Text>
          </View>

          {/* ABOUT ME */}
          <Text style={styles.sectionTitle}>🧠 About Me</Text>
          <Text style={styles.sectionText}>
            I'm a competitive esports player aiming to get recruited by a top collegiate program.
            I focus on teamwork, game sense, and leadership. Looking for a school with strong
            esports infrastructure and scholarships!
          </Text>
        </View>
      </ScrollView>
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
    padding: 24,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 24,
    width: '100%',
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginTop: 24,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  sectionText: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 20,
    alignSelf: 'flex-start',
  },
  videoBox: {
    height: 180,
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoText: {
    color: '#777',
    fontStyle: 'italic',
    fontSize: 12,
  },
});
