import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Card from '../components/Card';
import FileUploader from '../components/FileUploader';

const TestScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const handleFileSelected = (uri: string) => {
    console.log('Selected file:', uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>组件测试页面</Text>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>表单输入测试</Text>
          <FormInput
            label="姓名"
            placeholder="请输入姓名"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            error={errors.name}
          />
          <FormInput
            label="邮箱"
            placeholder="请输入邮箱"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            error={errors.email}
          />
          <FormInput
            label="密码"
            placeholder="请输入密码"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            error={errors.password}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>按钮测试</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="主要按钮"
              onPress={handleSubmit}
              loading={loading}
            />
            <Button
              title="次要按钮"
              onPress={handleSubmit}
              variant="secondary"
            />
            <Button
              title="轮廓按钮"
              onPress={handleSubmit}
              variant="outline"
            />
            <Button
              title="禁用按钮"
              onPress={handleSubmit}
              disabled
            />
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>文件上传测试</Text>
          <FileUploader
            label="上传宠物照片"
            onFileSelected={handleFileSelected}
            accept="image"
          />
        </Card>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    margin: 16,
    textAlign: 'center',
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  buttonContainer: {
    gap: 12,
  },
});

export default TestScreen; 