import { View, Text } from 'react-native'
import React from 'react'
import ConversationCard from './conversation-card';
/**
 * Lists all the conversations a user has had with other users
 *
 * @return {*} 
 */
const ConversationList = ({Conversation}) => {
  return (
    <View>
       {/* {Conversations.map((conversation) => {
        return <ConversationCard key={conversation._id} conversation={conversation} />;
      })
   } */}
   <ConversationCard />
    </View>
  )
}

export default ConversationList