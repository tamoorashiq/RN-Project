import React, { useContext } from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { MyItems, AddProduct } from "../screens"
const Stack = createStackNavigator()

// Create a stack navigator for the "MyItems" tab
const MyItemsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyItems"
        component={MyItems}
        options={{ headerShown: false }}
      />
      {/* Add any other screens you want to navigate to from "MyItems" without the bottom tab bar */}
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerShown: false }} // Show header for this screen if needed
      />
    </Stack.Navigator>
  )
}

export default MyItemsStackScreen
