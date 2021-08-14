import React from "react";

import { StyleSheet, View, Text, Animated } from "react-native";

import MenuCarSelect from "../MenuSelection/MenuCarSelect";
import ButtonDefault from "../Button/ButtonDefault";

import Colors from "../../../constants/Colors";

export default function PlaceGone({
  width: WIDTH,
  height: HEIGHT,
  mooveGone,
  orderMap
}) {
  const slidingUpOpacity = orderMap.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
    extrapolate: "clamp"
  });
  const transformStyle = {
    transform: [
      {
        translateY: mooveGone
      }
    ]
  };

  return (
    <Animated.View
      style={[
        {
          backgroundColor: Colors.white,
          position: "absolute",
          top: HEIGHT * 0.55,
          minHeight: HEIGHT * 0.45,
          width: WIDTH,
          opacity: slidingUpOpacity
        },
        transformStyle
      ]}
    >
      <View
        style={{
          padding: 19,
          paddingBottom: 16
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: Colors.black,
            alignItems: "flex-start"
          }}
        >
          Libérer votre place
        </Text>
      </View>
      <View style={{ borderBottomColor: "#EAEAEA", borderBottomWidth: 1 }} />
      <View style={{ padding: 19, paddingTop: 5 }}>
        <MenuCarSelect />
        <View
          style={{
            width: WIDTH / 1.3,
            alignSelf: "center"
          }}
        >
          <Text style={{ fontSize: 15, color: "#717A90" }}>
            Si ce n'est pas le bon véhicule rendez vous
          </Text>
          <Text style={{ fontSize: 15, color: "#717A90" }}>
            dans l’onglet « Véhicules »
          </Text>
        </View>
      </View>
      <ButtonDefault title="Confirmer" handleSend={() => console.log("CLL")} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {}
});
