import React, { useEffect } from "react"
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView
} from "react-native"

import * as ProductsApiService from "./../../store/custom/products/api"

import { Input, Button } from "./../index"
import { Colors, Typography, Mixins } from "../../styles"
import Entypo from "react-native-vector-icons/Entypo"
import StarRating from "react-native-star-rating"

const height = Dimensions.get("window").height

const RateUserModal = ({ isVisible, onClose, user }) => {
  const [stars, setStars] = React.useState(0)
  const [reviewText, setReviewText] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          backgroundColor: Colors.BLACK,
          opacity: 0.3,
          height: "100%",
          width: "100%",
          position: "absolute"
        }}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "flex-end"
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            backgroundColor: Colors.MAIN_BG,
            alignItems: "center",
            width: "100%",
            paddingTop: "5%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: "5%" // Add padding at the bottom for better appearance
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: 20
            }}
          >
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: Typography.FONT_SIZE_22,
                fontWeight: Typography.FONT_WEIGHT_500
              }}
            >
              {`Rate ${user.full_name ? user.full_name : "user"}`}
            </Text>
            <Entypo
              size={25}
              onPress={() => {
                setStars(0)
                setReviewText("")
                onClose()
              }}
              name={"cross"}
              color={Colors.BLACK}
            />
          </View>

          <View style={{ width: "60%", paddingVertical: "10%" }}>
            <StarRating
              selectedStar={rating => setStars(rating)}
              maxStars={5}
              rating={stars}
              fullStar={"star"}
              emptyStar={"star"}
              fullStarColor="#FFD600" // Color of the filled stars
              emptyStarColor="#E3E2E6" // Color of the empty stars
              starSize={35} // Size of each star
            />
          </View>

          <Text style={{ alignSelf: "flex-start", marginHorizontal: "5%" }}>
            Give Review
          </Text>

          <View style={{ width: "90%", marginTop: "3%" }}>
            <Input
              textAlignVertical="top"
              width={"100%"}
              onChangeText={value => setReviewText(value)}
              value={reviewText}
              placeholder="Description"
              isMultiLine={true}
              numberOfLines={5}
            />
          </View>

          <View
            style={{
              marginHorizontal: "5%",
              marginBottom: "10%",
              width: "90%"
            }}
          >
            <Button
              loading={loading}
              disabled={reviewText === ""}
              onPress={async () => {
                setLoading(true)
                const resp = await ProductsApiService.apiService.addUserReviews(
                  {
                    user: user.user,
                    rating: stars,
                    comment: reviewText
                  }
                )
                setLoading(false)
                setStars(0)
                setReviewText("")
                onClose()
              }}
              dark={true}
            >
              Rate Now
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default RateUserModal
