import React from "react"

import { View, Text, StyleSheet } from "react-native"

const MyBubble = ({ data }) => {
  // console.log(data?.video);
  return (
    <>
      <View style={[styles.bubble, { backgroundColor: "#3077D0" }]}>
        <Text style={[styles.text, { color: "white" }]}>{data?.text}</Text>
      </View>
      {/* <Text style={[styles.status, { color: "#000000" }]}>{data.status}</Text> */}
    </>
  )
}

export default MyBubble

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "column",

    maxWidth: "70%",
    alignSelf: "flex-end",
    borderRadius: 15,
    // borderTopRightRadius: 0,
    padding: 10,
    marginLeft: 20,
    marginTop: 10,
    maxHeight: 250
  },
  text: {
    fontSize: 14,
    textAlign: "left"
    // marginTop: 5
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover"
    // backgroundColor: 'pink',
  },
  video: {
    width: 200,
    maxHeight: 200,
    borderRadius: 10,
    resizeMode: "cover"
    // backgroundColor: 'pink',
  },
  status: {
    textAlign: "right",
    textTransform: "capitalize"
  }
})
