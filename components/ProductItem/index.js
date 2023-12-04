import React, { useState, useEffect, useCallback } from "react"
import { useNavigation } from "@react-navigation/native"

import {
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground
} from "react-native"

import { Colors, Typography, Mixins } from "../../styles"

const { width, height } = Dimensions.get("window")

const ProductItem = props => {
  const navigattion = useNavigation()
  const {
    product,
    onPress,
    category,
    myItem = false,
    isGuestUser = false
  } = props

  useEffect(async () => {}, [])

  return (
    <View
      style={{
        marginBottom: "2%",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: 10,
        width: width - width * 0.1
      }}
    >
      <Image
        style={{
          width: "95%",
          height: 200,
          alignSelf: "center",
          borderRadius: 10,
          marginVertical: "2%"
        }}
        source={
          product.media[0]
            ? { uri: product.media[0]?.image }
            : require("./../../assets/BigIcon.png")
        }
      />
      <View style={{ marginHorizontal: "5%" }}>
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

        <Text
          style={{
            fontSize: Typography.FONT_SIZE_14,
            fontWeight: Typography.FONT_WEIGHT_400,
            color: "rgba(91, 94, 102, 1)",
            marginVertical: 5
            // marginHorizontal: "5%"
          }}
          numberOfLines={2}
        >
          {product?.description}
        </Text>

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
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_500,
              color: "rgba(26, 28, 30, 1)",
              marginVertical: 5
            }}
          >
            {category?.name}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (myItem) {
              navigattion.navigate("MyProductDetails", {
                product,
                category
              })
            } else
              navigattion.navigate("ProductDetails", {
                product,
                category
              })
          }}
          style={{ marginTop: 10, marginBottom: 20, alignSelf: "center" }}
        >
          <Text
            style={{
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_500,
              color: "rgba(0, 94, 180, 1)",
              marginVertical: 5
            }}
          >
            {"Show more"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductItem
