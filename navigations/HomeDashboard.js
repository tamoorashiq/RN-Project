import React, { useContext } from "react"
import { View, Image, Text, StyleSheet, Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Colors, Typography } from "./../styles"
import HomeStackScreen from "./HomeNavigator"
import MyItemsStackScreen from "./MyPoductsNavigator"
import {useGuestUser} from "./../customHooks/useGuestUser"
import { useNavigation, useRoute } from "@react-navigation/native"
import { LoginModal } from "./../components"
import { UserProfile, MessagesListing, HomeScreen, MyItems } from "./../screens"

const Tab = createBottomTabNavigator()

const HomeNavigator = () => {
  const navigation = useNavigation()

  const { isGuestUser, setGuestUser } = useGuestUser()
  const [showLoginModal, setShowLoginModal] = React.useState(false)

  const handleTabPress = tabName => {
    if (isGuestUser) {
      console.log("Its a guest USER")
      setShowLoginModal(true)
    } else {
      navigation.navigate(tabName)
    }
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          tabBarStyle: {
            maxHeight: Platform.OS === "ios" ? "10%" : "7%",
            flex: 1,
            backgroundColor: Colors.WHITE,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#3077D0",
            shadowOffset: {
              width: 0,
              height: 10
            },
            // paddingVertical: 20,

            shadowOpacity: 0.1,
            shadowRadius: 60,
            elevation: 8
          }
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          tabBarLabelStyle={{
            color: Colors.WHITE
          }}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: Colors.LIGHT_ON_SURFACE,
                  fontSize: Typography.FONT_SIZE_12,
                  fontWeight: Typography.FONT_WEIGHT_500,
                  marginBottom: 3
                }}
              >
                Home
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <View
                style={focused ? styles.iconFocused : styles.iconNotFocused}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("./../assets/home.png")}
                />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="MyItems"
          component={MyItems}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              e.preventDefault() // Prevent default navigation behavior
              handleTabPress("MyItems")
            }
          })}
          tabBarLabelStyle={{
            color: Colors.WHITE
          }}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: Colors.LIGHT_ON_SURFACE,
                  fontSize: Typography.FONT_SIZE_12,
                  fontWeight: Typography.FONT_WEIGHT_500,
                  marginBottom: 3
                }}
              >
                My Items
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <View
                style={focused ? styles.iconFocused : styles.iconNotFocused}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("./../assets/myItems.png")}
                />
              </View>
            )
          }}
        />

        <Tab.Screen
          name="Messages"
          component={MessagesListing}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              e.preventDefault() // Prevent default navigation behavior
              handleTabPress("Messages")
            }
          })}
          tabBarLabelStyle={{
            color: Colors.WHITE
          }}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: Colors.LIGHT_ON_SURFACE,
                  fontSize: Typography.FONT_SIZE_12,
                  fontWeight: Typography.FONT_WEIGHT_500,
                  marginBottom: 3
                }}
              >
                Messages
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <View
                style={focused ? styles.iconFocused : styles.iconNotFocused}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("./../assets/chat_bubble.png")}
                />
              </View>
            )
          }}
        />
      </Tab.Navigator>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  )
}

export default HomeNavigator

const styles = StyleSheet.create({
  iconFocused: {
    backgroundColor: Colors.LIGHT_SECONDARY,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 20
  },
  iconNotFocused: {
    marginTop: 20,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    marginBottom: 20
  }
})
