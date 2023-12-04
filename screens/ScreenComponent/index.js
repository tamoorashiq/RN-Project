import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const ScreenComponent = () => {
  const [itemPhotos, setItemPhotos] = useState([{
    id: 1,
    uri: 'https://dummyimage.com/300x300/000/fff'
  }, {
    id: 2,
    uri: 'https://dummyimage.com/300x300/000/fff'
  }, {
    id: 3,
    uri: 'https://dummyimage.com/300x300/000/fff'
  }, {
    id: 4,
    uri: 'https://dummyimage.com/300x300/000/fff'
  }, {
    id: 5,
    uri: 'https://dummyimage.com/300x300/000/fff'
  }, {
    id: 6,
    uri: 'https://dummyimage.com/300x300/000/fff'
  }]);
  return <View style={_styles.nAoBuuka}>
      <View style={_styles.yOcGOEEZ}>
        <Image source={{
        uri: 'https://dummyimage.com/300x300/000/fff'
      }} style={_styles.htLzgVsT} />
        <Text style={_styles.PLztlTzr}>
          Item Name
        </Text>
        <Text style={_styles.STKjldrj}>Category</Text>
        <Text style={_styles.VsyIEHeD}>
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed euismod, sapien vel bibendum bibendum, velit sapien bibendum
          sapien, vel bibendum sapien sapien vel bibendum bibendum, velit sapien
          bibendum sapien, vel bibendum sapien
        </Text>
        <Text style={_styles.zAxEmBcD}>Location: Home</Text>
        <Text style={_styles.EGQSxevL}>City: New York</Text>
        <Text style={_styles.QRpBRXEB}>Zip Code: 10001</Text>
        <Text style={_styles.KmYvrZfn}>State: NY</Text>
        <Text style={_styles.DHTSTeNo}>
          Estimated value: $1000
        </Text>
      </View>
      <View style={_styles.hAaqZPIg}>
        <ScrollView horizontal={true}>
          {itemPhotos.map(photo => <View key={photo.id} style={_styles.dFJDWOrB}>
              <TouchableOpacity>
                <Image source={{
              uri: photo.uri
            }} style={_styles.uOYVtAOi} />
              </TouchableOpacity>
              <View style={_styles.RwBKpugw}>
                <TouchableOpacity>
                  <Text style={_styles.MEWejXjF}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={_styles.oeutjxVS}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>)}
          <TouchableOpacity style={_styles.ufMihJoA}>
            <Text style={_styles.WdXztVrh}>+</Text>
            <Text style={_styles.oPVfwRxn}>Upload new</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};

export default ScreenComponent;

const _styles = StyleSheet.create({
  nAoBuuka: {
    flex: 1,
    backgroundColor: "#fff"
  },
  yOcGOEEZ: {
    alignItems: "center",
    marginTop: 20
  },
  htLzgVsT: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  PLztlTzr: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10
  },
  STKjldrj: {
    fontSize: 18,
    marginTop: 5
  },
  VsyIEHeD: {
    fontSize: 16,
    marginTop: 5
  },
  zAxEmBcD: {
    fontSize: 16,
    marginTop: 5
  },
  EGQSxevL: {
    fontSize: 16,
    marginTop: 5
  },
  QRpBRXEB: {
    fontSize: 16,
    marginTop: 5
  },
  KmYvrZfn: {
    fontSize: 16,
    marginTop: 5
  },
  DHTSTeNo: {
    fontSize: 16,
    marginTop: 5
  },
  hAaqZPIg: {
    marginTop: 20
  },
  dFJDWOrB: {
    marginRight: 10
  },
  uOYVtAOi: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  RwBKpugw: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  MEWejXjF: {
    color: "red"
  },
  oeutjxVS: {
    color: "red"
  },
  ufMihJoA: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center"
  },
  WdXztVrh: {
    fontSize: 24
  },
  oPVfwRxn: {
    fontSize: 16
  }
});