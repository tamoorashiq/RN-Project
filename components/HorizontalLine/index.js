import React from "react"
import { View } from "react-native"

const HorizontalLine = ({ width = "100%", color = "#C4C6CF", style = {}, height= 0.5}) => {
  return (
    <View
      style={[
        style,
        {
          width: width,
          borderWidth: height,
          borderColor: color,
          borderRadius: 6
        }
      ]}
    />
  )
}

export default HorizontalLine
