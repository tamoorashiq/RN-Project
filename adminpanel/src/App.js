import { createTheme, ThemeProvider } from "@mui/material"
import Navigation from "./Navigation"
import { Theme } from "./Theme"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import {store, persistor} from './Redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let theme = createTheme({
  palette: {
    primary: {
      main: Theme.color.primary
    }
  },
  typography: {
    fontFamily: "Heebo",
    // allVariants: {
    //   fontFamily: 'Open Sans',
    // },
    button: {
      textTransform: "none"
    }
  }
})
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Navigation />
          </ThemeProvider>
          <ToastContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
