import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';

// Placeholder for icons
const PlaceholderImage = () => (
  <View style={{ width: 120, height: 80, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#aaa' }}>120 × 80</Text>
  </View>
);

// Airplane icon component
const AirplaneIcon = () => (
  <Text style={{ fontSize: 18 }}>✈️</Text>
);

// Checkmark icon component
const CheckmarkIcon = () => (
  <Text style={{ fontSize: 24, color: '#4CAF50' }}>✓</Text>
);

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="搜索目的地或航空公司..."
              placeholderTextColor="#888"
            />
          </View>
        </View>

        {/* Flight Routes Section */}
        <View style={styles.card}>
          <View style={styles.flightRoute}>
            <View style={styles.routeDetails}>
              <Text style={styles.routeCode}>PVG</Text>
              <AirplaneIcon />
              <Text style={styles.routeCode}>LAX</Text>
            </View>
            <Text style={styles.requirementText}>需提前30天申请</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.flightRoute}>
            <View style={styles.routeDetails}>
              <Text style={styles.routeCode}>广州</Text>
              <Text style={styles.routeArrow}>→</Text>
              <Text style={styles.routeCode}>成都</Text>
            </View>
            <CheckmarkIcon />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.flightRoute}>
            <View style={styles.routeDetails}>
              <Text style={styles.routeCode}>CAN</Text>
              <AirplaneIcon />
              <Text style={styles.routeCode}>CTU</Text>
            </View>
            <Text style={styles.requirementText}>需健康证明</Text>
          </View>
        </View>

        {/* Pet Types Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>按宠物类型</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>查看全部</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <TouchableOpacity style={styles.petTypeCard}>
            <PlaceholderImage />
            <Text style={styles.petTypeText}>小型犬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.petTypeCard}>
            <PlaceholderImage />
            <Text style={styles.petTypeText}>猫</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.petTypeCard}>
            <PlaceholderImage />
            <Text style={styles.petTypeText}>大型犬</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Progress Bar (Simplified) */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar} />
        </View>

        {/* Airlines Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>航空公司政策</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>查看全部</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <TouchableOpacity style={styles.airlineCard}>
            <PlaceholderImage />
            <Text style={styles.airlineText}>中国国航</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.airlineCard}>
            <PlaceholderImage />
            <Text style={styles.airlineText}>东方航空</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.airlineCard}>
            <PlaceholderImage />
            <Text style={styles.airlineText}>南方航空</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  flightRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeCode: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  routeArrow: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  requirementText: {
    color: '#888',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#ff9800',
    fontSize: 14,
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  petTypeCard: {
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    width: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  petTypeText: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    width: '50%',
    backgroundColor: '#ff9800',
    borderRadius: 2,
  },
  airlineCard: {
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    width: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  airlineText: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen; 