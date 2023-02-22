import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useEffect, useState} from 'react'

import messagesLog from '../components/messagesLog'

const chatScreen = ({navigator, conversationID}) => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        //will not work because not implemented yet
        //TODO: implement getMessages and pagination
        console.log(conversationID)
        const res = await getMessages(conversationID)
        setMessages(res)
        console.log(res);
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>{<messagesLog messages={messages} />}</Text>
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