import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
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

      if (user === { error: 'Username/Email not available' }) {
        alert('Username/Email not available');
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setEmail('');
      }

      if (user !== null && user !== undefined) {
        console.log(user);
        navigation.navigate('Login');
      } else {
        alert('Invalid username or password');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      alert('An error occurred');
      console.error(error);
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
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>Registation</Text>
      <Text style={styles.muted}>Make a new account</Text>

      <HelperText type="error" visible={passwordError} padding="none">
        Password must be 8-15 characters, contain at least one lowercase letter,
        one uppercase letter, one numeric digit, and one special character
      </HelperText>
      <TextInput
        label="Username"
        mode="outlined"
        style={styles.textInput}
        onChangeText={(text) => setUsername(text)}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={handlePasswordChange}
        left={<TextInput.Icon icon="lock" />}
      />

      <TextInput
        label="First Name"
        mode="outlined"
        style={styles.textInput}
        onChangeText={(text) => setFirstName(text)}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label="Last Name"
        mode="outlined"
        style={styles.textInput}
        onChangeText={(text) => setLastName(text)}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label="Email"
        mode="outlined"
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon icon="email" />}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.registerButton}
      >
        Register
      </Button>
    </SafeAreaView>
  );
};

export default Register;

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
