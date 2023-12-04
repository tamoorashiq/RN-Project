import { useNavigation } from "@react-navigation/native"
import { useGuestUser } from "../../customHooks/useGuestUser"

import React, { useEffect } from "react"
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native"
import { Colors, Typography, Mixins } from "../../styles"

const height = Dimensions.get("window").height

const LoginModal = ({ isVisible, onClose, icon = null }) => {
  const { isGuestUser, setGuestUser } = useGuestUser()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          backgroundColor: Colors.BLACK,
          opacity: 0.3,
          height: "100%",
          width: "100%",
          position: "absolute"
        }}
      />

      <View
        style={{
          // flex: 1,
          //   justifyContent: "center",
          backgroundColor: "rgba(233, 231, 235, 1)",
          alignItems: "center",
          width: "80%",
          alignSelf: "center",
          top: height * 0.3,
          borderRadius: 20
          // height: "35%"
        }}
      >
        <Image
          style={{ width: 50, height: 50, marginVertical: "7%" }}
          source={require("../../assets/settings/privacy.png")}
        />
        <Text
          style={{
            marginHorizontal: "10%",
            marginTop: icon ? 0 : "5%",
            color: "rgba(26, 28, 30, 1)",
            fontSize: Typography.FONT_SIZE_24,
            fontWeight: Typography.FONT_WEIGHT_500
          }}
        >
          {"Need To Login"}
        </Text>
        <Text
          style={{
            marginVertical: "8%",
            marginHorizontal: "10%",
            lineHeight: 20,
            color: "rgba(91, 94, 102, 1)",
            fontSize: Typography.FONT_SIZE_14,
            fontWeight: Typography.FONT_WEIGHT_BOLD
          }}
        >
          {
            "Please login/signup to use all features of app. Guest features are limited to view the application"
          }
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginHorizontal: "5%"
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginVertical: "10%",
              borderRadius: 100,
              alignItems: "center",
              marginRight: "5%",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                marginVertical: "10%",
                marginHorizontal: "7%",
                color: Colors.PRIMARY_50,
                fontSize: Typography.FONT_SIZE_12,
                fontWeight: Typography.FONT_WEIGHT_BOLD
              }}
            >
              {"Cancel"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setGuestUser(false)
              onClose()
            }}
            style={{
              marginVertical: "10%",
              backgroundColor: Colors.LIGHT_ERROR,
              borderRadius: 100,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                marginVertical: "7%",
                marginHorizontal: "7%",
                lineHeight: 20,
                color: Colors.WHITE,
                fontSize: Typography.FONT_SIZE_12,
                fontWeight: Typography.FONT_WEIGHT_BOLD
              }}
            >
              {"Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default LoginModal
