import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
const ChatRoomHeader = ({ name = "" }) => {
  const { goBack } = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <AntDesign
          onPress={() => goBack()}
          name={"arrowleft"}
          size={22}
          color={"#5B5E66"}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

export default ChatRoomHeader

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10
  },
  name: {
    fontSize: 22,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    lineHeight: 28,
    color: "#1A1C1E"
  }
})
