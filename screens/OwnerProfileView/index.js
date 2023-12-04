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
  useWindowDimensions
} from "react-native"
import * as appStartApiService from "./../../store/custom/appStart/api"

import { useNavigation, useRoute } from "@react-navigation/native"
import StarRating from "react-native-star-rating"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"

import { Colors, Typography, Mixins } from "../../styles"
import {
  Header,
  HorizontalLine,
  UserProductItem,
  UserReviewItem,
  RateUserModal
} from "../../components"
import Ionicons from "react-native-vector-icons/Ionicons"
import * as ProductsApiService from "../../store/custom/products/api"
import axios from "axios"
import { getDataStorage } from "./../../utils/storage"

const { width, height } = Dimensions.get("window")

const OwnerProfileView = props => {
  const navigation = useNavigation()
  const route = useRoute()
  const layout = useWindowDimensions()

  const { user } = route.params

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "first", title: "All Items" },
    { key: "second", title: "Reviews" }
  ])
  const [userProducts, setUserProducts] = React.useState(0)
  const [nextPageApi, setNextPageApi] = React.useState(null)
  const [userReviews, setUserReviews] = React.useState([])
  const [showRateUserModal, setShowRateUserModal] = React.useState(false)

  const [stateCity, setStateCity] = React.useState()

  const getUserReviews = async () => {
    const userReviews = await ProductsApiService.apiService.getUserReviews({
      user: user.user
    })

    setUserReviews(userReviews || [])
  }

  useEffect(async () => {
    const userProducts = await ProductsApiService.apiService.getProductsByUser({
      user: user.user
    })

    setUserProducts(userProducts.results || [])
    setNextPageApi(userProducts.next)
  }, [])

  useEffect(async () => {
    getUserReviews()
  }, [])

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false })

    return () => {}
  }, [navigation])

  useEffect(async () => {
    const resp = await appStartApiService.apiService.getCityAndStateByIds(
      user.state,
      user.city
    )

    setStateCity(resp)
  }, [user])

  const getNextPageData = async () => {
    let key = await getDataStorage("@key")
    const headers = {
      Authorization: `Token ${key}`
    }

    await axios
      .get(nextPageApi, {
        headers
      })
      .then(response => {
        // Handle successful response
        setUserProducts([...userProducts, ...response.data?.results])
        setNextPageApi(response.data?.next)
      })
      .catch(error => {
        // Handle error
        console.error("Error:", error)
      })
  }

  const renderBottomHeader = () => (
    <TouchableOpacity
      style={{
        padding: 16,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.LIGHT_SECONDARY,
        borderRadius: 100
      }}
      onPress={() => getNextPageData()}
    >
      <Text
        style={{
          marginHorizontal: "5%",

          color: "#121C2B",
          fontSize: Typography.FONT_SIZE_14,
          fontWeight: Typography.FONT_WEIGHT_500
        }}
      >
        Show More
      </Text>
    </TouchableOpacity>
  )

  const FirstRoute = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={userProducts}
        renderItem={({ item, index }) => <UserProductItem item={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        ListFooterComponent={nextPageApi ? renderBottomHeader : null}
      />
    </View>
  )

  const SecondRoute = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={userReviews}
        renderItem={({ item }) => <UserReviewItem item={item} />}
        keyExtractor={item => item}
        numColumns={1}
      />
    </View>
  )

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  })

  const _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        inactiveColor={"#5B5E66"}
        activeColor={Colors.LIGHT_PRIMARY}
        indicatorStyle={{
          backgroundColor: Colors.LIGHT_PRIMARY,
          alignSelf: "center"
        }}
        style={{ backgroundColor: null }}
        labelStyle={{
          fontSize: Typography.FONT_SIZE_14,
          fontWeight: Typography.FONT_WEIGHT_500
        }}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_BG }}>
      <Header />

      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          width: "90%",
          justifyContent: "center",
          backgroundColor: "#ededed",
          borderRadius: 10
        }}
      >
        <Image
          style={{
            borderRadius: 1000,
            width: 60,
            height: 60,
            backgroundColor: "rgba(91, 94, 102, 1)",
            marginTop: "5%"
          }}
          source={
            user.profile_image
              ? { uri: user.profile_image }
              : require("../../assets/image_placeholder.png")
          }
        />

        <Text
          style={{
            fontSize: Typography.FONT_SIZE_28,
            fontWeight: Typography.FONT_WEIGHT_500,
            color: Colors.LIGHT_ON_SURFACE,
            marginVertical: "2%"
          }}
        >
          {user.full_name}
        </Text>

        <View style={{ width: "40%" }}>
          <StarRating
            disabled={true} // Set this to true if you don't want user interaction
            maxStars={5}
            rating={user?.feedback || 0}
            fullStar={"star"}
            emptyStar={"star"}
            fullStarColor="#FFD600" // Color of the filled stars
            emptyStarColor="#E3E2E6" // Color of the empty stars
            starSize={20} // Size of each star
          />
        </View>

        <View style={{ flexDirection: "row", marginVertical: "2%" }}>
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
            {`${stateCity?.city.name || ""}, ${stateCity?.state.name || ""},${
              user?.zip_code
            }`}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginVertical: "5%" }}>
          <TouchableOpacity
            onPress={() => setShowRateUserModal(true)}
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: Colors.PRIMARY_50
            }}
          >
            <Text
              style={{
                fontSize: Typography.FONT_SIZE_14,
                fontWeight: Typography.FONT_WEIGHT_500,
                color: Colors.PRIMARY_50,
                marginVertical: 12,
                marginHorizontal: 20
              }}
            >{`Rate ${user.full_name?.split(" ")[0]}`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderRadius: 50,
              backgroundColor: Colors.PRIMARY_50,
              marginHorizontal: 5,
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20
            }}
            onPress={() => navigation.navigate("ChatRoom", { user: user })}
          >
            <Ionicons
              style={{ marginLeft: 20 }}
              name={"chatbox-outline"}
              size={20}
              color={Colors.WHITE}
            />
            <Text
              style={{
                fontSize: Typography.FONT_SIZE_14,
                fontWeight: Typography.FONT_WEIGHT_500,
                color: Colors.WHITE,
                marginVertical: 12,
                marginLeft: 10,
                marginRight: 20
              }}
            >{`Chat`}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TabView
        style={{ marginTop: 20 }}
        renderTabBar={_renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <RateUserModal
        isVisible={showRateUserModal}
        onClose={() => {
          setShowRateUserModal(false)
          getUserReviews()
        }}
        user={user}
      />
    </SafeAreaView>
  )
}

export default OwnerProfileView
