import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  RefreshControl
} from "react-native"
import { TopAppBar } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { getNotifications } from "../../store/custom/notification/notification.slice"
import NotificationCard from "../../components/Cards/NotificationCard"
import ChatRoomHeader from "../../components/ChatRoom/Header"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"
const NotificationsList = params => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isRefreshing, setRefreshing] = useState(false)
  const notifications = useSelector(
    state => state.AppNotifications.notifications
  )

  const [notificationsData, setNotificationsData] = useState(notifications)
  useEffect(() => {
    getNotificationsData()
  }, [])
  const getNotificationsData = async (api = null) => {
    try {
      setRefreshing(true)
      const res = await dispatch(getNotifications(api)).unwrap()
      console.log(res, "res, res")
      setNotificationsData(
        api
          ? {
              ...res,
              results: [...notificationsData.results, ...res.results].filter(
                (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
              )
            }
          : res
      )
      setRefreshing(false)
      setLoading(false)
    } catch (err) {
      console.log("getNotificationsData - ERROR", err)
      setRefreshing(false)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ChatRoomHeader />
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.container}>
        <KeyboardAwareFlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={getNotificationsData}
            />
          }
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            console.log("opopopop")
            notifications?.next && getNotificationsData(notifications?.next)
          }}
          data={notificationsData?.results}
          renderItem={({ item }) => <NotificationCard data={item} />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scroll: {
    flexGrow: 1
  },
  title: {
    fontSize: 32,
    padding: 20,
    fontWeight: "bold",
    lineHeight: 40
  }
})
export default NotificationsList
