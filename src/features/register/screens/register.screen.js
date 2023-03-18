import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import React, { useState } from 'react';

import { theme } from '../../../infrastructure/theme';
import { register } from '../../../infrastructure/backend/request';
import Logo from '../../../components/Logo';

//screen will not scroll when keyboard is open
const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //doesnot work, triggers the password error

  const loginNavigate = () => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    if (
      username === '' ||
      password === '' ||
      firstName === '' ||
      lastName === '' ||
      email === ''
    ) {
      alert('Please fill in all fields');
      return;
    }
    if (checkPasswordRequirements()) {
      alert(
        'Password must be 8-15 characters, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
      );
      return;
    }
    setLoading(true);

    try {
      const user = await register(
        username,
        password,
        firstName,
        lastName,
        email
      );
      console.log('in register screen', user);

      //if the user is null, it means that the username is already taken
      if (user === null) {
        
      }

      if (user !== null && user !== undefined) {
        console.log(user);
        navigation.navigate('Login');
      } else {
        alert('Invalid username or password');
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setLoading(false);
      }
    } catch (error) {
      alert('An error occurred');
      console.error(error);
      alert('Username/Email not available');
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setLoading(false);
    }
  };
  /**
   *tests the current password string against the regex
   * if the current string matches the regex, it returns true
   * if the current string does not match the regex, it returns false
   * @return {*}
   */
  const checkPasswordRequirements = (text) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,15}$/;

    return passwordRegex.test(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (password !== '' && !checkPasswordRequirements(text)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView  style={styles.container}>
      <View style={styles.logoContainer}></View>
      

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>Make a new account</Text>
      <View style={styles.textInputContainer}>
        <HelperText type="error" visible={passwordError} padding="none">
          Password must be 8-15 characters, contain at least one lowercase
          letter, one uppercase letter, one numeric digit, and one special
          character
        </HelperText>
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
          onChangeText={handlePasswordChange}
          left={<TextInput.Icon icon="lock" />}
        />

        <TextInput
          label="First Name"
          mode="outlined"
          value={firstName}
          style={styles.textInput}
          onChangeText={(text) => setFirstName(text)}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          label="Last Name"
          mode="outlined"
          value={lastName}
          style={styles.textInput}
          onChangeText={(text) => setLastName(text)}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon icon="email" />}
        />
        
      </View>
      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        style={styles.signInButton}
      >
        Register
      </Button>

      <View style={styles.footer}>
        <Text onPress={loginNavigate} style={styles.subTitle}>
          Already have an account?
        </Text>
      </View>
    </KeyboardAvoidingView >
    </TouchableWithoutFeedback>
  );
};

export default Register;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'grey', // neutral-100
  },
  title: {
    fontSize: 32,
    lineHeight: 48,
    color: '#171A1FFF', // neutral-900
    justifyContent: 'flex-start',
    alignItems: 'center',
   top: -10
  },
  subTitle: {
    fontSize: 20,
    lineHeight: 30,
    color: '#9095A0FF', // neutral-500
  },
  textInputContainer: {
    
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
