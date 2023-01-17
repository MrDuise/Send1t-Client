import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native-paper';
import React from 'react'
import Logo from '../../../components/Logo';
import { theme } from '../../../infrastructure/theme';
/**
 * This pages is the first screen that loads when the app is opened and the user is not signed in
 *
 * @param {*} {login, register}
 * @return {*} 
 */
const WelcomePage = ({login, register}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>Welcome to Send1t</Text>
      <Button mode='contained' onPress={() => register} style={styles.box}>Sign Up</Button>
      <Button mode='contained' onPress={() => login} style={styles.box}>Log In</Button>

    </SafeAreaView>
  )
}

export default WelcomePage

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
    marginBottom: 50,
  },
  box: {
    width: 200,
    fontSize: theme.fontSizes.button,
    borderColor: theme.colors.ui.primary,
    backgroundColor: theme.colors.ui.primary,
    borderWidth: 1,
    marginBottom: theme.sizes[3],
  },

})