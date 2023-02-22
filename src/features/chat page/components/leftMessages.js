import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
/**
 *This is the messages that shows up for the left side of the chat screen
 * meaning the signed in user
 * @return {*} 
 */
const leftMessages = ({message}) => {
  return (
    <View>
      <Text style={styles.leftMessage}>{message}</Text>
    </View>
  )
}

export default leftMessages

const styles = StyleSheet.create({
    leftMessage: {
        backgroundColor: theme.colors.colorTheme.purple,
        color: theme.colors.colorTheme.white,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        maxWidth: '80%',
        alignSelf: 'flex-start',
    },
})