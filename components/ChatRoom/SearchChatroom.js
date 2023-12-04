import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native"

import { LIGHT_SURFACE } from "../../styles/colors"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Image } from "react-native"

const SearchChatroom = props => {
  return (
    <View style={styles.chatInput}>
      <View style={[styles.container]}>
        <View style={[styles.inputContainer]}>
          <TextInput
            style={[styles.input]}
            {...props}
            placeholderTextColor={"#5B5E66"}
          />
          <TouchableOpacity disabled>
            <MaterialIcons name="search" size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SearchChatroom

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: 'center',
    padding: Platform.OS === "ios" ? 5 : 0,
    // paddingHorizontal: 20,
    borderRadius: 30,
    margin: 10,
    flex: 1,
    backgroundColor: LIGHT_SURFACE
  },

  inputContainer: {
    flex: 1,
    paddingHorizontal: 10,
    minHeight: Platform.OS === "android" ? 40 : 40,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#5B5E66"
  },

  chatInput: {
    flexDirection: "row",
    alignItems: "center"
    // marginBottom: 15
  },
  icon: {
    marginRight: 5,
    color: "#5B5E66"
  }
})
