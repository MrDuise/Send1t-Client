import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import React, { useState, useContext } from 'react';
import AppContext from '../../../components/AppContext';

import { theme } from '../../../infrastructure/theme';

import { login } from '../../../infrastructure/backend/request';

import Logo from '../../../components/Logo';

/**
 *Login screen
 *used to login to the app
 * @param {*} { navigation } prop provided by react navigation. used to navigate to other screens
 * @return {*} 
 */
const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //gets the context from the AppContext
  //this is used as a global state for the app
  const myContext = useContext(AppContext);

  /**
   *takes the username and password and sends it to the backend
   *if the login is successful, it will navigate to the ConversationsLog screen
    *if the login is unsuccessful, it will alert the user
   */
  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await login(myContext.userNameValue, password);

      if (user !== null && user !== undefined) {
        //sets the global state to the user that was returned from the backend
        myContext.setSignedIn(true);
        navigation.navigate('ConversationsLog');
      } else {
        alert('Invalid username or password');
        myContext.setUserName('');
        setPassword('');
      }
    } catch (error) {
      alert('An error occurred');
      console.error(error);
    }
    setLoading(false);
  };

  /**
   * navigates to the Register screen
   **/
  const registerNavigate = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}></View>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>Please Sign in to conntinue</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          label="Username"
          mode="outlined"
          value={myContext.userNameValue}
          style={styles.textInput}
          onChangeText={myContext.setUserName}
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
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        style={styles.signInButton}
      >
        Login
      </Button>

      <View style={styles.footer}>
        <Text onPress={registerNavigate} style={styles.subTitle}>
          Don't have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'grey', // neutral-100
  },
  title: {
    flex: 1,
    fontSize: 32,
    lineHeight: 48,
    color: '#171A1FFF', // neutral-900
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 20,
    lineHeight: 30,
    color: '#9095A0FF', // neutral-500
  },
  textInputContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '80%',
    marginVertical: 8,
  },
  forgotPassword: {
    fontSize: 14,
    lineHeight: 22,
    color: '#00BDD6FF', // primary-500
    alignSelf: 'flex-end',
    marginRight: '10%',
  },
  signInButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  signInButton: {
    width: '80%',
    height: 44,
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 4, // border-m
    backgroundColor: '#00BDD6FF', // primary-500
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
