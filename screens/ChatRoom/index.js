import React, { useState, useEffect, useRef } from "react"
import { Text, StyleSheet, SafeAreaView, View } from "react-native"
import { Header, TopAppBar } from "../../components"
import { useSelector } from "react-redux"
import ChatRoomHeader from "../../components/ChatRoom/Header"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import ChatInput from "../../components/ChatRoom/ChatInput"
import firestore from "@react-native-firebase/firestore"
import MyBubble from "../../components/ChatRoom/MyBubble"
import OtherBubble from "../../components/ChatRoom/OtherBubble"
import { sendNotification } from "../../store/custom/notification/notification.slice"
import { useDispatch } from "react-redux"
import { getAllProfiles } from "../../store/custom/auth/auth.slice"
const ChatRoom = params => {
  const scrollRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state?.Auth?.user)
  const [currentUser, setCurrentUser] = useState(user?.user)
  const [chatroom, setChatroom] = useState(params?.route?.params?.chatroom)
  const [otherUser, setOtherUser] = useState(params?.route?.params?.user?.user)
  const allProfiles = useSelector(state => state?.Auth?.allProfiles)
  const otherUserByChatroom =
    chatroom?.createdBy === currentUser
      ? chatroom?.createdFor
      : chatroom?.createdBy
  const [otherUserData, setOtherUserData] = useState(null)
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(false)

  // console.log(
  //   // otherUserData,
  //   otherUser,
  //   "otherUserData User",
  //   params?.route?.params?.user,
  //   chatroom
  // )

  const handleFirstMessage = async () => {
    try {
      if (currentUser == otherUser) {
        alert("You can't start a chat with yourself.")
      } else {
        const refId = await firestore().collection("chatroom").doc().id
        const createChatRoom = await firestore()
          .collection("chatroom")
          .doc(refId)
          .set({
            createdBy: currentUser,
            createdFor: otherUser,
            createdAt: new Date(),
            id: refId
          })

        const chatRoomData = await firestore()
          .collection("chatroom")
          .doc(refId)
          .get()
        setChatroom(chatRoomData.data())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMessage = async text => {
    try {
      if (Boolean(text)) {
        setLoading(true)
        const refId = await firestore().collection("chats").doc().id
        const newCHat = await firestore()
          .collection(`chats-${chatroom?.id}`)
          .doc(refId)
          .set({
            chatroomId: chatroom?.id,
            text: text,
            userId: currentUser,
            status: "sent",
            createdAt: new Date(),
            id: refId
          })
        const req = {
          users: [otherUserData?.user_id],
          title: `New Message by ${user.full_name || "User"}`,
          description: text,
          image_url: "",
          link: chatroom?.id,
          chatroomId: chatroom?.id
        }
        console.log(req, "opasd")
        await firestore().collection("chatroom").doc(chatroom?.id).update({
          lastMessage: new Date(),
          message: text
        })
        await dispatch(sendNotification(req)).unwrap()
        setLoading(false)
      } else {
        //    Toast.show({
        //      text2: "Text must be provided",
        //      text1: "Error",
        //      type: "error"
        //    })

        return
      }

      // console.log(newCHat);
    } catch (error) {
      console.log(error, "NEW CHAT")
      setLoading(false)
    }
  }

  const getChatRoom = async () => {
    try {
      const chatroomData = await firestore()
        .collection("chatroom")
        .where("createdFor", "in", [currentUser, otherUser])
        .get()
      const rooms = chatroomData.docs.map(documentSnapshot => {
        return documentSnapshot.data()
      })

      const filtered = rooms.find(
        room => room.createdBy === currentUser || room.createdBy === otherUser
      )
      if (filtered) {
        setChatroom(filtered)
      } else {
        handleFirstMessage()
      }

      // console.log(filtered, 'CHATROOM_PATH', rooms, Platform.OS);
    } catch (error) {
      console.log(error, "ERROR_GETTING_CHATROOM")
    }
  }

  const getChatroomById = async () => {
    try {
      const chatroomData = await firestore()
        .collection("chatroom")
        .where("id", "==", chatroom)
        .get()
      const rooms = chatroomData.docs.map(documentSnapshot => {
        return documentSnapshot.data()
      })

      const filtered = rooms.find(
        room => room.createdBy === currentUser || room.createdBy === otherUser
        //  ||
        // room.createdBy === (otherUser),
      )
      // console.log(filtered, "FILTERED")
      if (filtered) {
        setChatroom(filtered)
      } else {
        handleFirstMessage()
      }

      // console.log(filtered, 'CHATROOM_PATH', rooms, Platform.OS);
    } catch (error) {
      console.log(error, "ERROR_GETTING_CHATROOM")
    }
  }

  useEffect(async () => {
    await dispatch(getAllProfiles()).unwrap()
  }, [])
  useEffect(() => {
    if (chatroom?.id || otherUser) {
      getChatRoom()
    } else {
      if (chatroom) {
        console.log("getChatroomById")
        getChatroomById()
      }
    }
  }, [chatroom])

  useEffect(() => {
    console.log(chatroom?.id, "chatroom?.id")
    if (chatroom?.id) {
      const subscriber = firestore()
        .collection(`chats-${chatroom?.id}`)
        .orderBy("createdAt")
        .onSnapshot(documentSnapshot => {
          setChats([...(documentSnapshot?.docs?.map(v => v.data()) || [])])
        })
      // Stop listening for updates when no longer required
      return () => subscriber()
    }
  }, [chatroom?.id])

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
      const currentChatroom = [...rooms1, ...rooms2].find(
        v => v.id === chatroom
      )

      if (currentChatroom) {
        setChatroom(currentChatroom)
        setOtherUser(
          currentChatroom?.createdBy === currentUser
            ? currentChatroom?.createdFor
            : currentChatroom?.createdBy
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getChatRooms()
  }, [])

  useEffect(() => {
    setOtherUserData(
      allProfiles?.find(v => v.user_id === (otherUser || otherUserByChatroom))
    )
  }, [allProfiles?.length, otherUser])
  return (
    <SafeAreaView style={styles.container}>
      <ChatRoomHeader name={otherUserData?.full_name} />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scroll]}
        ref={scrollRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollRef.current?.scrollToEnd({ animated: false })
        }}
      >
        <View style={[styles.content]}>
          {chats?.map(v => {
            return v.userId === currentUser ? (
              <MyBubble data={v} key={v.id} />
            ) : (
              <OtherBubble data={v} key={v.id} otherProfile={otherUserData} />
            )
          })}
        </View>
        <ChatInput onSubmit={handleMessage} loading={loading} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9FD"
  },
  scroll: { flexGrow: 1 },
  content: {
    flex: 1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  btn: {
    marginTop: 20
  },
  chat: {
    marginLeft: 20,
    width: 23,
    height: 23,
    resizeMode: "contain"
  }
})
export default ChatRoom
