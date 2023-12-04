import React, { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"
import { Input, Button, Header, OTPInput } from "./../../components"
import { Colors, Typography, Mixins } from "./../../styles"
import * as authApiService from "../../store/custom/auth/api"
import { validateEmail, validatePassword } from "./../../utils/common"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const PIN_COUNT = 6
const ForgotPassword = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState()
  const [emailError, setEmailError] = useState(null)
  const [showOtpView, setShowOtpView] = useState(false)
  const [otpCode, setOtpCode] = useState()
  const [otpError, setOtpError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const continuePressed = async () => {
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address")
      return
    }

    setEmailError(null)
    setIsLoading(true)

    const resp = await authApiService.apiService.resetPassword({ email })
    if (resp && resp.detail) {
      switch (resp.detail) {
        case "Password reset e-mail has been sent.":
          setShowOtpView(true)
          setIsLoading(false)

          break
        case "Email Does not exists":
          setEmailError(resp.detail)
          setIsLoading(false)
          break
        default:
          setIsLoading(false)
          setEmailError(resp.detail)
          break
      }
    }
  }

  const verifyUserOtp = async () => {
    try {
      setIsLoading(true)
      setOtpError(null)
      await authApiService.apiService.validateOtp({
        email,
        otp: otpCode
      })
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      if (error.detail) {
        setOtpError(error.detail)
        console.log("error is ", error)
      } else {
        setOtpError("Something is not right! Try again later")
      }
      return false
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAwareScrollView style={styles.subContainer}>
        <Text style={styles.headerText}>
          {showOtpView ? "Enter Code" : "Reset Password"}
        </Text>

        <Text
          style={{
            // marginBottom: "5%",
            lineHeight: 24,
            fontSize: Typography.FONT_SIZE_16,
            fontWeight: Typography.FONT_WEIGHT_400,
            color: Colors.LIGHT
          }}
        >
          {showOtpView
            ? "Enter OTP that was sent to your email."
            : "We will send you email with OTP to reset your password."}
        </Text>

        {!showOtpView && (
          <View style={{ marginTop: "5%" }}>
            <Input
              width={"100%"}
              onChangeText={value => setEmail(value)}
              value={email}
              placeholder="Email"
              header="Email"
              error={emailError}
            />
          </View>
        )}

        {showOtpView && (
          <View style={{ flex: 1, marginVertical: "7%" }}>
            <OTPInputView
              style={{}}
              pinCount={PIN_COUNT}
              autoFocusOnLoad
              code={otpCode}
              codeInputFieldStyle={styles.otpInput}
              codeInputHighlightStyle={styles.otpInputHighlight}
              onCodeChanged={value => setOtpCode(value)}
            />
            {otpError && (
              <Text
                style={{
                  marginTop: "1%",
                  marginLeft: "2%",
                  textAlign: "left",
                  fontSize: Typography.FONT_SIZE_12,
                  color: Colors.LIGHT_ERROR
                }}
              >
                {otpError}
              </Text>
            )}
          </View>
        )}

        {showOtpView && (
          <TouchableOpacity
            style={{ marginBottom: "5%" }}
            onPress={async () =>
              await authApiService.apiService.regenerateOTP({ email })
            }
          >
            <Text
              style={{
                color: Colors.LIGHT_PRIMARY,
                fontSize: Typography.FONT_SIZE_14
              }}
            >
              Resend Code
            </Text>
          </TouchableOpacity>
        )}

        <View style={{}}>
          <Button
            loading={isLoading}
            disabled={otpCode?.length != PIN_COUNT && showOtpView}
            onPress={async () => {
              if (showOtpView) {
                if (await verifyUserOtp())
                  navigation.navigate("ResetPassword", {
                    otp: otpCode,
                    email
                  })
              } else {
                continuePressed()
              }
            }}
            dark={true}
          >
            Continue
          </Button>
        </View>
      </KeyboardAwareScrollView>
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
    // fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
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
export default ForgotPassword
