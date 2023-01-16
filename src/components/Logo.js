import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../infrastructure/theme'

const Logo = () => {
  return (
    <View>
      <Text style={styles.logo}>Logo</Text>
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    logo: {
        textAlignVertical: 'center',
        textAlign: 'center',
        width: theme.sizes[4],
        height: theme.sizes[4],
        borderColor: theme.colors.ui.primary,
        borderWidth: 1,
    
        backgroundColor: theme.colors.ui.secondary,
        borderRadius: 100,
        marginBottom: 50,
      }
})