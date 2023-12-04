import { useNavigation } from "@react-navigation/native"
import { Pressable, SafeAreaView } from "react-native"
import React, { useState, useEffect, useRef } from "react"
import { Colors, Typography } from "../../styles"
import {
  Input,
  Button,
  Header,
  HorizontalLine,
  Select,
  ConfirmationModal
} from "./../../components"
import { pickFromCamera, pickFromGallery } from "../../utils/imagePicker"

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Picker
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import ActionSheet from "react-native-actionsheet"
import { useSelector, useDispatch } from "react-redux"
import { getCitiesByState } from "../../store/custom/appStart/appStart.slice"
import { updateProfile, setAuth } from "../../store/custom/auth/auth.slice"
import { setDataStorage } from "../../utils/storage"
import navigateAndReset from "./../../navigations/NavigationService"
import {
  PHONE_NUMBER_VALIDATION_TEXT,
  ZIP_CODE_VALIDATION_TEXT
} from "./../../utils/constants"

const UserProfileScreen = () => {
  const { api, user, isAuth } = useSelector(state => state.Auth)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const actionSheet = useRef(null)
  const ImagePickerOptions = ["Photo Gallery", "Camera", "Cancel"]

  const [name, setName] = useState(isAuth ? user.full_name : "")
  const [phone, setPhone] = useState(isAuth ? user.phone_number : "")
  const [streetAddress, setStreetAddress] = useState(
    isAuth ? user.street_address : ""
  )
  const [state, setState] = useState()
  const [city, setCity] = useState()
  const [zipCode, setZipCode] = useState(isAuth ? user.zip_code : "")
  const [imagePathLocal, setImagePathLocal] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const [validationErrors, setValidationErrors] = useState({
    phone: null,
    zipCode: null
  })

  const { availableStates, availableCities } = useSelector(
    state => state.AppStart
  )

  useEffect(async () => {
    if (user && !state && user.stateData) {
      setState(user.stateData)
      await dispatch(getCitiesByState(user.stateData.id)).unwrap()
      setCity(user.cityData)
    }
  }, [user])

  const saveProfilePressed = async () => {
    if (phone.length < 10) {
      setValidationErrors({
        ...validationErrors,
        phone: PHONE_NUMBER_VALIDATION_TEXT
      })
      return
    }

    if (zipCode.length < 5) {
      setValidationErrors({
        phone: null,
        zipCode: ZIP_CODE_VALIDATION_TEXT
      })
      return
    }

    setValidationErrors({
      phone: null,
      zipCode: null
    })
    setLoading(true)

    try {
      let payload = new FormData()
      payload.append("full_name", name)
      payload.append("phone_number", phone)
      payload.append("street_address", streetAddress)
      payload.append("state", state.id)
      payload.append("city", city.id)
      payload.append("zip_code", zipCode)
      if (imagePathLocal)
        payload.append("profile_image", {
          uri: imagePathLocal,
          type: "image/jpeg",
          name: Date.now() + "photo.jpg"
        })

      const resp = await dispatch(updateProfile(payload)).unwrap()
      console.log("profile updated res", resp)

      setLoading(false)
      if (isAuth) {
        setShowModal(true)
        return
      }

      await dispatch(setAuth(true)).unwrap()
    } catch (error) {
      setLoading(false)
      console.log("profile updated error", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header smallHeader={"Profile"} />
      <KeyboardAwareScrollView
        style={
          {
            // marginBottom: "10%"
          }
        }
        contentContainerStyle={{
          // flex: 1,
          marginHorizontal: "3%",
          alignItems: "flex-start"
        }}
      >
        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10%"
          }}
        >
          <View style={{}}>
            <Image
              style={{
                width: 90,
                height: 90,
                borderRadius: 1000,
                borderWidth: 0.1
              }}
              source={
                imagePathLocal
                  ? { uri: imagePathLocal }
                  : isAuth && user.profile_image
                  ? { uri: user.profile_image }
                  : require("../../assets/image_placeholder.png")
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => actionSheet.current.show()}
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/Edit.png")}
            />
          </TouchableOpacity>
        </View>

        <HorizontalLine />
        <Text
          style={{
            marginBottom: "5%",
            marginTop: "1%",
            fontSize: Typography.FONT_SIZE_14,
            fontWeight: Typography.FONT_WEIGHT_BOLD
          }}
        >
          Personal Info
        </Text>

        <Input
          width={"100%"}
          onChangeText={value => setName(value)}
          value={name}
          placeholder="Full Name"
        />

        <Input
          width={"100%"}
          onChangeText={value => setPhone(value)}
          value={phone}
          keyboardType="numeric"
          placeholder="Phone Number"
          maxLength={15}
          error={validationErrors.phone}
        />

        <Input
          width={"100%"}
          onChangeText={value => setStreetAddress(value)}
          value={streetAddress}
          placeholder="Street Address"
        />

        <Select
          width={"100%"}
          options={availableStates}
          placeholder={"State"}
          value={state}
          onValueChange={value => {
            dispatch(getCitiesByState(value.id))
            setState(value)
            setCity()
          }}
        />

        <Select
          width={"100%"}
          options={!user && !state ? [] : availableCities}
          placeholder={"City"}
          value={city}
          onValueChange={value => setCity(value)}
        />

        <Input
          width={"100%"}
          onChangeText={value => setZipCode(value)}
          value={zipCode}
          placeholder="Zip Code"
          keyboardType="numeric"
          maxLength={10}
          error={validationErrors.zipCode}
        />

        <View style={{ width: "100%" }}>
          <Button
            loading={api.state === "pending" || loading}
            disabled={
              !name || !phone || !state || !city || !streetAddress || !zipCode
            }
            onPress={() => saveProfilePressed()}
            dark={true}
          >
            Save
          </Button>
        </View>
      </KeyboardAwareScrollView>

      <ActionSheet
        ref={actionSheet}
        options={ImagePickerOptions}
        cancelButtonIndex={2}
        onPress={async index => {
          let res = null
          switch (index) {
            case 0:
              res = await pickFromGallery()
              break

            case 1:
              res = await pickFromCamera()
              break
          }

          setImagePathLocal(res.path)
          console.log("res is ", res)
        }}
      />

      <ConfirmationModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        header={"Your profile has been updated successfully"}
        icon={require("../../assets/success_icon.png")}
        type={"success"}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BG,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  changeAvatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  cameraIcon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  changeAvatarText: {
    color: "#007AFF",
    fontWeight: "bold"
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center"
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
})
export default UserProfileScreen
