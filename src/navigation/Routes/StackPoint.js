import React from "react";
import { StyleSheet } from "react-native";

import HeaderDefault from "../../components/Header/HeaderDefault";
import Colors from "../../../constants/Colors";

import Buy from "../../screens/Buy/Buy";

const StackPoint = ({ navigation, stack: Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerNone
      }}
    >
      <Stack.Screen
        name="Money"
        component={Buy}
        options={{
          header: () => (
            <HeaderDefault title="Porte monnaie" navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerNone: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.default
  }
});

export default StackPoint;
