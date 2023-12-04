import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

// screens
import {
  SignupScreen,
  LoginScreen,
  PrivacyPolicy,
  TermsNConditions,
  ForgotPassword,
  UserProfile,
  ResetPassword
} from "./../screens"

import HomeNavigator from "./HomeDashboard"

const authStack = createStackNavigator()

const AuthStackScreen = () => (
  <authStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="AuthMain"
  >
    <authStack.Screen name="AuthMain" component={LoginScreen} />
    <authStack.Screen name="Signup" component={SignupScreen} />
    <authStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <authStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <authStack.Screen name="Terms" component={TermsNConditions} />
    <authStack.Screen name="UserProfile" component={UserProfile} />
    <authStack.Screen name="ResetPassword" component={ResetPassword} />
    <authStack.Screen name="Home" component={HomeNavigator} />
  </authStack.Navigator>
)

export default AuthStackScreen
