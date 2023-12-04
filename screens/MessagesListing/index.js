import React, { useState, useEffect, useCallback } from "react"
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Platform
} from "react-native"
import { Header, TopAppBar } from "../../components"
import { useSelector } from "react-redux"
import firestore from "@react-native-firebase/firestore"
import ChatRoomCard from "../../components/ChatRoom/ChatRoomCard"
import { useFocusEffect } from "@react-navigation/native"
import SearchChatroom from "../../components/ChatRoom/SearchChatroom"
import { getAllProfiles } from "../../store/custom/auth/auth.slice"
import { useDispatch } from "react-redux"
const MessagesListing = params => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const [allUsers, setAllUsers] = useState([])
  const [chatRooms, setChatrooms] = useState([])
  const user = useSelector(state => state?.Auth?.user)
  const [currentUser] = useState(user?.user)
  const [loading, setLoading] = useState(false)
  const allProfiles = useSelector(state => state?.Auth?.allProfiles)

  const getChatRooms = async () => {
    try {
      const created4s = await firestore()
        .collection("chatroom")
        .where("createdFor", "==", currentUser)
        .get()
      const rooms1 = created4s.docs.map(documentSnapshot => {
        return documentSnapshot.data()
      })
      const createdBye = await firestore()
        .collection("chatroom")
        .where("createdBy", "==", currentUser)
        .get()
      const rooms2 = createdBye.docs.map(documentSnapshot => {
        return documentSnapshot.data()
      })

      setChatrooms(
        [...(rooms1 || []), ...(rooms2 || [])].sort(
          (a, b) => b.lastMessage?.seconds - a.lastMessage?.seconds
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getChatRooms()
    }, [])
  )

  useEffect(async () => {
    await dispatch(getAllProfiles()).unwrap()
    setLoading(false)
  }, [])

  const filterChatrooms = text => {
    const searchText1 = text?.toLowerCase()
    const filtered = chatRooms.filter(item => {
      const otherUser =
        item?.createdBy === currentUser ? item?.createdFor : item?.createdBy

      const otherUserData = allProfiles?.find(v => v.user_id === otherUser)
      return otherUserData?.full_name?.toLowerCase()?.includes(searchText1)
    })
    return searchText ? filtered : chatRooms
  }
  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar />
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Chats</Text>
        <SearchChatroom
          placeholder="Search Chats"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filterChatrooms(searchText)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ChatRoomCard data={item} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },

  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    margin: 5
  },
  inputText: {
    fontSize: 32,
    marginLeft: 15,
    color: "#111112",
    fontWeight: Platform.OS === "ios" ? "500" : "bold",
    lineHeight: 40
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  searchIcon: {
    position: "absolute",
    right: 30,
    top: 35
  },
  newBtn: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    right: 30,
    padding: 20,
    borderRadius: 50,
    elevation: 10,
    shadowColor: "grey"
  },
  UOgJgQgP: {
    color: "#fff"
  }
})
export default MessagesListing
