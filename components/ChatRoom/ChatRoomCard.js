import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import USER_IMAGE from "./../../assets/UserAvatar.png"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
const ChatRoomCard = ({ data }) => {
  const { navigate } = useNavigation()
  const user = useSelector(state => state?.Auth?.user)
  const [currentUser] = useState(user?.user)
  const allProfiles = useSelector(state => state?.Auth?.allProfiles)
  const otherUser =
    data?.createdBy === currentUser ? data?.createdFor : data?.createdBy

  const otherUserData = allProfiles?.find(v => v.user_id === otherUser)
  console.log(otherUserData, data, currentUser, otherUser)
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigate("ChatRoom", { chatroom: data })}
    >
      <View style={styles.content}>
        <Image
          source={
            otherUserData?.profile_image
              ? {
                  uri: otherUserData?.profile_image
                }
              : USER_IMAGE
          }
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{otherUserData?.full_name || ""}</Text>
          <Text style={styles.message} numberOfLines={1}>
            {data.message}
          </Text>
        </View>
      </View>
      <Text style={styles.timeText}>
        {Boolean(data?.lastMessage) &&
          moment(new Date(data?.lastMessage?.seconds * 1000)).format("hh:mm a")}
      </Text>
    </TouchableOpacity>
  )
}

export default ChatRoomCard

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 15,
    borderBottomColor: "#79747E29",
    borderBottomWidth: 1,
    height: 65,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  avatar: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    borderRadius: 50,
    marginRight: 15
  },
  content: {
    flexDirection: "row"
  },
  textContainer: {},
  timeText: {
    color: "#C4C6CF"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.24
  },
  message: {
    color: "#5B5E66",

    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.24,
    maxWidth: 250
  }
})
