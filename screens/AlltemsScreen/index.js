import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ScreenComponent = () => {
  const navigation = useNavigation();
  return <View style={styles.container}>
      <View style={styles.section1}>
        <View style={styles.profile}>
          <Image source={null} style={styles.profilePic} />
          <View style={styles.profileInfo}>
            <Text style={styles.fullName}>John Doe</Text>
            <Text style={styles.location}>Location: </Text>
            <Text style={styles.city}>City: </Text>
            <Text style={styles.zipCode}>Zip Code: </Text>
            <Text style={styles.state}>State: </Text>
          </View>
        </View>
        <View style={styles.rating}>
          <Pressable onPress={() => {
          navigation.navigate("ReviewScreen2");
        }}><Text style={styles.averageRating}>4.5</Text></Pressable>
          <Image source={null} style={styles.star} />
        </View>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageText}>Direct Message</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section2}>
        <View style={styles.item}>
          <Image source={null} style={styles.itemPic} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Item Name</Text>
            <Text style={styles.itemCategory}>Category: </Text>
            <Text style={styles.itemDescription}>Description: </Text>
            <Text style={styles.itemLocation}>Location: </Text>
            <Text style={styles.itemCity}>City: </Text>
            <Text style={styles.itemZipCode}>Zip Code: </Text>
            <Text style={styles.itemState}>State: </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.showMoreButton}>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  section1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  profileInfo: {
    justifyContent: 'center'
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  location: {
    fontSize: 14,
    color: '#999'
  },
  city: {
    fontSize: 14,
    color: '#999'
  },
  zipCode: {
    fontSize: 14,
    color: '#999'
  },
  state: {
    fontSize: 14,
    color: '#999'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  averageRating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5
  },
  star: {
    width: 20,
    height: 20
  },
  messageButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  section2: {
    marginBottom: 30
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  itemPic: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  itemInfo: {
    justifyContent: 'center'
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  itemCategory: {
    fontSize: 14,
    color: '#999'
  },
  itemDescription: {
    fontSize: 14,
    color: '#999'
  },
  itemLocation: {
    fontSize: 14,
    color: '#999'
  },
  itemCity: {
    fontSize: 14,
    color: '#999'
  },
  itemZipCode: {
    fontSize: 14,
    color: '#999'
  },
  itemState: {
    fontSize: 14,
    color: '#999'
  },
  showMoreButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  showMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
export default ScreenComponent;