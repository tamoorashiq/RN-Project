import React, { useState, useEffect } from "react"

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity
} from "react-native"

import { useNavigation, useRoute } from "@react-navigation/native"

import {
  Input,
  Button,
  Header,
  OTPInput,
  ConfirmationModal
} from "./../../components"
import { Colors, Typography, Mixins } from "./../../styles"
import * as authApiService from "../../store/custom/auth/api"
import { validateEmail, validatePassword } from "./../../utils/common"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import Ionicons from "react-native-vector-icons/Ionicons"

const ResetPassword = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)
  const [error, setError] = useState(false)

  const [passwordError, setPasswordError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { email, otp } = route.params
  const continuePressed = async () => {
    const passwordValidation = validatePassword(password)
    if (passwordValidation) {
      setPasswordError(passwordValidation)
      return
    }

    setPasswordError(null)

    setIsLoading(true)
    try {
      const resp = await authApiService.apiService.confirmResetPassword({
        new_password1: password,
        new_password2: confirmPassword,
        email: email,
        otp
      })

      if (resp.detail) {
        setShowModal(true)
      }
    } catch (err) {
      if (err?.non_field_errors) {
        if (err?.non_field_errors[0] === "password1 and password2 didn't match")
          setError("Both Passwords didn't match")
        else setError(err?.non_field_errors[0])
      }
      if (err["new_password2"]) setError(err["new_password2"])
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.subContainer}>
        <Text style={styles.headerText}>{"Reset Password"}</Text>

        <Text
          style={{
            marginBottom: "5%",
            lineHeight: 24,
            fontSize: Typography.FONT_SIZE_16,
            fontWeight: Typography.FONT_WEIGHT_400,
            color: Colors.LIGHT
          }}
        >
          {"Enter a new password to continue."}
        </Text>

        <Input
          width={"100%"}
          onChangeText={value => setPassword(value)}
          value={password}
          placeholder="Password"
          header="Password"
          secureTextEntry={!visiblePassword}
          iconRight={
            <Ionicons
              name={visiblePassword ? "eye" : "eye-off"}
              size={20}
              color={Colors.LIGHT_ON_SURFACE}
            />
          }
          iconRightClick={() => setVisiblePassword(!visiblePassword)}
          error={passwordError}
        />

        <Input
          width={"100%"}
          onChangeText={value => setConfirmPassword(value)}
          value={confirmPassword}
          placeholder="Confirm Password"
          header="Confirm Password"
          secureTextEntry={!visibleConfirmPassword}
          iconRight={
            <Ionicons
              name={visibleConfirmPassword ? "eye" : "eye-off"}
              size={20}
              color={Colors.LIGHT_ON_SURFACE}
            />
          }
          iconRightClick={() =>
            setVisibleConfirmPassword(!visibleConfirmPassword)
          }
          error={error}
        />

        <Button
          loading={isLoading}
          disabled={false}
          onPress={() => continuePressed()}
          dark={true}
        >
          Change Password
        </Button>
      </View>

      <ConfirmationModal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false)
          navigation.pop(2)
        }}
        header={"Success"}
        description={
          "Your password has been changes. Use your new password to login to Swapster"
        }
        icon={require("../../assets/EmailSentIcon.png")}
        type={"success"}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BG
  },
  subContainer: {
    flex: 1,
    marginHorizontal: "5%",
    marginTop: "20%"
  },
  headerText: {
    fontSize: Typography.FONT_SIZE_32,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
    marginTop: "5%"
  },
  otpInput: {
    width: 53,
    height: 56,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "gray",
    color: Colors.LIGHT_ON_SURFACE,
    fontSize: Typography.FONT_SIZE_22

    // marginHorizontal: 8
  },
  otpInputHighlight: {
    borderColor: Colors.LIGHT_PRIMARY
  }
})
export default ResetPassword
