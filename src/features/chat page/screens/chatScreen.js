import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-paper';
import React, {useEffect, useState} from 'react'

import MessagesLog from '../components/messagesLog'

const chatScreen = ({navigator, conversationID, user}) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    useEffect(async () => {
        //will not work because not implemented yet
        //TODO: implement getMessages and pagination 
        //TODO: for testing purposes, get a JSON file with messages
        //TODO: implement websocket for real time messaging 
        console.log(conversationID)
        const res = await getMessages(conversationID)
        setMessages(res)
        console.log(res);
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <MessagesLog messages={messages} signedInUser={user} />
      <TextInput mode='outlined' label='Send Message...' value={message} left={<TextInput.Icon icon="message" />} />
    </SafeAreaView>
  )
}

export default chatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.colorTheme.purple,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
})