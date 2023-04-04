import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import AppContext from '../../../components/AppContext'

import FriendCard from '../components/friendCard'

const FriendsList = ({navigation}) => {
  const myContext = useContext(AppContext);
  const [friends, setFriends] = useState([])

  useEffect(() => {
    
    setFriends(mycontext.userValue.contacts)
  }, [])

  return (
    <View>
        {myContext.contactsValue.length > 0 ? (
          friends.map((contact) => (
            <FriendCard item={contact} key={contact.userName} />
          ))
        ) : (
          <Text>No Contacts</Text>
        )}
      </View>
  )
}

export default FriendsList

const styles = StyleSheet.create({})