import React from "react";

import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Text
} from "react-native";
import Colors from "../../../constants/Colors";

export default function ButtonAction(props) {
  const animation = new Animated.Value(0);

  let open = true;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, { toValue, friction: 8 }).start();

    open = !open;
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"]
        })
      }
    ]
  };

  const pinStyle = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80]
        })
      }
    ],
    marginTop: 5
  };

  const thumbStyle = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -145]
        })
      }
    ],
    marginTop: 5
  };

  const other = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -210]
        })
      }
    ],
    marginTop: 5
  };

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  });

  return (
    <View style={[styles.container, props.style]}>
      <TouchableWithoutFeedback>
        <Animated.View
          style={[styles.button, styles.secondary, other, opacity]}
        >
          <Text style={{ width: 20, height: 20, fontSize: 22 }}>+</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View
          style={[styles.button, styles.secondary, thumbStyle, opacity]}
        >
          <Image
            style={{ width: 32, height: 32, resizeMode: "contain" }}
            source={require("../../assets/car.png")}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View
          style={[styles.button, styles.secondary, pinStyle, opacity]}
        >
          <Image
            style={{ width: 32, height: 32, resizeMode: "contain" }}
            source={require("../../assets/car.png")}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <Image
            style={{ width: 32, height: 32, resizeMode: "contain" }}
            source={require("../../assets/car.png")}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute"
  },
  button: {
    position: "absolute",
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F02A4B",
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 10 }
  },
  menu: {
    backgroundColor: Colors.blue
  },
  secondary: {
    width: 55,
    height: 55,
    borderRadius: 65 / 2,
    backgroundColor: Colors.blue
  }
});
