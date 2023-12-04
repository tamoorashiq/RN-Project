import React, { useState, useEffect, useRef } from "react"
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  SafeAreaView
} from "react-native"
import { Colors, Typography } from "../../styles"
import {
  Input,
  Button,
  Header,
  HorizontalLine,
  Select,
  ConfirmationModal
} from "./../../components"
import { useSelector, useDispatch } from "react-redux"
import { validateEmail, validatePassword } from "./../../utils/common"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { MainApiService } from "../../store/API"

const SupportSendFeedbackScreen = () => {
  const { user } = useSelector(state => state.Auth)

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(user.email)
  const [feedback, setFeedback] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [emailError, setEmailError] = useState("")

  const sendUserFeedback = async () => {
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address")
      return
    }

    setEmailError("")
    setIsLoading(true)
    try {
      const resp = await MainApiService.post("/api/v1/feedbacks/", {
        message: feedback,
        email: email
      })

      setIsLoading(false)

      console.log("resp ", resp.data)

      setShowModal(true)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header bigHeader={"Send Feedback"} />
      <KeyboardAwareScrollView>
        <View style={{ marginHorizontal: "5%", flex: 1 }}>
          <Text
            style={{
              marginVertical: "5%",
              color: Colors.LIGHT_ON_SURFACE,
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_400
            }}
          >
            Your feedback is crucial to us. We're constantly working to enhance
            your app experience, and we'd love to hear your thoughts,
            suggestions, or concerns.
          </Text>

          <Input
            width={"100%"}
            onChangeText={value => setEmail(value)}
            value={email}
            placeholder="Email"
            error={emailError}
          />

          <Input
            textAlignVertical="top"
            width={"100%"}
            onChangeText={value => setFeedback(value)}
            value={feedback}
            isMultiLine={true}
            numberOfLines={5}
            placeholder="Message"
          />
        </View>
        <View style={{ marginHorizontal: "5%", marginBottom: "10%" }}>
          <Button
            loading={isLoading}
            disabled={!email || !feedback}
            onPress={() => sendUserFeedback()}
            dark={true}
          >
            Submit
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <ConfirmationModal
        isVisible={showModal}
        onClose={() => {
          setEmail("")
          setFeedback("")
          setShowModal(false)
        }}
        header={"Your Feedback was sent successfully"}
        icon={require("../../assets/EmailSentIcon.png")}
        type={"success"}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    height: "100%",
    backgroundColor: "white"
  },
  labelText: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    marginLeft: 15
  },
  Textarea: {
    marginTop: 30
  },
  TextAreaInput: {
    height: 160,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 10,
    textAlignVertical: "top",
    padding: 10
  },
  SubmitBtn: {
    marginTop: 100
  }
})
export default SupportSendFeedbackScreen
