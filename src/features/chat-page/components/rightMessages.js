import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../../infrastructure/theme'
/**
 *this is the messages that shows up for the right side of the chat screen
 * meaning the other user
 * @return {*} 
 */
const rightMessages = ({message}) => {
  return (
    <View>
      <Text style={styles.rightMessage}>{message}</Text>
    </View>
  )
}

export default rightMessages

const styles = StyleSheet.create({
    rightMessage: {
        backgroundColor: theme.colors.colorTheme.white,
        color: theme.colors.colorTheme.purple,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
})