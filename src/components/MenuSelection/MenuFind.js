import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

// import BottomOrder from "../components/Bottom/BottomOrder";
import Colors from "../../../constants/Colors";

const WIDTH = Dimensions.get("window").width;

const tab = [
  { type: 1, distance: "0.4", price: 180 },
  { type: 3, distance: "0.8", price: 220 },
  { type: 2, distance: "0.9", price: 200 },
  { type: 4, distance: "1.2", price: 210 },
  { type: 1, distance: "4.6", price: 180 },
  { type: 4, distance: "3.0", price: 210 },
  { type: 3, distance: "2.4", price: 200 },
  { type: 1, distance: "7.4", price: 180 }
];

const imagesCar = {
  1: require("../../assets/point.png"),
  2: require("../../assets/point.png"),
  3: require("../../assets/point.png"),
  4: require("../../assets/point.png")
};

export default MenuFind = () => {
  const [select, setSelect] = useState(null);

  return (
    <View style={styles.content}>
      {tab.map((elem, i) => (
        <React.Fragment key={i}>
          <MenuItem elem={elem} select={select} setSelect={setSelect} />

          {/* <Animated.View
        style={[
          styles.containerBottom,
          { transform: [{ translateY: bottomTranslateY }] }
        ]}
      >
        <BottomOrder width={WIDTH} />
      </Animated.View> */}
          {i == 2 && (
            <View style={styles.containerTitle}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Autres véhicules
              </Text>
            </View>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const MenuItem = ({ elem, select, setSelect }) => {
  return (
    <View
      style={{
        minWidth: WIDTH - 60,
        marginBottom: 6,
        backgroundColor: select === elem ? Colors.blueLight : Colors.white,
        borderRadius: 7
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => elem !== select && setSelect(elem)}
      >
        <View style={styles.places}>
          <View style={styles.space}>
            <View>
              <Image
                style={{
                  width: WIDTH / 4,
                  height: WIDTH / 5.5,
                  resizeMode: "contain"
                }}
                source={imagesCar[elem.type]}
              />
            </View>
            <View style={styles.contentText}>
              <Text style={styles.title}>Place moyenne</Text>
              <Text style={styles.subTitle}>{elem.distance} km</Text>
            </View>
          </View>
          <View style={styles.imageContent}>
            <Text style={styles.text}>{elem.price}</Text>
            <Image
              style={{ width: 18, height: 18, marginTop: 2 }}
              source={require("../../assets/point.png")}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 3,
    alignItems: "center"
  },
  containerTitle: {
    padding: 10,
    minWidth: WIDTH - 60,
    alignItems: "flex-start",
    paddingLeft: 15,
    marginBottom: 10,
    marginTop: 25
  },
  contentText: {
    paddingTop: 9,
    paddingBottom: 8,
    width: WIDTH / 2.2,
    paddingLeft: 10
  },
  places: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
    paddingLeft: 8
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  subTitle: {
    fontSize: 14
  },
  imageContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  space: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 3
  }
});
