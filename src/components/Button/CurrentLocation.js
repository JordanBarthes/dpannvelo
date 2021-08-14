import React from "react";

import { StyleSheet, View, Dimensions } from "react-native";
import { Icon } from 'react-native-elements'
import Colors from "../../../constants/Colors";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function CurrentLocation(props) {
  const cb = props.cb ? props.cb : console.log("NOT Callback");
  const bottom = props.bottom ? props.bottom : 65;

  return (
    <View style={[styles.container, { top: HEIGHT - bottom }]}>
      <Icon
        name="rowing"
        colors={Colors.black}
        size={25}
        onPress={() => cb()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 36,
    height: 36,
    backgroundColor: "#fff",
    left: WIDTH - 55,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
