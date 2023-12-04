import { useEffect } from "react"
import PushNotification from "react-native-push-notification"

import { navigate } from "./../navigations/NavigationService"
import { useSelector } from "react-redux"
const useNotification = () => {
  const user = useSelector(state => state?.Auth?.user)
  useEffect(() => {
    if (user) {
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: async function (token) {
          console.log("TOKEN::", token)
        },

        onNotification: function (notification) {
          console.log("notificationREF", notification)
          if (notification?.foreground && !notification?.userInteraction) {
            // The notification was received while the app was in the foreground.
            // You can handle it accordingly, e.g., show a local notification, update UI, etc.
          } else {
            // The app was in the background when the notification arrived, and the user
            // tapped on it to open the app.
            // You can navigate to a specific screen or handle it as needed.
            if (notification?.data?.click_action) {
              navigate("ChatRoom", {
                chatroom: notification?.data?.click_action
              })
            }
          }
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log("ACTION:", notification.action)
          console.log("NOTIFICATION:", notification)

          // process the action
        },

        onRegistrationError: function (err) {
          console.log(err.message, err)
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
        requestPermissions: true
      })
    }
  }, [user])
}

export default useNotification
