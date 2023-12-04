import React, { useState, useEffect, useCallback } from "react"
import {
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Platform
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import StarRating from "react-native-star-rating"
import { useGuestUser } from "./../../customHooks/useGuestUser"

import { Colors, Typography, Mixins } from "../../styles"
import {
  ConfirmationModal,
  Header,
  HorizontalLine,
  LoginModal
} from "../../components"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import ImageView from "react-native-image-viewing"
import * as appStartApiService from "./../../store/custom/appStart/api"

const { width, height } = Dimensions.get("window")

const ProductDetails = props => {
  const navigation = useNavigation()
  const { isGuestUser, setGuestUser } = useGuestUser()

  const route = useRoute()
  const [stateCity, setStateCity] = React.useState()

  const [showLoginModal, setShowLoginModal] = React.useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [fullImageData, setFullImageData] = useState([])
  const [fullImageIndex, setFullImageIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const { product, category, withoutOwner = false } = route.params

  useEffect(async () => {}, [])

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false })

    return () => {}
  }, [navigation])

  useEffect(async () => {
    const resp = await appStartApiService.apiService.getCityAndStateByIds(
      product.user_details.state,
      product.user_details.city
    )

    setStateCity(resp)
  }, [product.user_details])

  const getImageSource = images =>
    images.map(image => {
      return {
        uri: image.image
      }
    })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_BG }}>
      <Header
        showFlag={true}
        onFlagPress={() => {
          if (isGuestUser) {
            setShowLoginModal(true)
          } else setShowModal(true)
        }}
      />

      {/* <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          position: "absolute",
          right: 15,
          top: Platform.OS === "ios" ? 70 : "2%"
        }}
      >
        <MaterialCommunityIcons name={"flag-outline"} size={30} />
      </TouchableOpacity> */}

      <ScrollView
        style={{
          // marginHorizontal: "2%",
          backgroundColor: Colors.MAIN_BG
        }}
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Image
          style={{
            height: height * 0.3,
            width: "95%",
            alignSelf: "center",
            borderRadius: 15
          }}
          source={
            product.media[0]
              ? { uri: product.media[0]?.image }
              : require("./../../assets/BigIcon.png")
          }
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: "3%",
            marginHorizontal: "5%"
          }}
        >
          {product.media.slice(0, 3).map((media, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setFullImageData([...product.media])
                  setShowFullImage(true)
                  setFullImageIndex(index)
                }}
              >
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    alignSelf: "center",
                    borderRadius: 10,
                    marginLeft: 5
                  }}
                  source={{ uri: media.image }}
                />
              </TouchableOpacity>
            )
          })}

          <View
            style={{
              alignSelf: "flex-end",
              alignItems: "flex-end",
              flex: 1
            }}
          >
            <Text
              style={{
                fontSize: Typography.FONT_SIZE_12,
                fontWeight: Typography.FONT_WEIGHT_500,
                color: "#5B5E66"
              }}
            >
              Estimated Value
            </Text>
            <Text
              style={{
                fontSize: Typography.FONT_SIZE_22,
                fontWeight: Typography.FONT_WEIGHT_500,
                color: "rgba(26, 28, 30, 1)"
              }}
            >
              {`$${product.estimated_amount}`}
            </Text>
          </View>
        </View>

        <HorizontalLine style={{ marginVertical: "5%" }} />
        <View style={{ alignSelf: "flex-start", marginHorizontal: "5%" }}>
          <Text
            style={{
              fontSize: Typography.FONT_SIZE_22,
              fontWeight: Typography.FONT_WEIGHT_500,
              color: "rgba(26, 28, 30, 1)"
            }}
          >
            {product?.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 14, width: 14 }}
              source={require("../../assets/distance.png")}
            />
            <Text
              style={{
                fontSize: Typography.FONT_SIZE_14,
                fontWeight: Typography.FONT_WEIGHT_500,
                color: "rgba(91, 94, 102, 1)",
                marginLeft: 5
              }}
            >
              {`${product?.location?.city}, ${product?.location?.state}, ${product?.location?.zip_code}`}
            </Text>
          </View>

          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              width: "30%",
              alignItems: "center",
              borderColor: "rgba(91, 94, 102, 1)",
              marginVertical: 10
            }}
          >
            <Text
              style={{
                margin: 10,
                fontSize: Typography.FONT_SIZE_14,
                fontWeight: Typography.FONT_WEIGHT_500,
                color: "rgba(26, 28, 30, 1)",
                marginVertical: 5
              }}
            >
              {category?.name}
            </Text>
          </View>

          <Text
            style={{
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_BOLD,
              color: Colors.LIGHT_ON_SURFACE,
              marginVertical: 5
              // marginHorizontal: "5%"
            }}
          >
            {"Description"}
          </Text>
          <Text
            style={{
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_400,
              color: "rgba(91, 94, 102, 1)",
              marginVertical: 5
            }}
          >
            {product?.description}
          </Text>
        </View>
        <HorizontalLine style={{ marginVertical: "5%" }} />

        {!withoutOwner && (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              marginHorizontal: "5%"
            }}
          >
            <Image
              style={{
                borderRadius: 1000,
                width: 60,
                height: 60,
                backgroundColor: "rgba(91, 94, 102, 1)"
              }}
              source={
                product.user_details.profile_image
                  ? { uri: product.user_details.profile_image }
                  : require("../../assets/image_placeholder.png")
              }
            />

            <View
              style={{
                justifyContent: "center",
                marginHorizontal: "3%",
                flex: 1
              }}
            >
              <Text
                style={{
                  fontSize: Typography.FONT_SIZE_16,
                  fontWeight: Typography.FONT_WEIGHT_BOLD,
                  color: Colors.LIGHT_ON_SURFACE
                }}
              >
                {product?.user_details.full_name}
              </Text>
              <View style={{ width: "50%", marginVertical: 5 }}>
                <StarRating
                  disabled={true} // Set this to true if you don't want user interaction
                  maxStars={5}
                  rating={product?.user_details?.feedback || 0}
                  fullStar={"star"}
                  emptyStar={"star"}
                  fullStarColor="#FFD600" // Color of the filled stars
                  emptyStarColor="#E3E2E6" // Color of the empty stars
                  starSize={15} // Size of each star
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  resizeMode="contain"
                  style={{ height: 14, width: 14 }}
                  source={require("../../assets/distance.png")}
                />
                <Text
                  style={{
                    fontSize: Typography.FONT_SIZE_12,
                    fontWeight: Typography.FONT_WEIGHT_600,
                    color: "rgba(91, 94, 102, 1)"
                  }}
                >
                  {`${stateCity?.city?.name || ""}, ${
                    stateCity?.state?.name || ""
                  }, ${product?.user_details?.zip_code}`}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                if (isGuestUser) {
                  setShowLoginModal(true)
                } else
                  navigation.navigate("OwnerProfileView", {
                    user: product?.user_details
                  })
              }}
            >
              <Text
                style={{
                  fontSize: Typography.FONT_SIZE_15,
                  fontWeight: Typography.FONT_WEIGHT_500,
                  color: Colors.PRIMARY_50
                }}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {!withoutOwner && (
          <TouchableOpacity
            onPress={() => {
              if (isGuestUser) {
                setShowLoginModal(true)
              } else
                navigation.navigate("ChatRoom", { user: product.user_details })
            }}
            style={{
              width: "100%",
              alignItems: "center",
              marginVertical: "5%"
            }}
          >
            <Image
              style={{ width: "90%" }}
              resizeMode={"contain"}
              source={require("./../../assets/ChatButton.png")}
            />
          </TouchableOpacity>
        )}
      </ScrollView>

      <ImageView
        images={getImageSource(fullImageData)}
        imageIndex={fullImageIndex}
        visible={showFullImage}
        onRequestClose={() => setShowFullImage(false)}
      />

      <ConfirmationModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        header={"Are you sure you want to perform the chosen action?"}
        type={"confirmation"}
        onConfirmation={() => {
          setShowModal(false)
          navigation.navigate("ProductReport", { product })
        }}
        secondConfirmationText={"Yes"}
      />
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </SafeAreaView>
  )
}

export default ProductDetails
