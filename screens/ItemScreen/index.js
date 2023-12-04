import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ItemScreen = () => {
  const navigation = useNavigation();
  return <View style={styles.container}>
      <View style={styles.ownerInfo}>
        <Text style={styles.ownerName}>John Doe</Text>
        <Text style={styles.ownerLocation}>New York, NY</Text>
        <TouchableOpacity style={styles.messageButton}>
          <Pressable onPress={() => {
          navigation.navigate("directMessages");
        }}><Text style={styles.buttonText}>Direct Message</Text></Pressable>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewItemsButton}>
          <Pressable onPress={() => {
          navigation.navigate("AlltemsScreen");
        }}><Text style={styles.buttonText}>See All Available Items</Text></Pressable>
        </TouchableOpacity>
      </View>
      <View style={styles.itemInfo}>
        <Image source={null} style={styles.itemImage} />
        <Text style={styles.itemName}>Vintage Leather Jacket</Text>
        <Text style={styles.itemCategory}>Clothing</Text>
        <Text style={styles.itemDescription}>This jacket is made of high-quality leather and has a classic vintage look. It's perfect for any occasion and will last for years to come.</Text>
        <Text style={styles.itemLocation}>New York, NY</Text>
        <Text style={styles.itemValue}>Estimated value: $200</Text>
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
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  ownerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10
  },
  ownerLocation: {
    fontSize: 18,
    color: '#666',
    marginRight: 10
  },
  messageButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10
  },
  viewItemsButton: {
    backgroundColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemInfo: {
    alignItems: 'center'
  },
  itemImage: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  itemCategory: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10
  },
  itemDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  itemLocation: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10
  },
  itemValue: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
export default ItemScreen;