import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';

const UploadItemScreen = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  return <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Item Profile Image</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={itemValue => setCategory(itemValue)} style={styles.picker}>
          <Picker.Item label="Category 1" value="category1" />
          <Picker.Item label="Category 2" value="category2" />
          <Picker.Item label="Category 3" value="category3" />
        </Picker>
      </View>
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <View style={styles.locationContainer}>
        <TextInput style={styles.locationInput} placeholder="City" value={city} onChangeText={setCity} />
        <TextInput style={styles.locationInput} placeholder="Zip Code" value={zipCode} onChangeText={setZipCode} />
        <TextInput style={styles.locationInput} placeholder="State" value={state} onChangeText={setState} />
      </View>
      <TextInput style={styles.input} placeholder="Estimated Value" value={estimatedValue} onChangeText={setEstimatedValue} keyboardType="numeric" />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20
  },
  picker: {
    height: 50,
    width: '100%'
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  locationInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '30%'
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
export default UploadItemScreen;