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
import * as ProductsApiService from "../../store/custom/products/api"

import { Colors, Typography, Mixins } from "../../styles"
import {
  ConfirmationModal,
  Header,
  HorizontalLine,
  Select,
  Button,
  Input
} from "../../components"

const { width, height } = Dimensions.get("window")

const ProductReport = props => {
  const navigation = useNavigation()
  const route = useRoute()
  const { product } = route.params

  const [showModal, setShowModal] = useState(false)
  const [selectedReason, setSelectedReason] = useState(false)
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState("")

  const REPORT_REASONS = [
    { id: 1, name: "Spam", type: "SPAM" },
    { id: 2, name: "Pornography", type: "PORNOGRAPHY" },
    { id: 3, name: "Hatred and bulling", type: "HATRED_AND_BULLING" },
    { id: 4, name: "Self-harm", type: "SELF_HARM" },
    {
      id: 5,
      name: "Violent, gory and harmful content",
      type: "VIOLENT_GORY_AND_HARMFUL_CONTENT"
    },
    { id: 6, name: "Child porn", type: "CHILD_PORN" },
    { id: 7, name: "Illegal activities", type: "ILLEGAL_ACTIVITIES" },
    { id: 8, name: "Deceptive content", type: "DECEPTIVE_CONTENT" },
    {
      id: 9,
      name: "Copyright and trademark infringement",
      type: "COPYRIGHT_AND_TRADEMARK_INFRINGEMENT"
    },
    { id: 1, name: "Others", type: "OTHERS" }
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_BG }}>
      <Header bigHeader={"Report"} />

      <View style={{ flex: 1, marginHorizontal: "5%", marginTop: "5%" }}>
        <Text
          style={{
            marginVertical: "5%",
            color: "#5B5E66",
            fontWeight: Typography.FONT_WEIGHT_400,
            fontSize: Typography.FONT_SIZE_16
          }}
        >
          Why are you reporting this?
        </Text>

        <Select
          width={"100%"}
          options={REPORT_REASONS}
          placeholder={"Select Reason"}
          value={selectedReason}
          onValueChange={value => {
            setSelectedReason(value)
          }}
        />

        {selectedReason.type === "OTHERS" && (
          <Input
            width={"100%"}
            onChangeText={value => setComment(value)}
            value={comment}
            placeholder="Comment"
            maxLength={500}
            noOfLines={1}
          />
        )}
      </View>

      <View style={{ marginHorizontal: "3%", marginBottom: "10%" }}>
        <Button
          loading={loading}
          disabled={!selectedReason}
          dark={true}
          onPress={async () => {
            setLoading(true)
            try {
              await ProductsApiService.apiService.flagProduct({
                object_id: product.id,
                reason: selectedReason.type,
                comment:
                  selectedReason.type === "OTHERS"
                    ? comment
                    : selectedReason.type
              })
            } catch (error) {}
            setLoading(false)

            setShowModal(true)
          }}
        >
          Send
        </Button>
      </View>

      <ConfirmationModal
        icon={require("../../assets/success_icon.png")}
        isVisible={showModal}
        onClose={() => {
          setShowModal(false)
          navigation.goBack()
        }}
        header={"Report sent\nsuccessfully"}
        type={"success"}
      />
    </SafeAreaView>
  )
}

export default ProductReport
