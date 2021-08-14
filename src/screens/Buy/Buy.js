import React from "react";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";

import Colors from "../../../constants/Colors";

const WIDTH = Dimensions.get("window").width;

export default function Buy() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            minWidth: WIDTH - 60,
            marginBottom: 0,
            backgroundColor: Colors.white,
            borderRadius: 10,
            elevation: 0.8,
            padding: 15,
            margin: 30
          }}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <View style={styles.places}>
              <View style={styles.space}>
                <View>
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/point.png")}
                  />
                </View>
                <View style={styles.contentText}>
                  <Text style={styles.title}>200 points</Text>
                  <Text style={styles.subTitle}>1 stationnement</Text>
                </View>
              </View>
              <View style={styles.imageContent}>
                <Text style={styles.text}>1,99€</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            minWidth: WIDTH - 60,
            marginBottom: 0,
            backgroundColor: Colors.white,
            borderRadius: 10,
            elevation: 0.8,
            padding: 15,
            margin: 30
          }}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <View style={styles.places}>
              <View style={styles.space}>
                <View>
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/point.png")}
                  />
                </View>
                <View style={styles.contentText}>
                  <Text style={styles.title}>400 points</Text>
                  <Text style={styles.subTitle}>2 stationnement</Text>
                </View>
              </View>
              <View style={styles.imageContent}>
                <Text style={styles.text}>3,98€</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            minWidth: WIDTH - 60,
            marginBottom: 0,
            backgroundColor: Colors.white,
            borderRadius: 10,
            elevation: 0.8,
            padding: 15,
            margin: 30
          }}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <View style={styles.places}>
              <View style={styles.space}>
                <View>
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/point.png")}
                  />
                </View>
                <View style={styles.contentText}>
                  <Text style={styles.title}>800 points</Text>
                  <Text style={styles.subTitle}>4 stationnement</Text>
                </View>
              </View>
              <View style={styles.imageContent}>
                <Text style={styles.text}>7,96€</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            minWidth: WIDTH - 60,
            marginBottom: 10,
            backgroundColor: Colors.white,
            borderRadius: 10,
            elevation: 0.8,
            padding: 15,
            margin: 30
          }}
        >
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <View style={styles.places}>
              <View style={styles.space}>
                <View>
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      resizeMode: "contain"
                    }}
                    source={require("../../assets/point.png")}
                  />
                </View>
                <View style={styles.contentText}>
                  <Text style={styles.title}>2000 points</Text>
                  <Text style={styles.subTitle}>20 stationnement</Text>
                </View>
              </View>
              <View style={styles.imageContent}>
                <Text style={styles.text}>19,90€</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default
  },
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
    paddingTop: 7,
    paddingBottom: 8,
    width: WIDTH / 2.2,
    paddingLeft: 20
  },
  places: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 8
  },
  title: {
    fontSize: 15,
    fontWeight: "bold"
  },
  subTitle: {
    fontSize: 12
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
    marginRight: 3,
    color: Colors.blue
  }
});
