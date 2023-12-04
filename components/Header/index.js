import React, { useState, useEffect } from "react"
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image

} from "react-native"
import { Colors, Typography } from "../../styles"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Header = ({
  bigHeader,
  smallHeader,
  showFlag = false,
  onFlagPress,
  showMyProductItems = null,
  onMyItemDelete,
  onMyItemEdit
}) => {
  const navigation = useNavigation()

  return (
    <View
      style={{
        marginHorizontal: "3%",
        flexDirection: smallHeader ? "row" : "column",
        alignItems: smallHeader ? "center" : "flex-start"
      }}
    >
      {
        <View
          style={{
            flexDirection: showFlag || showMyProductItems ? "row" : "column",
            width: smallHeader ? null : "100%",
            alignItems: showFlag || showMyProductItems ? "center" : "flex-start"
          }}
        >
          <AntDesign
            onPress={() => navigation.goBack()}
            style={{
              marginVertical: 20,
              flex: showFlag || showMyProductItems ? 1 : 0
            }}
            name={"arrowleft"}
            size={20}
          />

          {showFlag && (
            <View style={{}}>
              <TouchableOpacity onPress={onFlagPress} style={{}}>
                <MaterialCommunityIcons name={"flag-outline"} size={30} />
              </TouchableOpacity>
            </View>
          )}

          {showMyProductItems && (
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <TouchableOpacity onPress={onMyItemDelete} style={{}}>
                <Image
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                  source={require("../../assets/deleteIcon.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{}} onPress={onMyItemEdit}>
                <Image
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                  source={require("../../assets/editIcon.png")}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      }
      {bigHeader && (
        <Text
          style={{
            fontSize: Typography.FONT_SIZE_32,
            fontWeight: Typography.FONT_WEIGHT_500
          }}
        >
          {bigHeader}
        </Text>
      )}
      {smallHeader && (
        <Text
          style={{
            marginLeft: "5%",
            fontSize: Typography.FONT_SIZE_22,
            fontWeight: Typography.FONT_WEIGHT_500
          }}
        >
          {smallHeader}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BG,
    padding: 20,
    paddingHorizontal: 30
  },
  lastUpdated: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bold: {
    fontWeight: "bold"
  },
  policyContainer: {
    marginTop: 10
  },
  policyText: {
    lineHeight: 20,
    textAlign: "justify"
  }
})
export default Header
