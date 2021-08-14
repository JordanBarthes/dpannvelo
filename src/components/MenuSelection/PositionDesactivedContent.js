import React from "react";
import { View, Text } from "react-native";

// import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

const PositionDesactivedContent = () => {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 25
      }}
    >
      <View style={{ position: "relative" }}>
        {/* <MaterialIcons size={100} color={Colors.black} name="gps-not-fixed" /> */}
        <Text
          style={{
            position: "absolute",
            right: 41,
            fontSize: 35,
            top: 23
          }}
        >
          ?
        </Text>
      </View>
      <View style={{ marginTop: 25, alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: Colors.grey }}>
          Nous sommes désolé, il n’y a aucun résultat à proximité
        </Text>
        <Text style={{ fontSize: 12, color: Colors.grey }}>
          déplacez vous ou ressayez plus tard…
        </Text>
      </View>
    </View>
  );
};

export default PositionDesactivedContent
