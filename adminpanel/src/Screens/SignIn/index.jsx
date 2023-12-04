import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import React, { useRef, useState } from "react"
import LOGO_IMG from "../../Assets/Images/Logo.png"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import PasswordIcon from "@mui/icons-material/Password"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LoadingButton from "@mui/lab/LoadingButton"
import { Theme } from "../../Theme"
import { LOGIN_API } from "../../Constant"
import useFetch from "../../Utils/useFetch"
import { DASHBOARD_PATH } from "../../Navigation/Routes"
import { ADD_USER, AUTH_USER } from "../../Redux/types"
import { toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.userReducer.user)
  const [errorObj, setErrorObj] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { request } = useFetch()

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSignin()
    }
  }

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSignin = async () => {
    try {
      let reqBody = {
        email: email,
        password: password
      }
      console.log(reqBody)
      const errors = {}

      if (!reqBody?.email) {
        errors.email = ["Email field may not be blank."]
      }
      if (!reqBody?.password) {
        errors.password = ["Password field may not be blank."]
      }

      if (Object.keys(errors).length) {
        setErrorObj(errors)
        return
      }

      // setLoading(true)
      setErrorObj({})
      setLoading(true)

      const req = await request(LOGIN_API, "POST", reqBody)
      toast.success('Operation successful!');
      setLoading(false)
      // toast.success('🦄 Wow so easy!', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
      dispatch({
        type: ADD_USER,
        payload: req?.data
      })
      navigate(DASHBOARD_PATH, { replace: false })
    } catch (err) {
      setLoading(false)
      if (err.error?.["non_field_errors"]) {
        // addToast(err.error?.["non_field_errors"][0], {
        //   appearance: "error",
        //   autoDismiss: true
        // })
        toast.error(err.error?.["non_field_errors"][0]);
      }
      setErrorObj(err.error)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: Theme.bg.bgColor
      }}
    >
      <Paper
        sx={{ boxShadow: 5, width: "70%", borderRadius: "32px" }}
        elevation={0}
      >
        <Grid container sx={{ borderRadius: "100px" }}>
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: Theme.bg.bg1,
              px: 20,
              py: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: "32px",
              borderBottomLeftRadius: "32px"
            }}
          >
            <img src={LOGO_IMG} alt="Swapster Logo" height="150px" />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: Theme.bg.bg2,
              px: 4,
              py: 20,
              borderTopRightRadius: "32px",
              borderBottomRightRadius: "32px"
            }}
          >
            <Box sx={{ py: 6 }}>
              <Typography
                sx={{ fontSize: "28px", fontWeight: 500, fontFamily: "Heebo" }}
              >
                Sign In
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                Enter your email and password to continue
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon
                          style={{ color: Theme.color.text }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "10px",
                      borderColor: Theme.color.text,
                      color: Theme.color.text
                    }
                  }}
                  id="input-with-icon-textfield"
                  fullWidth
                  variant="outlined"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  inputRef={emailRef}
                  onKeyDown={handleKeyDown}
                  error={Boolean(errorObj?.email)}
                  helperText={errorObj?.email?.[0]}
                />
              </Box>
              <Box>
                <TextField
                  id="input-with-icon-textfield"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  inputRef={passwordRef}
                  onKeyDown={handleKeyDown}
                  error={Boolean(errorObj?.password)}
                  helperText={errorObj?.password?.[0]}
                  fullWidth
                  variant="outlined"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon style={{ color: Theme.color.text }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "10px" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          style={{ color: Theme.color.text }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  
                />
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "none",
                    color: Theme.color.txt1,
                    fontFamily: "Heebo",
                    fontWeight: 500
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
              <Box>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  fullWidth
                  size="large"
                  disableRipple
                  disableFocusRipple
                  sx={{ borderRadius: "100px", py: 1.5 }}
                  onClick={handleSignin}
                >
                  Login
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default SignIn
