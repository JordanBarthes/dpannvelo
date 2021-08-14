import React from "react";

import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

// import { MaterialIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;

const MenuCarSelect = () => {
  return (
    <View style={[styles.places]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View style={styles.space}>
          <Image
            style={{
              width: WIDTH / 4,
              height: WIDTH / 5.5,
              resizeMode: "contain"
            }}
            source={require('../../assets/point.png')}
          />
          <View style={styles.contentText}>
            <Text style={styles.title}>Clio (Orange)</Text>
            <Text style={styles.subTitle}>Plaque : FA-235-FB</Text>
          </View>
        </View>
        <View>
          {/* <MaterialIcons color={Colors.blue} size={27} name="check-circle" /> */}
        </View>
      </View>
    </View>
  );
};

export default MenuCarSelect

const styles = StyleSheet.create({
  contentText: {
    marginLeft: 10
  },
  places: {
    paddingTop: 9,
    paddingBottom: 5,
    marginBottom: 3
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black
  },
  subTitle: {
    fontSize: 14
  },
  imageContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  space: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 3,
    color: Colors.black
  }
});
