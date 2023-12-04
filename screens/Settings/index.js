import React, { useState, useEffect, useCallback } from "react"
import {
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import * as authApiService from "../../store/custom/auth/api"

import { Colors, Typography, Mixins } from "../../styles"
import { ConfirmationModal, Header, HorizontalLine } from "../../components"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { clearStorage } from "../../utils/storage"
import { setAuth } from "../../store/custom/auth/auth.slice"

const { width, height } = Dimensions.get("window")

const Settings = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()

  const { user, api } = useSelector(state => state.Auth)

  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)


  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const logoutUser = async () => {
    await clearStorage()
    await dispatch(setAuth(false)).unwrap()
  }

  const deleteUserAccountPressed = async () => {
    setLoading(true)
    try {
      await authApiService.apiService.deleteUser()
      setLoading(false)
      setShowDeleteSuccessModal(true)
    } catch (error) {
      setShowDeleteSuccessModal(true)
      setLoading(false)
    }
  }

  const settingsTabs = [
    {
      icon: require("../../assets/settings/privacy.png"),
      title: "Privacy Policy",
      onPress: () => navigation.navigate("PrivacyPolicy")
    },
    {
      icon: require("../../assets/settings/terms.png"),
      title: "Terms and Conditions",
      onPress: () => navigation.navigate("TermsAndConditionsScreen")
    },
    {
      icon: require("../../assets/settings/changePassword.png"),
      title: "Change Password",
      onPress: () => navigation.navigate("ChangePasswordScreen")
    },
    {
      icon: require("../../assets/settings/support.png"),
      title: "Support/Send Feedback",
      onPress: () => navigation.navigate("supportFeedback")
    },
    {
      icon: require("../../assets/settings/delete.png"),
      title: "Delete Account",
      onPress: () => setShowDeleteModal(true)
    },
    {
      icon: require("../../assets/settings/logout.png"),
      title: "Log Out",
      onPress: async () => {
        setShowModal(true)
      }
    }
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_BG }}>
      <Header bigHeader={"Profile"} />

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: "5%",
          marginVertical: "7%"
        }}
      >
        <Image
          style={{
            borderWidth: 0.2,
            width: 60,
            height: 60,
            borderRadius: 1000
          }}
          source={user.profile_image ? { uri: user.profile_image } : require("../../assets/image_placeholder.png")}
        />
        <View style={{ marginHorizontal: "3%", flex: 1 }}>
          <Text
            style={{
              color: Colors.LIGHT_ON_SURFACE,
              fontSize: Typography.FONT_SIZE_22,
              fontWeight: Typography.FONT_WEIGHT_500,
              marginBottom: "1%"
            }}
          >
            {user.full_name}
          </Text>
          <Text
            style={{
              color: "#5B5E66",
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_400,
              marginBottom: "1%"
            }}
          >
            {user.phone_number}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: 14, height: 14 }}
              resizeMode="contain"
              source={require("../../assets/distance.png")}
            />
            <Text
              style={{
                color: "#5B5E66",
                fontSize: Typography.FONT_SIZE_12,
                fontWeight: Typography.FONT_WEIGHT_500
              }}
            >{`${user.cityData?.name || ""},${user.stateData?.name || ""},${
              user.zip_code
            }`}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.LIGHT_SECONDARY,
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 40
          }}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <Text
            style={{
              marginHorizontal: "5%",
              marginVertical: "15%",
              color: "#121C2B",
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_500
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: "90%", alignSelf: "center" }}>
        <HorizontalLine />
      </View>

      <Text
        style={{
          marginTop: "2%",
          marginHorizontal: "5%",
          color: "#5B5E66",
          fontSize: Typography.FONT_SIZE_14,
          fontWeight: Typography.FONT_WEIGHT_BOLD
        }}
      >
        Account Settings
      </Text>

      <ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.WHITE,
            flexDirection: "row",
            marginVertical: "2%",
            marginHorizontal: "5%",
            alignItems: "center",
            borderRadius: 10
          }}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Image
            style={{
              width: 24,
              height: 24,
              marginHorizontal: "5%",
              marginVertical: "4%"
            }}
            resizeMode="contain"
            source={require("../../assets/notifications.png")}
          />
          <Text
            style={{
              flex: 1,
              color: Colors.LIGHT_ON_SURFACE,
              fontSize: Typography.FONT_SIZE_16,
              fontWeight: Typography.FONT_WEIGHT_400
            }}
          >
            {"Notifications"}
          </Text>

          <Image
            style={{ width: 24, height: 24, marginRight: "5%" }}
            resizeMode="contain"
            source={require("../../assets/settings/movenext.png")}
          />
        </TouchableOpacity>

        {settingsTabs.map(item => {
          return (
            <TouchableOpacity
              onPress={item.onPress}
              style={{
                backgroundColor: Colors.WHITE,
                flexDirection: "row",
                marginVertical: "2%",
                marginHorizontal: "5%",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Image
                style={{
                  width: 24,
                  height: 24,
                  marginHorizontal: "5%",
                  marginVertical: "4%"
                }}
                resizeMode="contain"
                source={item.icon}
              />
              <Text
                style={{
                  flex: 1,
                  color: Colors.LIGHT_ON_SURFACE,
                  fontSize: Typography.FONT_SIZE_16,
                  fontWeight: Typography.FONT_WEIGHT_400
                }}
              >
                {item.title}
              </Text>

              <Image
                style={{ width: 24, height: 24, marginRight: "5%" }}
                resizeMode="contain"
                source={require("../../assets/settings/movenext.png")}
              />
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      {loading && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(233, 231, 235, 0.5)",
            alignItems: "center",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color={Colors.PRIMARY_50} />
        </View>
      )}
      <ConfirmationModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        header={"Are you sure you want to logout from this device?"}
        type={"confirmation"}
        onConfirmation={() => logoutUser()}
      />

      <ConfirmationModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        header={"Are you sure you want to delete?"}
        type={"confirmation"}
        secondConfirmationText={"Delete"}
        onConfirmation={() => {
          deleteUserAccountPressed()
          setShowDeleteModal(false)
        }}
      />

      <ConfirmationModal
        isVisible={showDeleteSuccessModal}
        onClose={() => {
          setShowDeleteSuccessModal(false)
          logoutUser()
        }}
        header={"Successfully removed/ Deleted"}
        icon={require("../../assets/success_icon.png")}
        type={"success"}
      />
    </SafeAreaView>
  )
}

export default Settings
