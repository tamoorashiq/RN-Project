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
  Picker,
  Dimensions
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import ActionSheet from "react-native-actionsheet"
import { useSelector, useDispatch } from "react-redux"
import { getCitiesByState } from "./../../store/custom/appStart/appStart.slice"
import { updateProfile, setAuth } from "./../../store/custom/auth/auth.slice"
import { setDataStorage } from "../../utils/storage"
import navigateAndReset from "./../../navigations/NavigationService"
import {
  addMyProduct,
  getMyProducts
} from "../../store/custom/products/products.slice"
import { ZIP_CODE_VALIDATION_TEXT } from "./../../utils/constants"

const { width, height } = Dimensions.get("window")

const AddProduct = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const actionSheet = useRef(null)
  const ImagePickerOptions = ["Photo Gallery", "Camera", "Cancel"]

  const [name, setName] = useState("")
  const [category, setCategory] = useState()
  const [estimatedValue, setEstimatedValue] = useState()
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([require("../../assets/ImageFrame.png")])

  const [imagePathLocal, setImagePathLocal] = useState("")
  const [zipCodeValidation, setZipCodeValidation] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const { availableStates, availableCities } = useSelector(
    state => state.AppStart
  )

  const { categories, addProductApi } = useSelector(state => state.AppProducts)

  const { api } = useSelector(state => state.Auth)

  const addItem = async () => {
    if (zipCode.length < 5) {
      setZipCodeValidation(ZIP_CODE_VALIDATION_TEXT)
      return
    }

    setZipCodeValidation(null)
    try {
      let payload = new FormData()
      payload.append("name", name)
      payload.append("category", category.id)
      payload.append("description", description)
      payload.append("address", address)
      payload.append("state", state.id)
      payload.append("city", city.id)
      payload.append("zip_code", zipCode)
      payload.append("estimated_amount", estimatedValue)

      images.forEach((element, index) => {
        if (index != images.length - 1)
          payload.append("file", {
            uri: element,
            type: "image/jpeg",
            name: Date.now() + "photo.jpg"
          })
      })

      console.log("payload ", payload)
      const resp = await dispatch(addMyProduct(payload)).unwrap()
      await dispatch(getMyProducts()).unwrap()
      setShowModal(true)
      // navigation.goBack()
    } catch (error) {
      console.log("profile updated error", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header bigHeader={"Add Items"} />
      <KeyboardAwareScrollView
        style={{}}
        contentContainerStyle={{
          marginHorizontal: "3%",
          alignItems: "flex-start"
        }}
      >
        <Input
          width={"100%"}
          onChangeText={value => setName(value)}
          value={name}
          placeholder="Name"
          noOfLines={1}
          maxLength={512}
        />

        <Select
          width={"100%"}
          options={categories}
          placeholder={"Category"}
          value={category}
          onValueChange={value => {
            setCategory(value)
          }}
        />

        <Input
          width={"100%"}
          onChangeText={value => setEstimatedValue(value)}
          value={estimatedValue}
          keyboardType="numeric"
          placeholder="Estimated Value"
          maxLength={15}
        />

        <Input
          width={"100%"}
          onChangeText={value => setAddress(value)}
          value={address}
          noOfLines={1}
          placeholder="Address"
        />

        <Select
          width={"100%"}
          options={availableStates}
          placeholder={"State"}
          value={state}
          onValueChange={value => {
            dispatch(getCitiesByState(value.id))
            setState(value)
          }}
        />

        <Select
          width={"100%"}
          options={availableCities}
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
          error={zipCodeValidation}
        />

        <Input
          textAlignVertical="top"
          width={"100%"}
          onChangeText={value => setDescription(value)}
          value={description}
          placeholder="Description"
          isMultiLine={true}
        />

        <Text
          style={{
            color: Colors.LIGHT_ON_SURFACE,
            fontWeight: Typography.FONT_WEIGHT_BOLD,
            fontSize: Typography.FONT_SIZE_16
          }}
        >
          Images{" "}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: "5%",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            flex: 1
          }}
        >
          {images.map((image, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (i === images.length - 1) {
                    actionSheet.current.show()
                  }
                }}
                disabled={i != images.length - 1}
                style={{ marginHorizontal: "1%", marginVertical: "3%" }}
              >
                <Image
                  style={{
                    width: width / 3 - width * 0.075,
                    height: width / 3 - width * 0.075,
                    borderRadius: i === images.length - 1 ? 0 : 20
                  }}
                  resizeMode="contain"
                  source={i === images.length - 1 ? image : { uri: image }}
                />
              </TouchableOpacity>
            )
          })}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flex: 1,
            marginTop: "5%"
          }}
        >
          <View style={{ flex: 1, marginHorizontal: "3%" }}>
            <Button
              loading={api.state === "pending"}
              dark={false}
              confimation={true}
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Button>
          </View>
          <View style={{ flex: 1, marginHorizontal: "3%" }}>
            <Button
              loading={addProductApi.loading === "pending"}
              disabled={
                !address ||
                !name ||
                !category ||
                !estimatedValue ||
                !state ||
                !city ||
                !zipCode ||
                !description ||
                images.length < 2
              }
              onPress={() => addItem()}
              dark={true}
            >
              Add Item
            </Button>
          </View>
        </View>

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

            let tempImages = [...images]
            tempImages.splice(tempImages.length - 1, 0, res.path)

            setImages(tempImages)
          }}
        />
      </KeyboardAwareScrollView>

      <ConfirmationModal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false)
          navigation.goBack()
        }}
        header={"Your product added successfully"}
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
export default AddProduct
