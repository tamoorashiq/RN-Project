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
import StarRating from "react-native-star-rating"
import HorizontalLine from "../HorizontalLine"

const UserReviewItem = ({ item }) => {
  const dateObject = new Date(item.created_at)

  // Format the date in 'MM/DD/YYYY' format
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric"
  })

  // Format the time in 'h:mm A' format
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric"
  })

  // Combine the formatted date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: "5%",
          marginTop: "3%"
        }}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 1000 }}
          source={
            item.profile_image
              ? { uri: item.profile_image }
              : require("../../assets/UserAvatar.png")
          }
        />
        <View style={{ marginLeft: "3%", flex: 1 }}>
          <Text
            style={{
              color: Colors.LIGHT_ON_SURFACE,
              fontSize: Typography.FONT_SIZE_16,
              fontWeight: Typography.FONT_WEIGHT_BOLD
            }}
          >
            {item.name || ""}
          </Text>

          <View style={{ width: "40%", marginVertical: "2%" }}>
            <StarRating
              disabled={true} // Set this to true if you don't want user interaction
              maxStars={5}
              rating={item.rating}
              fullStar={"star"}
              emptyStar={"star"}
              fullStarColor="#FFD600" // Color of the filled stars
              emptyStarColor="#E3E2E6" // Color of the empty stars
              starSize={20} // Size of each star
            />
          </View>

          <Text
            style={{
              color: "#5B5E66",
              fontSize: Typography.FONT_SIZE_12,
              fontWeight: Typography.FONT_WEIGHT_500,
              marginVertical: "2%"
            }}
          >
            {formattedDateTime}
          </Text>
          <Text
            style={{
              color: Colors.LIGHT_ON_SURFACE,
              fontSize: Typography.FONT_SIZE_12,
              fontWeight: Typography.FONT_WEIGHT_400,
              marginVertical: "2%"
            }}
          >
            {item.comment}
          </Text>
        </View>
      </View>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <HorizontalLine style={{ marginVertical: "5%" }} />
      </View>
    </View>
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

export default UserReviewItem
