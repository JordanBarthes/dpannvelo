import React from "react";

import { StyleSheet, View, Text } from "react-native";

export default function SideBar({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>TEST</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
