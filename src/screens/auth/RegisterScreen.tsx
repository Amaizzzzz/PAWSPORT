import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation: any;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register, loading, error } = useAuth();

  const handleRegister = async () => {
    // Validate inputs
    if (!displayName || !email || !password || !confirmPassword) {
      Alert.alert('请填写所有必填字段', '姓名、电子邮件和密码是必需的。');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('密码不匹配', '请确保您的密码和确认密码匹配。');
      return;
    }
    
    if (password.length < 8) {
      Alert.alert('密码太短', '密码必须至少包含8个字符。');
      return;
    }

    try {
      await register(email, password, displayName);
      // Navigation will be handled automatically by the auth state listener
    } catch (error: any) {
      console.log(error);
      Alert.alert('注册失败', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>PAWSPORT</Text>
            <Text style={styles.tagline}>宠物国际旅行的便捷伴侣</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>创建账户</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>姓名</Text>
              <TextInput
                style={styles.input}
                placeholder="输入您的姓名"
                value={displayName}
                onChangeText={setDisplayName}
                autoCorrect={false}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>电子邮件</Text>
              <TextInput
                style={styles.input}
                placeholder="输入您的电子邮件"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>密码</Text>
              <TextInput
                style={styles.input}
                placeholder="创建密码"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>确认密码</Text>
              <TextInput
                style={styles.input}
                placeholder="再次输入密码"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>注册</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>已有账户? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>登录</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff9800',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff9800',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  loginText: {
    fontSize: 14,
    color: '#ff9800',
    fontWeight: 'bold',
  },
});

export default RegisterScreen; 