import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import home screen directly
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
