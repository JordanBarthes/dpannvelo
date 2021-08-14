import React from "react";

import { View, Image, Text, TouchableOpacity } from "react-native";

import Colors from "../../../constants/Colors";

export default function HeaderDefault({ navigation, title }) {
  return (
    <View
      style={{
        minHeight: 100,
        backgroundColor: Colors.default,
        paddingBottom: 20,
        flexDirection: "row"
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 25,
            bottom: 0
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
            <View>
              <Image
                style={{ width: 22, height: 22, resizeMode: "contain" }}
                source={require("../../assets/arrow.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: Colors.black }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
