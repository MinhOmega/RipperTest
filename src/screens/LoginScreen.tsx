import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import colors from '../constants/colors';
import LogoSVG from '../assets/svg/Logo';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = () => {
    // According to requirements, no validations needed
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LogoSVG style={styles.logo} />
      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <TouchableOpacity
        style={[styles.loginButton, !isFormValid && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={!isFormValid}>
        <Text
          style={[
            styles.loginButtonText,
            isFormValid && {color: colors.white},
          ]}>
          Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    paddingTop: 100,
  },
  logo: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.text,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.text,
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 8,
  },
  loginButtonDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  loginButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});

export default LoginScreen;
