import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View, ScrollView, SafeAreaView } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import { useNavigation } from "@react-navigation/native"
import AntDesign from "react-native-vector-icons/AntDesign"
import { Colors, Typography } from "../../styles"

const PrivacyPolicyScreen = params => {
  const navigation = useNavigation()
  const { privacyPolicy, api } = useSelector(state => state.AppStart)

  const [lastUpdated, setLastUpdated] = useState(null)
  const [firstPara, setFirstPara] = useState(null)
  const [secondPara, setSecondPara] = useState(null)
  const [thirdPara, setThirdPara] = useState(null)
  useEffect(() => {
    setLastUpdated("dd/mm//yyyy")
    setFirstPara(
      "I understand that uses my dolor sit amet, consectetur adipiscing elit. Viverra auctor laoreet sodales congue sit volutpat quisque. Mattis nisl in convallis sed et. Est turpis aliquam est, ut mattis nisi, amet feugiat. Aliquet odio consequat, nisl mauris ullamcorper malesuada velit sem dolor. Dui morbi porttitor integer felis, pellentesque quam. Et accumsan justo, massa tincidunt arcu fermentum est. Sed nibh id vel, diam ut feugiat nec, placerat mauris. Neque lorem netus lacinia elit est libero sed. Commodo viverra et, neque augue augue mauris, nunc ut nec."
    )
    setSecondPara(
      "I understand that uses my dolor sit amet, consectetur adipiscing elit. Viverra auctor laoreet sodales congue sit volutpat quisque. Mattis nisl in convallis sed et. Est turpis aliquam est, ut mattis nisi, amet feugiat. Aliquet odio consequat, nisl mauris ullamcorper malesuada velit sem dolor. Dui morbi porttitor integer felis, pellentesque quam. Et accumsan justo, massa tincidunt arcu fermentum est. Sed nibh id vel, diam ut feugiat nec, placerat mauris. Neque lorem netus lacinia elit est libero sed. Commodo viverra et, neque augue augue mauris, nunc ut nec."
    )
    setThirdPara(
      "I understand that uses my dolor sit amet, consectetur adipiscing elit. Viverra auctor laoreet sodales congue sit volutpat quisque. Mattis nisl in convallis sed et. Est turpis aliquam est, ut mattis nisi, amet feugiat. Aliquet odio consequat, nisl mauris ullamcorper malesuada velit sem dolor. Dui morbi porttitor integer felis, pellentesque quam. Et accumsan justo, massa tincidunt arcu fermentum est. Sed nibh id vel, diam ut feugiat nec, placerat mauris. Neque lorem netus lacinia elit est libero sed. Commodo viverra et, neque augue augue mauris, nunc ut nec."
    )
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: "3%", marginBottom: "7%" }}>
        <AntDesign
          onPress={() => navigation.goBack()}
          style={{ marginVertical: 20 }}
          name={"arrowleft"}
          size={20}
        />
        <Text
          style={{
            fontSize: Typography.FONT_SIZE_32,
            fontWeight: Typography.FONT_WEIGHT_500
          }}
        >
          Privacy Policy
        </Text>
      </View>

      <ScrollView
        style={{ marginHorizontal: "3%" }}
        showsVerticalScrollIndicator={false}
      >
        {privacyPolicy?.results?.map(
          pp =>
            pp.is_active && (
              <View style={styles.policyContainer}>
                <Text style={styles.policyText}>{pp.body}</Text>
              </View>
            )
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: Colors.MAIN_BG
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
export default PrivacyPolicyScreen
