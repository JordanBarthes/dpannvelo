import React from "react";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";

import Colors from "../../constants/Colors";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PositionDesactived = ({ getPosition }) => {
  const enabledPosition = () => {
    getPosition();
  };

  return (
    <ImageBackground
      style={{
        zIndex: 4,
        position: "absolute",
        width: WIDTH,
        height: HEIGHT
      }}
      source={require("../assets/point.png")}
    >
      <View
        style={{
          marginTop: 120
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            zIndex: 15
          }}
        >
          <View
            style={{
              paddingLeft: 19,
              paddingTop: 16,
              paddingBottom: 16,
              paddingRight: 19,
              backgroundColor: Colors.white,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15
            }}
          >
            <TouchableOpacity onPress={() => enabledPosition()}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.blue,
                  fontWeight: "bold"
                }}
              >
                Activez le services de localisation
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                alignSelf: "center"
              }}
            >
              pour commencer à utiliser Parky
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => enabledPosition()}
            style={[styles.imagePopup, { backgroundColor: Colors.blue }]}
          >
            <Image
              style={{ width: 20, height: 20, resizeMode: "contain" }}
              source={require("../assets/point.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imagePopup: {
    justifyContent: "center",
    paddingLeft: 11,
    paddingRight: 11,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  }
});

export default PositionDesactived;
