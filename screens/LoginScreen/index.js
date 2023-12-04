import { useNavigation } from "@react-navigation/native"
import { getProfile, login } from "../../store/custom/auth/auth.slice"
import { useSelector, useDispatch } from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Input, Button } from "./../../components"
import { validateEmail } from "./../../utils/common"

import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native"
import { Colors, Typography } from "./../../styles"
import {useGuestUser} from "../../customHooks/useGuestUser"

const LoginScreen = () => {
  const navigation = useNavigation()
  const { isGuestUser, setGuestUser } = useGuestUser()
  const dispatch = useDispatch()
  const { user, api } = useSelector(state => state.Auth)

  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  useEffect(async () => {
    console.log("user", user)
  }, [user])

  const loginPressed = async () => {
    if (!validateEmail(email)) {
      setPasswordError(null)
      setEmailError("Enter a valid email address")
      return
    }

    if (!password || password.length === 0) {
      setEmailError(null)
      setPasswordError("This field is required")
      return
    }

    setEmailError(null)
    setPasswordError(null)
    try {
      const resp = await dispatch(login({ email, password })).unwrap()
      await dispatch(getProfile()).unwrap()

      console.log("resp", resp)
    } catch (error) {
      console.log("error", error)
      if (error?.message) {
        const err = JSON.parse(error?.message)
        if (err["email"]) {
          setPasswordError(null)
          setEmailError(err["email"])
        } else if (err["password"]) {
          setEmailError(null)
          setPasswordError(err["password"])
        } else if (err["non_field_errors"]) {
          setEmailError(err["non_field_errors"])
          setPasswordError(null)
        }
      } else {
        console.log("error", error)
      }
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
            <Text style={styles.headerText}>Log in</Text>

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
              placeholder="Password"
              header="Password"
              secureTextEntry={!visiblePassword}
              error={passwordError}
              iconRight={
                <Ionicons
                  name={visiblePassword ? "eye" : "eye-off"}
                  size={20}
                  color={Colors.LIGHT_ON_SURFACE}
                />
              }
              iconRightClick={() => setVisiblePassword(!visiblePassword)}
            />

            <Button
              loading={api.loading === "pending"}
              // disabled={!email || !password}
              onPress={() => loginPressed()}
              dark={true}
            >
              Login
            </Button>

            <TouchableOpacity
              style={{ alignItems: "center", marginTop: "10%" }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{ lineHeight: 20, textDecorationLine: "underline" }}>
                Forgot Password{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text style={{ lineHeight: 20 }}>Don’t Have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
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

export default LoginScreen
