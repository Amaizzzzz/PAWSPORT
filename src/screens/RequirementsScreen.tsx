import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

const RequirementCard = ({ title, status, description }: { title: string, status: string, description: string }) => (
  <TouchableOpacity style={styles.requirementCard}>
    <View style={styles.requirementHeader}>
      <Text style={styles.requirementTitle}>{title}</Text>
      <Text style={[
        styles.requirementStatus,
        { color: status === '完成' ? '#4CAF50' : status === '进行中' ? '#FF9800' : '#F44336' }
      ]}>
        {status}
      </Text>
    </View>
    <Text style={styles.requirementDescription}>{description}</Text>
  </TouchableOpacity>
);

const RequirementsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>旅行要求</Text>
        </View>
        
        <View style={styles.destination}>
          <Text style={styles.destinationText}>中国 → 美国</Text>
          <Text style={styles.dateText}>2025年4月10日</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '40%' }]} />
          </View>
          <Text style={styles.progressText}>2/5 完成</Text>
        </View>
        
        <View style={styles.requirementsList}>
          <RequirementCard 
            title="宠物健康证明" 
            status="完成" 
            description="从出发前10天内由执业兽医开具的健康证明" 
          />
          
          <RequirementCard 
            title="狂犬病疫苗接种证明" 
            status="完成" 
            description="必须在出发前至少30天接种狂犬病疫苗" 
          />
          
          <RequirementCard 
            title="微芯片植入" 
            status="进行中" 
            description="ISO标准芯片，用于宠物身份识别" 
          />
          
          <RequirementCard 
            title="入境许可申请" 
            status="未完成" 
            description="提前向目的地国家申请宠物入境许可" 
          />
          
          <RequirementCard 
            title="航空公司宠物运输预订" 
            status="未完成" 
            description="提前预订宠物舱位或货运服务" 
          />
        </View>
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  destination: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  destinationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
  },
  requirementsList: {
    padding: 16,
  },
  requirementCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  requirementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  requirementStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  requirementDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default RequirementsScreen; 