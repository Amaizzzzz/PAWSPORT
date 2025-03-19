import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const ProfileMenuItem = ({ icon, title, description }: { icon: string, title: string, description?: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {description && <Text style={styles.menuDescription}>{description}</Text>}
    </View>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

const ProfileSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImageText}>用户</Text>
          </View>
          <Text style={styles.profileName}>李明</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>编辑资料</Text>
          </TouchableOpacity>
        </View>

        <ProfileSection title="我的宠物">
          <ProfileMenuItem 
            icon="🐶" 
            title="小黑" 
            description="边境牧羊犬 · 3岁" 
          />
          <ProfileMenuItem 
            icon="🐱" 
            title="咪咪" 
            description="布偶猫 · 2岁" 
          />
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ 添加宠物</Text>
          </TouchableOpacity>
        </ProfileSection>

        <ProfileSection title="旅行历史">
          <ProfileMenuItem 
            icon="✈️" 
            title="北京 → 纽约" 
            description="2024年2月15日" 
          />
          <ProfileMenuItem 
            icon="✈️" 
            title="上海 → 东京" 
            description="2023年11月8日" 
          />
        </ProfileSection>

        <ProfileSection title="设置">
          <ProfileMenuItem icon="🔔" title="通知设置" />
          <ProfileMenuItem icon="🔤" title="语言设置" />
          <ProfileMenuItem icon="❓" title="帮助与支持" />
          <ProfileMenuItem icon="ℹ️" title="关于PAWSPORT" />
        </ProfileSection>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>退出登录</Text>
        </TouchableOpacity>
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
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 18,
    color: '#888',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  editButtonText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 16,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 22,
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
  },
  menuDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 20,
    color: '#ccc',
  },
  addButton: {
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#ff9800',
  },
  logoutButton: {
    marginVertical: 30,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f44336',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 