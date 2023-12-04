import { useNavigation } from "@react-navigation/native"
import { login } from "./../../store/custom/auth/auth.slice"
import { useSelector, useDispatch } from "react-redux"
import AntDesign from "react-native-vector-icons/AntDesign"

import {
  Input,
  Button,
  TopAppBar,
  SearchBar,
  ProductItem,
  HorizontalLine,
  Select
} from "./../../components"

import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  FlatList,
  Modal
} from "react-native"
import { Colors, Typography } from "./../../styles"
import {
  getAllCategories,
  getProducts,
  getProductsByFilters,
  getPublicProducts
} from "../../store/custom/products/products.slice"
import { useGuestUser } from "./../../customHooks/useGuestUser"

import { getCitiesByState } from "../../store/custom/appStart/appStart.slice"

const HomeScreen = () => {
  const navigation = useNavigation()
  const { isGuestUser, setGuestUser } = useGuestUser()

  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState()

  //filters
  const [state, setState] = useState()
  const [city, setCity] = useState()
  const [selectedCategories, setSelectedCategories] = useState([])

  const [filtersVisible, setFiltersVisible] = useState(false)

  const { products, api, categories, categoriesApi, publicProducts } =
    useSelector(state => state.AppProducts)
  const { user } = useSelector(state => state.Auth)

  const { availableStates, availableCities } = useSelector(
    state => state.AppStart
  )

  useEffect(async () => {
    dispatch(getAllCategories())
  }, [])

  useEffect(async () => {
    if (!isGuestUser)
      dispatch(getProductsByFilters({ city: user?.city, state: user?.state }))
  }, [user])

  useEffect(async () => {
    if (isGuestUser) dispatch(getPublicProducts())
  }, [isGuestUser])

  const onSearchValueChange = value => {
    if (isGuestUser) return
    if (value.length > 0) dispatch(getProductsByFilters({ search: value }))
    else
      dispatch(getProductsByFilters({ city: user?.city, state: user?.state }))

    setSearchValue(value)
  }

  const applyProductFilters = () => {
    let payload = {}
    if (state?.id) {
      payload.state = state.id
    }
    if (city?.id) {
      payload.city = city.id
    }
    if (selectedCategories.length > 0) {
      payload.category__in = selectedCategories.join(",")
    }

    dispatch(getProductsByFilters(payload))
    setFiltersVisible(false)
  }

  const updateSelectedCategories = itemID => {
    const isCategorySelected = selectedCategories.includes(itemID)

    if (isCategorySelected) {
      // If the category is already selected, remove it from the array
      const updatedCategories = selectedCategories.filter(id => id !== itemID)
      setSelectedCategories(updatedCategories)
    } else {
      // If the category is not selected, add it to the array
      setSelectedCategories([...selectedCategories, itemID])
    }
  }

  const fetchData = async () => {
    console.log("fetching latest data...")
    return
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar />
      <View style={{ marginHorizontal: "5%", flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={value => onSearchValueChange(value)}
          />
        </View>
        <TouchableOpacity
          disabled={isGuestUser}
          style={{ marginLeft: "3%", alignSelf: "center" }}
          onPress={() => setFiltersVisible(true)}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/tune.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {user && !isGuestUser && (
          <Text
            style={{
              paddingVertical: "5%",
              marginLeft: "5%",
              color: "#5B5E66",
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_400
            }}
          >
            {`Showing items near ${city ? city.name : user?.cityData?.name}, ${
              state ? state.name : user?.stateData?.name
            }`}
          </Text>
        )}
        <FlatList
          style={{ paddingTop: 10, paddingBottom: 10 }}
          contentContainerStyle={{ alignItems: "center" }}
          numColumns={1}
          data={isGuestUser ? publicProducts : products}
          extraData={products}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => {
            const category = categories.filter(c => c.id == item.category)
            console.log(category[0] || "")
            return (
              <ProductItem
                isGuestUser={isGuestUser}
                product={item}
                category={category[0] || ""}
                onPress={() => {}}
              />
            )
          }}
          keyExtractor={(item, index) => item.id}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filtersVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
          setModalVisible(!modalVisible)
        }}
      >
        <SafeAreaView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: Colors.MAIN_BG
          }}
        >
          <View style={{ marginHorizontal: "5%", marginTop: "3%", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <TouchableOpacity onPress={() => setFiltersVisible(false)}>
                <AntDesign
                  name={"close"}
                  size={20}
                  color={"rgba(91, 94, 102, 1)"}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: "5%",
                  color: "rgba(26, 28, 30, 1)",
                  fontSize: Typography.FONT_SIZE_22,
                  fontWeight: Typography.FONT_WEIGHT_500
                }}
              >
                Filters
              </Text>
            </View>
            <HorizontalLine style={{ marginTop: "5%", alignSelf: "center" }} />

            <Text
              style={{
                marginVertical: "2%",
                marginBottom: "5%",
                color: "#5B5E66",
                fontSize: Typography.FONT_SIZE_14,
                fontWeight: Typography.FONT_WEIGHT_BOLD
              }}
            >
              Choose Location
            </Text>

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
              options={!state ? [] : availableCities}
              placeholder={"City"}
              value={city}
              onValueChange={value => setCity(value)}
            />

            <HorizontalLine style={{ marginTop: "5%", alignSelf: "center" }} />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "5%"
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: "#5B5E66",
                  fontSize: Typography.FONT_SIZE_14,
                  fontWeight: Typography.FONT_WEIGHT_600
                }}
              >
                Choose Categories
              </Text>

              {selectedCategories.length > 0 && (
                <TouchableOpacity onPress={() => setSelectedCategories([])}>
                  <Text
                    style={{
                      color: Colors.LIGHT_PRIMARY,
                      fontSize: Typography.FONT_SIZE_14,
                      fontWeight: Typography.FONT_WEIGHT_500
                    }}
                  >
                    Clear All
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {categories.map(category => {
                const isSelected = selectedCategories.includes(category.id)
                return (
                  <TouchableOpacity
                    onPress={() => updateSelectedCategories(category.id)}
                    style={{
                      borderRadius: 10,
                      marginRight: 10,
                      borderWidth: isSelected ? 0 : 1,
                      alignItems: "center",
                      borderColor: Colors.LIGHT_OUTLINE,
                      marginVertical: 10,
                      justifyContent: "center",
                      backgroundColor: isSelected
                        ? Colors.LIGHT_SECONDARY
                        : Colors.MAIN_BG
                    }}
                  >
                    <Text
                      style={{
                        margin: 10,
                        fontSize: Typography.FONT_SIZE_14,
                        fontWeight: Typography.FONT_WEIGHT_500,
                        color: isSelected ? "#121C2B" : "#5B5E66",
                        marginVertical: 5,
                        textAlign: "center"
                      }}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "3%"
            }}
          >
            <View style={{ width: "40%" }}>
              <Button
                onPress={() => {
                  setCity()
                  setState()
                  setSelectedCategories([])
                  dispatch(
                    getProductsByFilters({
                      city: user?.city,
                      state: user?.state
                    })
                  )
                }}
                disabled={selectedCategories.length === 0 && !city && !state}
                dark={false}
              >
                Reset
              </Button>
            </View>
            <View style={{ width: "40%" }}>
              <Button
                onPress={() => applyProductFilters()}
                disabled={selectedCategories.length === 0 && !city && !state}
                dark={true}
              >
                Apply
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BG
  }
})

export default HomeScreen
