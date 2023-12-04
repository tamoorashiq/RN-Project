import React, { useState, useEffect } from "react"
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native"
import { useSelector, useDispatch } from "react-redux"

import { Colors, Typography } from "../../styles"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import { clearStorage } from "../../utils/storage"
import { setAuth } from "./../../store/custom/auth/auth.slice"
import { useGuestUser } from "./../../customHooks/useGuestUser"

const TopAppBar = ({}) => {
  const navigation = useNavigation()
  const { isGuestUser, setGuestUser } = useGuestUser()

  const dispatch = useDispatch()

  const { user, api } = useSelector(state => state.Auth)

  return (
    <View
      style={{
        marginTop: "3%",
        marginHorizontal: "5%",
        marginBottom: "7%",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Image
        style={{ width: 40, height: 40 }}
        source={require("../../assets/headerIcon.png")}
      />

      <Text
        style={{
          marginLeft: "3%",
          flex: 1,
          fontSize: Typography.FONT_SIZE_22,
          color: Colors.LIGHT_ON_SURFACE,
          fontWeight: Typography.FONT_WEIGHT_500
        }}
      >
        SWAPSTER
      </Text>

      <TouchableOpacity
        disabled={isGuestUser}
        style={{ marginRight: "3%" }}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../../assets/notifications.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isGuestUser}
        onPress={() => navigation.navigate("Settings")}
        style={{ borderRadius: 1000, borderWidth: 0.1, marginHorizontal: "3%" }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 10000,
            borderWidth: 0.05
          }}
          source={
            user && user.profile_image 
              ? { uri: user?.profile_image }
              : require("../../assets/image_placeholder.png")
          }
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BG,
    padding: 20,
    paddingHorizontal: 30
  }
})
export default TopAppBar
