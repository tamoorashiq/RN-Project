import React, { useEffect } from "react"

import { View, Text, StyleSheet, Image } from "react-native"

import firestore from "@react-native-firebase/firestore"
import USER_IMAGE from "./../../assets/UserAvatar.png"

const OtherBubble = ({ data, otherProfile }) => {
  useEffect(() => {
    if (data?.status === "sent") {
      firestore().collection(`chats-${data?.chatroomId}`).doc(data.id).update({
        status: "delivered"
      })
    }
  }, [])
  // console.log(data?.image);

  return (
    <View style={styles.row}>
      <Image
        source={
          otherProfile?.profile_image
            ? {
                uri: otherProfile?.profile_image
              }
            : USER_IMAGE
        }
        style={styles.avatar}
      />
      <View style={[styles.bubble, { backgroundColor: "rgba(0, 0, 0, 0.05)" }]}>
        <Text style={[styles.text, { color: "#000000" }]}>{data?.text}</Text>
      </View>
    </View>
  )
}

export default OtherBubble

const styles = StyleSheet.create({
  bubble: {
    // flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "70%",

    borderRadius: 15,
    // borderTopRightRadius: 0,
    padding: 10,
    marginLeft: 5,
    marginTop: 10,
    maxHeight: 250
  },
  text: {
    fontSize: 12,
    textAlign: "center"
    // marginTop: 5
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 20,
    resizeMode: "cover",
    marginTop: -5
  }
})
