import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FormInput from './FormInput';
import Button from './Button';
import { TravelPlanFormData } from '../types/travel';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TravelPlanFormProps {
  onSubmit: (data: TravelPlanFormData) => void;
  initialData?: TravelPlanFormData;
  submitButtonText?: string;
  loading?: boolean;
}

const TravelPlanForm: React.FC<TravelPlanFormProps> = ({
  onSubmit,
  initialData,
  submitButtonText = '创建计划',
  loading = false,
}) => {
  const [formData, setFormData] = useState<TravelPlanFormData>({
    title: initialData?.title || '',
    destination: initialData?.destination || '',
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate || new Date(),
    notes: initialData?.notes || '',
  });
  const [errors, setErrors] = useState<Partial<TravelPlanFormData>>({});
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<TravelPlanFormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入计划标题';
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = '请输入目的地';
    }
    
    if (formData.startDate > formData.endDate) {
      newErrors.endDate = '结束日期不能早于开始日期';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleDateChange = (date: Date | undefined, field: 'startDate' | 'endDate') => {
    if (date) {
      setFormData(prev => ({ ...prev, [field]: date }));
    }
    if (field === 'startDate') {
      setShowStartDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FormInput
        label="计划标题"
        value={formData.title}
        onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
        error={errors.title}
      />

      <FormInput
        label="目的地"
        value={formData.destination}
        onChangeText={(text) => setFormData(prev => ({ ...prev, destination: text }))}
        error={errors.destination}
      />

      <View style={styles.dateContainer}>
        <FormInput
          label="开始日期"
          value={formData.startDate.toLocaleDateString()}
          onPressIn={() => setShowStartDatePicker(true)}
          editable={false}
        />
        <FormInput
          label="结束日期"
          value={formData.endDate.toLocaleDateString()}
          onPressIn={() => setShowEndDatePicker(true)}
          editable={false}
          error={errors.endDate}
        />
      </View>

      <FormInput
        label="备注"
        value={formData.notes}
        onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
        multiline
        numberOfLines={4}
      />

      {showStartDatePicker && (
        <DateTimePicker
          value={formData.startDate}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(date, 'startDate')}
          minimumDate={new Date()}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={formData.endDate}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(date, 'endDate')}
          minimumDate={formData.startDate}
        />
      )}

      <Button
        title={submitButtonText}
        onPress={handleSubmit}
        loading={loading}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  submitButton: {
    marginTop: 24,
  },
});

export default TravelPlanForm; 