import React from "react";

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Colors from "../../../constants/Colors";

const HEIGHT = Dimensions.get("window").height;

export default function ButtonDefault({ title, handleSend }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonContain}
        onPress={() => handleSend()}
      >
        <Text style={{ color: Colors.white, fontSize: 20 }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonContain: {
    backgroundColor: Colors.blue,
    height: HEIGHT * 0.076,
    borderRadius: 25,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});
