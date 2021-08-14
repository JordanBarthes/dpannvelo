// @ts-nocheck
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";
import Colors from "../../../constants/Colors";
import ButtonDefault from "../../components/Button/ButtonDefault";
import { ScrollView } from "react-native-gesture-handler";

export default function Signin({ navigation }) {
  const [open, setOpen] = useState(false);

  const [select, setSelect] = useState({
    userName: "",
    name: "",
    firstName: ""
  });

  const onSubmit = () => {
    console.log("Submit");
    return navigation.navigate("Maps");
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.default }}>
      <View style={styles.form}>
        <View style={{ paddingBottom: 15 }}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Nom d'utilisateur"
            value={select.userName}
            onChangeText={(userName) => setSelect({ ...select, userName })}
          />
        </View>
        <View style={{ paddingBottom: 15 }}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Nom d'utilisateur"
            value={select.firstName}
            onChangeText={(firstName) => setSelect({ ...select, firstName })}
          />
        </View>
        <View style={{ paddingBottom: 15 }}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Nom d'utilisateur"
            value={select.name}
            onChangeText={(name) => setSelect({ ...select, name })}
          />
        </View>

      </View>
      <ButtonDefault handleSend={() => setOpen(!open)} title="Continuer" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: { padding: 22, marginTop: 22, maxHeight: 1200 }
});
