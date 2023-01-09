import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ConversationCard from './src/features/conversation-log/components/conversation-card'
import React from 'react'
import {theme} from './src/infrastructure/theme'
import  ConversationsLog  from './src/features/conversation-log/screens/conversation-log.screen';

export default function App() {
  return (
    <>
    <SafeAreaView style={styles.container}>
      
      <ConversationsLog />
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
