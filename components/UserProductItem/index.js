import React from "react"
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import { Colors, Typography } from "../../styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"

const UserProductItem = ({ item }) => {
  const navigation = useNavigation()

  const { categories } = useSelector(state => state.AppProducts)

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        const category = categories.filter(c => c.id == item.category)
        navigation.navigate("ProductDetails", {
          product: item,
          category: category[0],
          withoutOwner: true
        })
      }}
    >
      <Image
        source={{
          uri:
            item.media.length > 0
              ? item.media[0].image
              : "https://via.placeholder.com/150"
        }}
        style={styles.image}
      />
      <Text style={styles.estimatedAmount}>${item.estimated_amount}</Text>
      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    width: "42.5%",
    height: 215,
    marginLeft: "5%",
    marginBottom: "5%",
    backgroundColor: "#F0F0F0",
    marginTop: "5%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  estimatedAmount: {
    paddingLeft: 15,
    alignSelf: "flex-start",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.LIGHT_ON_SURFACE
  },
  name: {
    paddingLeft: 15,
    marginTop: 5,
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: Typography.FONT_SIZE_13,
    fontWeight: Typography.FONT_WEIGHT_500,
    color: Colors.LIGHT_ON_SURFACE
  }
})

export default UserProductItem
