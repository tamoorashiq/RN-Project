import React, { useRef, useEffect } from "react"
import { StyleSheet, Dimensions, Image, View, Text } from "react-native"
import SelectDropdown from "react-native-select-dropdown"
import { Colors, Typography, Mixins } from "../../styles"
import DropDownIcon from "../../assets/DropDownIcon.png"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const Select = props => {
  const dropdownRef = useRef({})

  const { options = [], onValueChange = null, placeholder = "" } = props

  const large = !props.width ? width / 1.1 : props.width

  useEffect(() => {
    if(!props.value){
      dropdownRef.current.reset()
    }

  }, [props.value])

  return (
    <View>
      <SelectDropdown
        ref={dropdownRef}
        data={options}
        defaultValue={props.value}
        value={props.value}
        defaultButtonText={placeholder}
        onSelect={(selectedItem, index) => onValueChange(selectedItem)}
        dropdownIconPosition={"right"}
        renderDropdownIcon={() => {
          return (
            <Image
              style={{ width: 30, height: 30, marginRight: "2%" }}
              resizeMode={"contain"}
              source={DropDownIcon}
            />
          )
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name
        }}
        buttonStyle={{
          marginBottom: Mixins.scaleSize(20),
          alignItems: "center",
          height: height * 0.06,
          width: large,

          borderRadius: 10,
          borderWidth: 0.3,
          borderColor: Colors.BLACK,
          backgroundColor: Colors.MAIN_BG
        }}
        buttonTextStyle={styles.buttonTextStyle}
        rowStyle={styles.rowStyle}
        rowTextStyle={styles.rowTextStyle}
      />

      {props.value?.length > 0 ||
        (typeof props.value === "object" && (
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
                color: Colors.LIGHT
              }}
            >
              {props.placeholder}
            </Text>
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {},
  buttonTextStyle: {
    textAlign: "left",
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_400,
    fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
    color: Colors.LIGHT
  },
  rowStyle: {
    backgroundColor: "white"
  },
  rowTextStyle: {
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: Typography.FONT_WEIGHT_500,
    fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
    color: Colors.GRAY_MEDIUM
  }
})

export default Select
