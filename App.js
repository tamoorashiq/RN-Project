import React, { useContext, useState, useEffect } from "react"
import { Provider } from "react-redux"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import NavigatorProvider from "./navigations"

import { createStackNavigator } from "@react-navigation/stack"
import {
  configureStore,
  createReducer,
  combineReducers
} from "@reduxjs/toolkit"
import { screens } from "@screens"
import { modules, reducers, hooks, initialRoute } from "@modules"
import { connectors } from "@store"
const Stack = createStackNavigator()
import { GlobalOptionsContext, OptionsContext, getOptions } from "@options"
import { clearStorage } from "./utils/storage"
import { GuestUserProvider } from "./customHooks/useGuestUser"
import WelcomeScreen from "./screens/WelcomeScreen"

const getNavigation = (modules, screens, initialRoute) => {
  const Navigation = () => {
    const routes = modules.concat(screens).map(mod => {
      console.log("mod ", mod)
      const pakage = mod.package
      const name = mod.value.title
      const Navigator = mod.value.navigator

      const Component = props => {
        return (
          <OptionsContext.Provider value={getOptions(pakage)}>
            <Navigator {...props} />
          </OptionsContext.Provider>
        )
      }

      return <Stack.Screen key={name} name={name} component={Component} />
    })
    const screenOptions = {
      headerShown: false
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={screenOptions}
        >
          {routes}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return Navigation
}

const getStore = globalState => {
  const appReducer = createReducer(globalState, _ => {
    return globalState
  })
  const reducer = combineReducers({
    app: appReducer,
    ...reducers,
    ...connectors
  })
  return configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
  })
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // clearStorage()
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const renderLoading = () => <WelcomeScreen />
  const renderApp = () => (
    <GuestUserProvider>
      <Provider store={store}>
        <NavigatorProvider />
      </Provider>
    </GuestUserProvider>
  )

  const global = useContext(GlobalOptionsContext)
  const Navigation = getNavigation(modules, screens, initialRoute)
  const store = getStore(global)
  let effects = {}
  hooks.map(hook => {
    effects[hook.name] = hook.value()
  })

  return isLoading ? renderLoading() : renderApp()
}

export default () => <App />
