import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useSelector, useDispatch } from "react-redux"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
//import {createDrawerNavigator} from '@react-navigation/drawer';
import { navigationRef } from "./NavigationService"

import AuthStackScreen from "./AuthNavigator"
import HomeNavigator from "./HomeDashboard"
import {
  getStates,
  getTermsNConditions,
  getPrivacyPolicy
} from "./../store/custom/appStart/appStart.slice"
import { getDataStorage } from "../utils/storage"
import auth from "@react-native-firebase/auth"

import WelcomeScreen from "./../screens/WelcomeScreen"
import { getProfile, setAuth } from "./../store/custom/auth/auth.slice"
import {
  AddProduct,
  EditProduct,
  MyProductDetails,
  OwnerProfileView,
  PrivacyPolicy,
  ProductDetails,
  ProductReport,
  Settings,
  UserProfile,
  supportFeedback,
  ChangePasswordScreen
} from "../screens"
import TermsAndConditionsScreen from "../screens/terms-and-conditions"
import ChatRoom from "../screens/ChatRoom"
import useNotification from "../utils/notificationInit"
import messaging from "@react-native-firebase/messaging"
import { addNotificationDevice } from "../store/custom/notification/notification.slice"
import { Alert, Platform } from "react-native"
import { useGuestUser } from "./../customHooks/useGuestUser"
import NotificationsList from "../screens/NotificationsList"
import PushNotification from "react-native-push-notification"

const authStack = createStackNavigator()
const homeStack = createStackNavigator()

const RootNavigationStack = props => {
  const { isAuth, user } = props
  const { isGuestUser, setGuestUser } = useGuestUser()
  const dispatch = useDispatch()
  useNotification()

  const [isLoadingData, setIsLoadingData] = useState(true)

  const [userAuthKey, setUserAuthKey] = useState(null)

  useEffect(async () => {
    // clearStorage()
    const authKey = await getDataStorage("@key")
    if (authKey) {
      await dispatch(getProfile()).unwrap()
      await dispatch(setAuth(true)).unwrap()
      setUserAuthKey(authKey)
    } else {
      setUserAuthKey(null)
    }

    setIsLoadingData(false)
  }, [isAuth])

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      // console.log(user, 'USER');
      if (!user) {
        handleFirebaseAuth()
      } else {
      }
    })
    requestUserPermission()
  }, [user?.user])
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage?.notification, "remoteMessage")
      const route = navigationRef?.current?.getCurrentRoute()
      if (route?.params?.chatroom?.id !== remoteMessage?.data?.click_action) {
        const { name, params } = route
        console.log(`Current Route Name: ${name}`)
        console.log(`Route Params:`, params)
        const notificationObj = {
          channelId: "fcm_fallback_notification_channel",
          message: remoteMessage?.notification?.body,
          title: remoteMessage?.notification?.title,
          data: remoteMessage?.data
        }
        PushNotification.localNotification(notificationObj)
        // PushNotification.localNotification({
        //   channelId: "fcm_fallback_notification_channel",
        //   ...remoteMessage
        // })
      }
      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage))
    })

    PushNotification.createChannel(
      {
        channelId: "fcm_fallback_notification_channel", // Unique channel ID
        channelName: "Background Notifications"
      },
      () => {}
    )

    return unsubscribe
  }, [])
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      handleNotification()
      console.log("Authorization status:", authStatus)
    }
  }
  const handleFirebaseAuth = async () => {
    try {
      const user = await auth().signInAnonymously()
    } catch (err) {
      console.log(err, "ERROR_WHILE_FIREBASE_LOGIN")
    }
  }

  const handleNotification = async () => {
    try {
      setTimeout(() => {
        //  await messaging().setAPNSToken("test")
        messaging()
          .getToken()
          .then(async token => {
            await dispatch(
              addNotificationDevice({
                name: "",
                registration_id: token,
                device_id: token,
                active: true,
                type: Platform.OS
              })
            ).unwrap()
            console.log("fire", token)
          })
          .catch(console.log)
      }, 2000)
    } catch (error) {
      console.log("fire", error)
    }
  }
  useEffect(async () => {
    await dispatch(getStates()).unwrap()
    await dispatch(getTermsNConditions()).unwrap()
    await dispatch(getPrivacyPolicy()).unwrap()
  }, [])

  useEffect(() => {
    // This code will run whenever isGuestUser changes
    console.log("Guest user status changed:", isGuestUser)

    // You can perform any additional actions here
  }, [isGuestUser])

  return isLoadingData ? (
    <WelcomeScreen />
  ) : (
    <NavigationContainer ref={navigationRef}>
      {isAuth || (userAuthKey && userAuthKey.length > 0) || isGuestUser ? (
        <homeStack.Navigator screenOptions={{ headerShown: false }}>
          <homeStack.Screen name="HomeDashboard" component={HomeNavigator} />
          <homeStack.Screen name="AddProduct" component={AddProduct} />
          <homeStack.Screen name="ChatRoom" component={ChatRoom} />
          <homeStack.Screen
            name="Notifications"
            component={NotificationsList}
          />
          <homeStack.Screen name="ProductDetails" component={ProductDetails} />
          <homeStack.Screen
            name="MyProductDetails"
            component={MyProductDetails}
          />
          <homeStack.Screen
            name="OwnerProfileView"
            component={OwnerProfileView}
          />
          <homeStack.Screen name="EditProduct" component={EditProduct} />
          <homeStack.Screen name="Settings" component={Settings} />
          <homeStack.Screen
            name="TermsAndConditionsScreen"
            component={TermsAndConditionsScreen}
          />
          <homeStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <homeStack.Screen name="UserProfile" component={UserProfile} />
          <homeStack.Screen
            name="supportFeedback"
            component={supportFeedback}
          />
          <homeStack.Screen name="ProductReport" component={ProductReport} />
          <homeStack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
          />
        </homeStack.Navigator>
      ) : (
        <authStack.Navigator screenOptions={{ headerShown: false }}>
          <authStack.Screen name="AuthStack" component={AuthStackScreen} />
        </authStack.Navigator>
      )}
    </NavigationContainer>
  )
}

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuth,
  user: state.Auth.user
})

export default connect(mapStateToProps, null)(RootNavigationStack)
