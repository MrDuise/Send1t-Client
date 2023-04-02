import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'

const ProfileHeader = () => {
  return (
    <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="Profile" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({})