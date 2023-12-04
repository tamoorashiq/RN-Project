import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
const myItems = [{
  id: 1,
  name: 'Item 1',
  category: 'Category 1',
  description: 'Short summary of item 1',
  image: null
}, {
  id: 2,
  name: 'Item 2',
  category: 'Category 2',
  description: 'Short summary of item 2',
  image: null
}, {
  id: 3,
  name: 'Item 3',
  category: 'Category 3',
  description: 'Short summary of item 3',
  image: null
}];

const TradeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    setSearchText(text);
  };

  return <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" onChangeText={handleSearch} value={searchText} />
        <TouchableOpacity style={styles.addButton}>
          <Pressable onPress={() => {
          navigation.navigate("UploadItemScreen");
        }}><Text style={styles.addButtonText}>Add Item</Text></Pressable>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.categoriesContainer} horizontal={true}>
        {categories.map((category, index) => <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>)}
      </ScrollView>
      <View style={styles.itemsContainer}>
        {myItems.map(item => <TouchableOpacity key={item.id} style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <TouchableOpacity style={styles.detailsButton}>
                <Pressable onPress={() => {
              navigation.navigate("ScreenComponent");
            }}><Text style={styles.detailsButtonText}>See Details</Text></Pressable>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>)}
      </View>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10
  },
  addButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  categoriesContainer: {
    marginBottom: 20
  },
  categoryButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  itemsContainer: {
    flex: 1
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  itemCategory: {
    color: '#3498db',
    marginBottom: 5
  },
  itemDescription: {
    marginBottom: 5
  },
  detailsButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
export default TradeScreen;