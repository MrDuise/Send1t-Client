import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ConversationCard from './src/features/conversation-log/components/conversation-card'
import React, {useState} from 'react'
import {theme} from './src/infrastructure/theme'
import  ConversationsLog  from './src/features/conversation-log/screens/conversation-log.screen';

import WelcomePage from './src/features/welcome page/screens/welcome-page.screen';

export default function App() {
 const [signedIn, setSignedIn] = useState(false);



  return (
    <>
    <SafeAreaView style={styles.container}>
      
      {signedIn ? <ConversationsLog /> : <WelcomePage />}
      <StatusBar style="auto" />
    
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
