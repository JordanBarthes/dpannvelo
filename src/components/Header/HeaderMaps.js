import React from "react";

import { View, Image, Text, TouchableOpacity } from "react-native";

// import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

export default function HeaderMaps({ navigation }) {
  return (
    <View
      style={{
        flex: 3,
        flexDirection: "row",
        alignItems: "flex-end",
        paddingLeft: 17,
        paddingRight: 17
      }}
    >
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            alignItems: "flex-start"
          }}
        >
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() => {}}
            style={{
              backgroundColor: Colors.white,
              borderRadius: 25,
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 7,
              paddingBottom: 6,
              marginBottom: 2
            }}
          >
            <Image
              style={{ width: 23, height: 23, resizeMode: "contain" }}
              source={require("../../assets/icons/Profil.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log("TOUCH")}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: Colors.white,
                borderRadius: 20,
                paddingRight: 9,
                paddingLeft: 9,
                paddingTop: 7,
                paddingBottom: 6
              }}
            >
              {/* <FontAwesome5 size={22} color={Colors.black} name="car" /> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
