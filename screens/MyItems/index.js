import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import {
  Input,
  Button,
  TopAppBar,
  SearchBar,
  ProductItem
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
  FlatList
} from "react-native"
import { Colors, Typography } from "./../../styles"
import {
  getAllCategories,
  getProducts,
  getMyProducts,
  getProductsByFilters
} from "../../store/custom/products/products.slice"

const MyItemsScreen = ({ navigation }) => {
  // const navigation = useNavigation()
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState()

  const { products, api, categories, categoriesApi, myProducts } = useSelector(
    state => state.AppProducts
  )

  useEffect(async () => {
    dispatch(getAllCategories())
    dispatch(getMyProducts())
  }, [])

  const onSearchValueChange = value => {
    if (value.length > 0) dispatch(getProductsByFilters({ search: value }))
    else dispatch(getProducts())

    setSearchValue(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar />
      <View
        style={{
          marginHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "5%"
        }}
      >
        <Text
          style={{
            flex: 1,
            color: "rgba(26, 28, 30, 1)",
            fontSize: Typography.FONT_SIZE_24,
            fontWeight: Typography.FONT_WEIGHT_500
          }}
        >
          My Items
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("AddProduct")}>
          <Text
            style={{
              color: "rgba(48, 119, 208, 1)",
              fontSize: Typography.FONT_SIZE_14,
              fontWeight: Typography.FONT_WEIGHT_500
            }}
          >
            + Add item
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: "5%", flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={value => onSearchValueChange(value)}
          />
        </View>
       
      </View>

      <View>
        <FlatList
          style={{ marginBottom: "45%", marginTop: "5%" }}
          contentContainerStyle={{ alignItems: "center" }}
          numColumns={1}
          data={myProducts}
          extraData={myProducts}
          renderItem={({ item }) => {
            const category = categories.filter(c => c.id == item.category)
            
            return (
              <ProductItem
                myItem={true}
                product={item}
                category={category[0] || ""}
                onPress={() => {}}
              />
            )
          }}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BG
  }
})

export default MyItemsScreen
