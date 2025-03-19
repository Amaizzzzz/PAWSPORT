import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TravelPlanList from '../components/TravelPlanList';
import TravelPlanForm from '../components/TravelPlanForm';
import Button from '../components/Button';
import { TravelPlan, TravelPlanFormData } from '../types/travel';
import { v4 as uuidv4 } from 'uuid';

const TravelScreen = () => {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreatePlan = async (formData: TravelPlanFormData) => {
    try {
      setLoading(true);
      const newPlan: TravelPlan = {
        id: uuidv4(),
        ...formData,
        status: 'planned',
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setPlans(prev => [...prev, newPlan]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating plan:', error);
      Alert.alert('错误', '创建计划失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlan = async (formData: TravelPlanFormData) => {
    if (!editingPlan) return;

    try {
      setLoading(true);
      setPlans(prev =>
        prev.map(plan =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                ...formData,
                updatedAt: new Date(),
              }
            : plan
        )
      );
      setShowForm(false);
      setEditingPlan(null);
    } catch (error) {
      console.error('Error updating plan:', error);
      Alert.alert('错误', '更新计划失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      '删除计划',
      '确定要删除这个旅行计划吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            setPlans(prev => prev.filter(plan => plan.id !== id));
          },
        },
      ]
    );
  };

  const handleEdit = (plan: TravelPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleView = (plan: TravelPlan) => {
    // TODO: 实现计划详情查看功能
    Alert.alert('计划详情', `查看计划: ${plan.title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>旅行计划</Text>
        <Button
          title="新建计划"
          onPress={() => {
            setEditingPlan(null);
            setShowForm(true);
          }}
          variant="outline"
        />
      </View>

      <ScrollView style={styles.content}>
        <TravelPlanList
          plans={plans}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      </ScrollView>

      <Modal
        visible={showForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingPlan ? '编辑计划' : '新建计划'}
            </Text>
            <Button
              title="取消"
              onPress={() => {
                setShowForm(false);
                setEditingPlan(null);
              }}
              variant="outline"
            />
          </View>

          <TravelPlanForm
            onSubmit={editingPlan ? handleEditPlan : handleCreatePlan}
            initialData={editingPlan || undefined}
            submitButtonText={editingPlan ? '保存修改' : '创建计划'}
            loading={loading}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});

export default TravelScreen; 