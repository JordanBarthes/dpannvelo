import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import Colors from "../../constants/Colors";

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1
      }}
    >
      <View style={{ flex: 7 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingBottom: 20,
            marginLeft: 22
          }}
        >
          <Image
            style={{ borderRadius: 60, width: 120, height: 120, marginTop: 10 }}
            source={require("../assets/image.jpg")}
          />
        </View>
        <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 22 }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 5
            }}
          >
            Bonjour,
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Maxime</Text>
        </View>
        <View
          style={{
            flex: 5,
            borderColor: "red",
            marginLeft: 5,
            borderRadius: 15
          }}
        >
          <DrawerItem
            label="Historique"
            style={{ marginBottom: 10 }}
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate("StackPoint")}
          />

          <DrawerItem
            label="Porte Monnaie"
            style={{ marginBottom: 10 }}
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate("StackPoint")}
          />

          <DrawerItem
            label="Parainage"
            style={{ marginBottom: 10 }}
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate("StackPoint")}
          />

          <DrawerItem
            label="Aide"
            style={{ marginBottom: 10 }}
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate("StackPoint")}
          />

          <DrawerItem
            label="Paramètres du compte"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate("StackPoint")}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerLabel: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default DrawerContent;
