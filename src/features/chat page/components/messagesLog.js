import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import leftMessages from './leftMessages'
import rightMessages from './rightMessages'
/**
 *This is the loop that shows all the messages in the chat screen
 *
 * @return {*} 
 */
const messagesLog = ({messages, signedInUser}) => {
  return (
    <View>
      {messages.map((message) => {
        return (
          <View>
            {message.sender === signedInUser ? (
                <leftMessages message={message} />
            ) : (
                <rightMessages message={message} />
            )}
          </View>
        )
      }
        )}
    </View>
  )
}

export default messagesLog

const styles = StyleSheet.create({})