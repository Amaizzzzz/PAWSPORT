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

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, loading, error } = useAuth();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('请填写电子邮件', '电子邮件是必需的。');
      return;
    }
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error: any) {
      console.log(error);
      Alert.alert('密码重置失败', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>← 返回</Text>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <Text style={styles.title}>重置密码</Text>
            
            {isSubmitted ? (
              <View style={styles.successContainer}>
                <Text style={styles.successTitle}>邮件已发送!</Text>
                <Text style={styles.successText}>
                  我们已向您的电子邮件发送了重置密码的链接。请检查您的收件箱并按照说明操作。
                </Text>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.buttonText}>返回登录</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.description}>
                  请输入您的电子邮件地址，我们将向您发送一个重置密码的链接。
                </Text>
                
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

                <TouchableOpacity 
                  style={styles.button}
                  onPress={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>发送重置链接</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
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
  backButton: {
    marginTop: 20,
    marginLeft: 15,
    padding: 10,
  },
  backText: {
    fontSize: 16,
    color: '#ff9800',
  },
  formContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 30,
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
});

export default ForgotPasswordScreen; 