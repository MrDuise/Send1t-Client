import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import React from 'react'

import { theme } from '../../../infrastructure/theme';

import Logo from '../../../components/Logo'

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Logo />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.muted}>Please Sign in to conntinue</Text>
        <TextInput
          label="Username"
          mode="outlined"
          style={styles.textInput}
          left={<TextInput.Icon icon="account" />}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          style={styles.textInput}
          left={<TextInput.Icon icon="lock" />}
        />
      
        <Button mode="contained" style={styles.buttonLogin}>
          Login
        </Button>
        <Button mode="contained" style={styles.registerButton}>
          Register
        </Button>


        
    </SafeAreaView>
  )
}

export default Login

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
  }

})