import React from "react"
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native"
import { Typography, Colors, Mixins } from "../../styles"

const width = Dimensions.get("window").width

const Button = ({
  disabled = false,
  loading = false,
  loadingColor = false,
  children,
  onPress,
  dark,
  confimation = false
}) => {
  const containerCommonStyle = {
    backgroundColor:
      dark === true
        ? Colors.PRIMARY_50
        : confimation
        ? Colors.MAIN_BG
        : Colors.LIGHT_SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: "5%"
  }

  const disableContainerCommonStyle = {
    backgroundColor: dark === true ? Colors.PRIMARY_50 : Colors.LIGHT_SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: "5%",
    opacity: 0.7
  }

  const textCommonStyle = {
    marginVertical: 15,
    color:
      dark === true
        ? Colors.WHITE
        : confimation
        ? Colors.PRIMARY_50
        : Colors.BLACK,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: confimation
      ? Typography.FONT_WEIGHT_BOLD
      : Typography.FONT_WEIGHT_500
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={disabled || loading}>
      <View
        style={[disabled ? disableContainerCommonStyle : containerCommonStyle]}
      >
        {loading ? (
          <ActivityIndicator
            style={{ marginVertical: 15 }}
            color={loadingColor ? loadingColor : Colors.WHITE}
          />
        ) : (
          <Text style={[textCommonStyle]}> {children} </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Button
