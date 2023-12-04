import React, { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
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
import ImageView from "react-native-image-viewing"

import { Colors, Typography, Mixins } from "../../styles"
import { Header, HorizontalLine, ConfirmationModal } from "../../components"
import AntDesign from "react-native-vector-icons/AntDesign"
import { MainApiService } from "../../store/API"
import { getMyProducts } from "../../store/custom/products/products.slice"

const { width, height } = Dimensions.get("window")

const MyProductDetails = props => {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()

  const [showFullImage, setShowFullImage] = useState(false)
  const [fullImageData, setFullImageData] = useState([])
  const [fullImageIndex, setFullImageIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const { product, category } = route.params

  useEffect(async () => {}, [])

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false })

    return () => {}
  }, [navigation])

  const getImageSource = images =>
    images.map(image => {
      return {
        uri: image.image
      }
    })

  const itemDetail = (title, description) => {
    return (
      <View
        style={{
          alignSelf: "flex-start",
          marginHorizontal: "5%",
          marginVertical: "2%"
        }}
      >
        <Text
          style={{
            color: "#5B5E66",
            fontSize: Typography.FONT_SIZE_12,
            fontWeight: Typography.FONT_WEIGHT_500
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: Colors.LIGHT_ON_SURFACE,
            fontSize: Typography.FONT_SIZE_16,
            fontWeight: Typography.FONT_WEIGHT_400
          }}
        >
          {description}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_BG }}>
      <Header
        showMyProductItems={true}
        onMyItemDelete={() => setShowModal(true)}
        onMyItemEdit={() =>
          navigation.navigate("EditProduct", {
            product: product,
            productCategory: category
          })
        }
      />
      <ScrollView
        style={{
          // marginHorizontal: "2%",
          backgroundColor: Colors.MAIN_BG
        }}
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: "5%",
            marginVertical: "2%",
            color: Colors.LIGHT_ON_SURFACE,
            fontSize: Typography.FONT_SIZE_24,
            fontWeight: Typography.FONT_WEIGHT_500
          }}
        >
          {product?.name}
        </Text>
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
          {product.media.slice(0, 4).map((media, index) => {
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

        {itemDetail("Name", product.name)}
        {itemDetail("Category", category.name)}
        {itemDetail("State", product.state_name)}
        {itemDetail("City", product.city_name)}
        {itemDetail("Description", product.description)}
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
        header={"Delete item"}
        description={
          "This process is irreversible. Are you sure you want to delete?"
        }
        type={"confirmation"}
        onConfirmation={async () => {
          setShowModal(false)
          await MainApiService.delete(`/api/v1/products/${product.id}/delete/`)
          await dispatch(getMyProducts()).unwrap()
          navigation.goBack()
        }}
        secondConfirmationText={"Delete"}
      />
    </SafeAreaView>
  )
}

export default MyProductDetails
