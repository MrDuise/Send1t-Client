import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import React from 'react'

import { theme } from '../../../infrastructure/theme';

import Logo from '../../../components/Logo'

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Logo />
        <Text style={styles.title}>Registation</Text>
        <Text style={styles.muted}>Make a new account</Text>
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

        <TextInput
          label="First Name"
          mode="outlined"
          style={styles.textInput}
          left={<TextInput.Icon icon="name" />}
        />

        <TextInput
          label="Last Name"
          mode="outlined"
          style={styles.textInput}
          left={<TextInput.Icon icon="name" />}
        />

        <TextInput
          label="Email"
          mode="outlined"
          style={styles.textInput}
          left={<TextInput.Icon icon="email" />}
        />
      
     
        <Button mode="contained" style={styles.registerButton}>
          Register
        </Button>


        
    </SafeAreaView>
  )
}

export default Register

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
        width: 300,
        fontSize: theme.fontSizes.button,
        borderColor: theme.colors.ui.primary,
        backgroundColor: theme.colors.ui.primary,
        borderWidth: 1,
        marginBottom: theme.sizes[3],

    },
    registerButton: {
        width: 300,
        fontSize: theme.fontSizes.button,
        borderColor: theme.colors.ui.primary,
        backgroundColor: theme.colors.ui.primary,
        borderWidth: 1,
        marginBottom: theme.sizes[3],

    },
});