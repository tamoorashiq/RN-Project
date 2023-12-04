import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Colors } from "../../styles"

const WelcomeScreen = () => {
 
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/BigIcon.png")}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BG,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "30%",
    height: null,
    resizeMode: "contain",
    aspectRatio: 1
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16
  },
  subtitle: {
    fontSize: 18,
    color: "#666"
  }
})
export default WelcomeScreen
