import React, { useState } from "react"
import {
  Dimensions,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from "react-native"
import { Colors, Typography, Mixins } from "../../styles"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const Input = props => {
  const {
    iconLeft = null,
    iconRight = null,
    error = null,
    selectedBorderColor = Colors.DARK_OUTLINE,
    isMultiLine = false,
    iconRightClick = () => {}
  } = props
  const large = !props.width ? width / 1.1 : props.width
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <View
        style={{
          marginTop: Mixins.scaleSize(5),
          marginBottom: Mixins.scaleSize(15),
          width: large
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: isFocused ? 1.3 : 0.3,
            borderColor: isFocused
              ? selectedBorderColor
              : error
              ? "red"
              : Colors.BLACK
          }}
        >
          <TextInput
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            style={{
              color: Colors.BLACK,
              paddingLeft: iconLeft ? 0 : 15,
              paddingRight: 15,
              flex: iconLeft ? (iconRight ? 0.6 : 0.8) : 1,
              fontSize: Typography.FONT_SIZE_16,
              fontWeight: Typography.FONT_WEIGHT_400,
              fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
              height: isMultiLine ? null : height * 0.06,
              minHeight: height * 0.06,
              alignSelf: "center",
              // textAlign: "justify"
            }}
            multiline={isMultiLine}
            placeholderTextColor={Colors.LIGHT}
          />

          {props.value?.length > 0 && (
            <View
              style={{
                position: "absolute",
                top: -10,
                left: 15,
                backgroundColor: Colors.MAIN_BG
              }}
            >
              <Text
                style={{
                  marginHorizontal: 5,
                  fontSize: Typography.FONT_SIZE_12,
                  fontWeight: Typography.FONT_WEIGHT_500,
                  fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
                  color: isFocused ? Colors.DARK_OUTLINE : Colors.LIGHT
                }}
              >
                {props.placeholder}
              </Text>
            </View>
          )}

          {iconRight && (
            <TouchableOpacity
              onPress={iconRightClick}
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {iconRight}
            </TouchableOpacity>
          )}
        </View>
        {!!error && (
          <Text
            style={{
              marginTop: "1%",
              marginLeft: "2%",
              textAlign: "left",
              fontSize: Typography.FONT_SIZE_12,
              color: Colors.LIGHT_ERROR
              // fontFamily: Typography.FONT_FAMILY_POPPINS_LIGHT
            }}
          >
            {error}
          </Text>
        )}
      </View>
    </>
  )
}

export default Input
