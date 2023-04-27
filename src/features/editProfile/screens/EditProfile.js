import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import React, { useState, useContext } from 'react';

import { theme } from '../../../infrastructure/theme';
import { updateUser } from '../../../infrastructure/backend/request';
import Logo from '../../../components/Logo';
import AppContext from '../../../components/AppContext';

const EditProfile = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const [firstName, setFirstName] = useState(myContext.user.firstName);
  const [lastName, setLastName] = useState(myContext.user.lastName);
  const [email, setEmail] = useState(myContext.user.email);
  const [loading, setLoading] = useState(false);
  const [tagLine, setTagLine] = useState(myContext.user.tagLine);

  /**
   * takes the user entered information and sends it to the backend
   * if the register is successful, it will navigate to the Login screen
   * if the register is unsuccessful, it will alert the user
   * and clear the form
   *
   * @return {*}
   */
  const handleEdit = async () => {
    setLoading(true);

    try {
      const user = await updateUser(firstName, lastName, email, tagLine);
      myContext.setUser(user);
      console.log('in edit profile screen', myContext.user);

      if (user !== null && user !== undefined) {
        console.log(user);
        navigation.push('Profile');
      }
    } catch (error) {
      alert('An error occurred');
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.logoContainer}></View>

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subTitle}>Edit Your Account</Text>
        <View style={styles.textInputContainer}>
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

          <TextInput
            label="Tagline"
            mode="outlined"
            value={tagLine}
            style={styles.textInput}
            onChangeText={(text) => setTagLine(text)}
            left={<TextInput.Icon icon="email" />}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleEdit}
          loading={loading}
          style={styles.signInButton}
        >
          Complete Edit
        </Button>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

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
    top: -10,
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
