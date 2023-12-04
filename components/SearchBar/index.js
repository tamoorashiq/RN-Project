import React, { useState, useEffect } from "react"
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native"
import { Colors, Typography } from "../../styles"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "react-native-vector-icons/Ionicons"

const { width, height } = Dimensions.get("window")

const SearchBar = ({ searchValue, setSearchValue }) => {
  const navigation = useNavigation()

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.LIGHT_SURFACE,
        borderRadius: 20,
        alignItems: "center"
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchValue}
        onChangeText={setSearchValue}
      />

      <Ionicons
        style={{ marginRight: "5%", color: "#5B5E66" }}
        name={"search"}
        size={20}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BG,
    padding: 20,
    paddingHorizontal: 30
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: "5%",
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_400
  }
})
export default SearchBar
