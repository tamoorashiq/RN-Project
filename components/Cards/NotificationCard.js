import moment from "moment"
import React from "react"
import { View, Text, StyleSheet } from "react-native"

const NotificationCard = ({ data }) => {
  //   console.log(data)
  return (
    <View style={styles.card}>
      <Text style={styles.date}>
        {moment(data?.created_at).format("DD MMM yyyy, hh:mm a")}
      </Text>

      <Text style={styles.title}>{data?.title}</Text>
    </View>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C4C6CF"
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
    color: "#1A1C1E"
  },
  date: {
    color: "#5B5E66",
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 16,
    color: "#1A1C1E",
    fontWeight: "500",
    marginBottom: 3
  }
})
