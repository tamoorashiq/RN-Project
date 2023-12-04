import React, { useRef, useState, useEffect } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import OTPInputView from "@twotalltotems/react-native-otp-input"

const OTPInput = () => {
  const inputRefs = useRef([])
  const [otp, setOTP] = useState(["", "", "", ""])

  const handleOTPChange = otp => {
    // Handle OTP change
    console.log(otp)
  }

  return (
    <View style={styles.container}>
      <OTPInputView
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.otpInput}
        codeInputHighlightStyle={styles.otpInputHighlight}
        onCodeChanged={handleOTPChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center"
  },
  input: {
    width: 53,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 16,
    textAlign: "center"
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    borderColor: "gray",
    marginHorizontal: 8
  },
  otpInputHighlight: {
    borderColor: "red"
  }
})

export default OTPInput
