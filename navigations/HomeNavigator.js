import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

// screens
import { HomeScreen, ProductDetails } from "./../screens"

const homeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <homeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <homeStack.Screen name="HomeScreen" component={HomeScreen} />
      <homeStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={() => ({
          tabBarStyle: {
            display: "none"
          },
          tabBarButton: () => null
        })}
      />
    </homeStack.Navigator>
  )
}

export default HomeStackScreen
