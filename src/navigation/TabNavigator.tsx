import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import TravelScreen from '../screens/TravelScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TestScreen from '../screens/TestScreen';

const Tab = createBottomTabNavigator();

// Custom Tab Icon Component
const TabIcon = ({ name, focused }: { name: string, focused: boolean }) => (
  <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    {name === 'Home' ? '🏠' : 
     name === 'Documents' ? '📄' : 
     name === 'Travel' ? '✈️' : 
     name === 'Profile' ? '👤' :
     name === 'Test' ? '🧪' : ''}
  </Text>
);

// Custom Tab Label Component
const TabLabel = ({ name, focused }: { name: string, focused: boolean }) => (
  <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
    {name === 'Home' ? '首页' : 
     name === 'Documents' ? '文档' : 
     name === 'Travel' ? '旅行' : 
     name === 'Profile' ? '我的' :
     name === 'Test' ? '测试' : ''}
  </Text>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#ff9800',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel name="Home" focused={focused} />
        }}
      />
      <Tab.Screen 
        name="Documents" 
        component={DocumentsScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Documents" focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel name="Documents" focused={focused} />
        }}
      />
      <Tab.Screen 
        name="Travel" 
        component={TravelScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Travel" focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel name="Travel" focused={focused} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel name="Profile" focused={focused} />
        }}
      />
      <Tab.Screen 
        name="Test" 
        component={TestScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Test" focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel name="Test" focused={focused} />
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tabIcon: {
    fontSize: 24,
    color: '#888',
  },
  tabIconFocused: {
    color: '#ff9800',
  },
  tabLabel: {
    fontSize: 12,
    color: '#888',
  },
  tabLabelFocused: {
    color: '#ff9800',
  },
});

export default TabNavigator; 