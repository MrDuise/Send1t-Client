import { View, Text } from 'react-native'
import React from 'react'
import ConversationCard from './conversation-card';
/**
 * Lists all the conversations a user has had with other users
 *
 * @return {*} 
 */
const ConversationList = ({conversationsList, nav}) => {
  return (
    <View>
       {conversationsList.map((conversation) => {
        return <ConversationCard key={conversation._id} conversation={conversation} nav={nav}/>;
      })
   } 
   
    </View>
  )
}

export default ConversationList