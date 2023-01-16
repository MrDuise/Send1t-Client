import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Logo from '../../../components/Logo'

const Login = () => {
  return (
    <View>
        <Logo />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.muted}>Please Sign in to conntinue</Text>
        
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})