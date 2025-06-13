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
          <Text style={styles.detail}>🎖️ Rank: <Text style={styles.highlight}>Immortal</Text></Text>
          <Text style={styles.detail}>🎮 Games Played: <Text style={styles.highlight}>218</Text></Text>
          <Text style={styles.detail}>🕹️ Main Game: <Text style={styles.highlight}>Valorant</Text></Text>
          <Text style={styles.detail}>🧩 Secondary Game: <Text style={styles.highlight}>Overwatch</Text></Text>
          <Text style={styles.detail}>🎯 In-Game Role: <Text style={styles.highlight}>Entry Fragger</Text></Text>

          {/* ABOUT */}
          <Text style={styles.bio}>
            🎧 Passionate about collegiate esports and competitive gaming.
          </Text>

          {/* TRACKER.GG */}
          <Text style={styles.sectionTitle}>📊 Stats Tracker</Text>
          <Text style={styles.sectionText}>tracker.gg/valorant/profile/Gamer123</Text>

          {/* TEAM EXPERIENCE */}
          <Text style={styles.sectionTitle}>🏅 Team Experience</Text>
          <Text style={styles.sectionText}>Captain - HS Nationals 2023 (Top 4)</Text>
          <Text style={styles.sectionText}>Scrim Coordinator - East Coast Gaming</Text>

          {/* SOCIALS */}
          <Text style={styles.sectionTitle}>📱 Socials</Text>
          <Text style={styles.sectionText}>Twitch: twitch.tv/gamer123</Text>
          <Text style={styles.sectionText}>YouTube: youtube.com/@gamer123</Text>

          {/* LOCATION */}
          <Text style={styles.sectionTitle}>📍 Location</Text>
          <Text style={styles.sectionText}>Boston, MA | Languages: English, Portuguese</Text>
          <Text style={styles.sectionTitle}>🎥 Highlight Reel</Text>
          <Text style={styles.sectionText}>youtu.be/your_highlight_video</Text>

          <Text style={styles.sectionTitle}>📚 Education</Text>
          <Text style={styles.sectionText}>Comp Sci, GPA 3.8 — Class of ’26</Text>

          <Text style={styles.sectionTitle}>⚔️ Playstyle</Text>
          <Text style={styles.sectionText}>• Entry Fragger • Strong Late-Round Calls</Text>

          <Text style={styles.sectionTitle}>⏰ Availability</Text>
          <Text style={styles.sectionText}>Weeknights after 7 PM EST</Text>

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
    width: '90%',
    alignItems: 'center',
    // cross-platform drop shadow:
    boxShadow: '0px 4px 10px rgba(106,13,173,0.4)',
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
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  sectionText: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
    textAlign: 'center',
  },
});
