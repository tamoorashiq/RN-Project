import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Input, Button, ConfirmationModal } from "./../../components"

import React, { useState, useEffect } from "react"
import { signup } from "../../store/custom/auth/auth.slice"
import * as AuthAPIs from "../../store/custom/auth/api"
import {useGuestUser} from "../../customHooks/useGuestUser"

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native"
import { Colors, Typography } from "./../../styles"
import { validateEmail, validatePassword } from "./../../utils/common"
import { setDataStorage } from "../../utils/storage"

const SignupScreen = () => {
  const navigation = useNavigation()
  const { isGuestUser, setGuestUser } = useGuestUser()
  const dispatch = useDispatch()
  const { user, api } = useSelector(state => state.Auth)

  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  useEffect(async () => {}, [])

  useEffect(async () => {
    console.log("user", user)
  }, [user])

  const signupPressed = async () => {
    if (!validateEmail(email)) {
      setPasswordError(null)
      setEmailError("Enter a valid email address")
      return
    }

    const passwordValidation = validatePassword(password)
    if (passwordValidation) {
      setEmailError(null)
      setPasswordError(passwordValidation)
      return
    }

    setEmailError(null)
    setPasswordError(null)

    try {
      const resp = await dispatch(
        signup({ email, password, is_read_terms: true })
      ).unwrap()
      console.log("resp", resp)
    } catch (error) {
      console.log("error", error)
      if (error?.message) {
        const err = JSON.parse(error?.message)
        if (err["email"]) {
          setPasswordError(null)
          setEmailError(err["email"])
          return
        } else if (err["password"]) {
          setEmailError(null)
          setPasswordError(err["password"])
          return
        }
      } else {
        console.log("error", error)
        return
      }
    }

    const resp = await AuthAPIs.apiService.login({ email, password })
    if (resp.key) {
      setDataStorage("@key", resp.key)
      navigation.navigate("UserProfile")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.subContainer}>
            <Text style={styles.headerText}>Sign up</Text>

            <Input
              width={"100%"}
              onChangeText={value => setEmail(value)}
              value={email}
              placeholder="Email"
              header="Email"
              error={emailError}
            />

            <Input
              width={"100%"}
              onChangeText={value => setPassword(value)}
              value={password}
              placeholder="Create Password"
              // header="Password"
              error={passwordError}
              secureTextEntry={!visiblePassword}
              iconRight={
                <Ionicons
                  name={visiblePassword ? "eye" : "eye-off"}
                  size={20}
                  color={Colors.LIGHT_ON_SURFACE}
                />
              }
              iconRightClick={() => setVisiblePassword(!visiblePassword)}
            />

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: "3%"
              }}
            >
              <Text
                style={{
                  lineHeight: 22.5,
                  fontSize: Typography.FONT_SIZE_14,
                  fontWeight: Typography.FONT_WEIGHT_400,
                  fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR
                }}
              >
                By signing up I accept the
                <TouchableOpacity
                  onPress={() => navigation.navigate("Terms")}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: -30
                  }}
                >
                  <Text
                    style={{
                      fontSize: Typography.FONT_SIZE_14,
                      fontWeight: Typography.FONT_WEIGHT_400,
                      textDecorationLine: "underline",
                      color: Colors.LIGHT_PRIMARY
                    }}
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: Typography.FONT_SIZE_14,
                    fontWeight: Typography.FONT_WEIGHT_400,
                    fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR
                  }}
                >
                  {" "}
                  and{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("PrivacyPolicy")}
                >
                  <Text
                    style={{
                      fontSize: Typography.FONT_SIZE_14,
                      fontWeight: Typography.FONT_WEIGHT_400,
                      fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
                      textDecorationLine: "underline",
                      color: Colors.LIGHT_PRIMARY
                    }}
                  >
                    Privacy policy.{" "}
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
            <Button
              loading={api.loading === "pending"}
              onPress={() => signupPressed()}
              dark={true}
            >
              Sign Up
            </Button>
          </View>
          <View
            style={{
              marginHorizontal: "5%",
              marginBottom: "5%"
            }}
          >
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ textDecorationLine: "underline" }}>Log In</Text>
              </TouchableOpacity>
            </View>
            <Button
              onPress={() => {
                setGuestUser(true)
              }}
              dark={false}
            >
              Continue as a guest
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: "35%"
  },
  headerText: {
    fontSize: Typography.FONT_SIZE_32,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
    marginVertical: "5%"
  },
  bottomContainer: {
    // flex: 1,
    marginHorizontal: "5%",
    marginBottom: "5%",
    justifyContent: "flex-end"
  }
})
export default SignupScreen
