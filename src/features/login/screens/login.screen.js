import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
const Stack = createNativeStackNavigator();

import { theme } from '../../../infrastructure/theme';

import { useNavigation } from '@react-navigation/native';

import { login } from '../../../infrastructure/backend/request';

import Logo from '../../../components/Logo';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //takes the username and password and sends it to the backend
  //if the login is successful, it will navigate to the ConversationsLog screen
  const handleLogin = async () => {
    setLoading(true);
    console.log(username, password);
    try {
      const user = await login(username, password);
      console.log("in login screen", user);

      

      if (user !== null && user !== undefined) {
        console.log(user)
        navigation.navigate('ConversationsLog', {
          userName: user,
        })
      } else {
        alert('Invalid username or password');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      alert('An error occurred');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.muted}>Please Sign in to conntinue</Text>
      <TextInput
        label="Username"
        mode="outlined"
        value={username}
        style={styles.textInput}
        onChangeText={(text) => setUsername(text)}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        left={<TextInput.Icon icon="lock" />}
      />

      <Button mode="contained" onPress={handleLogin} loading={loading}>
        Login
      </Button>
      <Button mode="contained" style={styles.registerButton}>
        Register
      </Button>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.colorTheme.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  muted: {
    fontSize: 20,
    color: theme.colors.colorTheme.seaBlue,
    marginBottom: 50,
  },

  textInput: {
    width: 300,
    marginBottom: 20,
  },

  buttonLogin: {
    width: 250,
    marginBottom: 20,
  },
  registerButton: {
    width: 200,
  },
});
