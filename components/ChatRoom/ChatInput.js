import React, { useState, useRef } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native"

import Ionicons from "react-native-vector-icons/Ionicons"
import { LIGHT_SURFACE, PRIMARY_50 } from "../../styles/colors"
import EMOJI_ICON from "./../../assets/emoji.png"
import { Image } from "react-native"
import EmojiPicker from "rn-emoji-keyboard"

const ChatInput = ({ onSubmit, loading = false, ...props }) => {
  const [text, setText] = useState("")
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const handlePick = emojiObject => {
    console.log(emojiObject)
    setText(`${text}${emojiObject.emoji}`)
    /* example emojiObject = {
        "emoji": "❤️",
        "name": "red heart",
        "slug": "red_heart",
        "unicode_version": "0.6",
      }
    */
  }
  const handleSubmit = () => {
    if (text) {
      onSubmit(text)
      setText("")
      setError(false)
    } else {
      setError(true)
    }
  }
  return (
    <View style={styles.chatInput}>
      <View style={[styles.container, error && styles.error]}>
        <View style={[styles.inputContainer]}>
          <TextInput
            style={[styles.input]}
            {...props}
            placeholderTextColor={"#5B5E66"}
            placeholder="Aa"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <Image source={EMOJI_ICON} style={styles.emoji} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.iconBtn}
        disabled={loading}
        onPress={handleSubmit}
      >
        <Ionicons name="send" size={24} color={PRIMARY_50} />
      </TouchableOpacity>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </View>
  )
}

export default ChatInput

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: 'center',
    padding: Platform.OS === "ios" ? 5 : 0,
    // paddingHorizontal: 20,
    borderRadius: 20,
    margin: 10,
    flex: 1,
    backgroundColor: LIGHT_SURFACE
  },

  inputContainer: {
    flex: 1,
    paddingHorizontal: 10,
    minHeight: Platform.OS === "android" ? 40 : 30,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#5B5E66"
  },
  error: {
    borderWidth: 1,
    borderColor: "#BA1A1A"
  },

  chatInput: {
    flexDirection: "row",
    alignItems: "center"
    // marginBottom: 15
  },

  iconBtn: {
    padding: 10,
    marginRight: 10
  },
  emoji: { width: 20, height: 20, resizeMode: "contain" }
})
