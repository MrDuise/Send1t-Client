import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import React from 'react'
/**
 * This pages is the first screen that loads when the app is opened and the user is not signed in
 *
 * @param {*} {login, register}
 * @return {*} 
 */
const WelcomePage = ({login, register}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Logo</Text>
      <Text style={styles.title}>Welcome to Send1t</Text>
      <Button mode='contained' onPress={() => register} style={styles.box}>Sign Up</Button>
      <Button mode='contained' onPress={() => login} style={styles.box}>Log In</Button>

    </View>
  )
}

export default WelcomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    textAlignVertical: 'center',
    textAlign: 'center',
    width: 200,
    height: 200,
    borderColor: 'black',
    borderWidth: 1,

    backgroundColor: 'red',
    borderRadius: 100,
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  box: {
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
  },

})