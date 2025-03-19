import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
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

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('请填写所有必填字段', '电子邮件和密码是必需的。');
      return;
    }
    
    try {
      await login(email, password);
      // Navigation will be handled automatically by the auth state listener
    } catch (error: any) {
      console.log(error);
      Alert.alert('登录失败', error.message);
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
            <Text style={styles.title}>登录</Text>
            
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
                placeholder="输入您的密码"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>忘记密码?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>登录</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>还没有账户? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>注册</Text>
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
    marginTop: 60,
    marginBottom: 40,
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
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#ff9800',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#ff9800',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  registerText: {
    fontSize: 14,
    color: '#ff9800',
    fontWeight: 'bold',
  },
});

export default LoginScreen; 