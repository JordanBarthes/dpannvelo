// @ts-nocheck
import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Input, ListItem, Avatar } from "react-native-elements";
import Colors from "../../../constants/Colors";
import ButtonDefault from "../../components/Button/ButtonDefault";
import { ScrollView } from "react-native-gesture-handler";
import arrow_down from "../../assets/icons/arrow_down.png";

export default function Login({ navigation }) {
  const [open, setOpen] = useState(false);
  const [selectedVelo, setSelectedVelo] = useState(false);
  const [selectedFreins, setSelectedFreins] = useState(false);
  const [selectedAir, setSelectedAir] = useState(false);
  const [selectedRoues, setSelectedRoues] = useState(false);

  const [select, setSelect] = useState({
    userName: "",
    name: "",
    firstName: "",
    velo: "",
    freins: "",
    air: "",
    roues: ""
  });

  const onSubmit = () => {
    console.log("Submit");
    return navigation.navigate("Maps");
  };

  const listFreins = [
    { name: "Football", subtitle: "football" },
    { name: "Baseball", subtitle: "baseball" },
    { name: "Hockey", subtitle: "hockey" }
  ];
  const list = [
    {
      name: "Type de vélo",
      subtitle: "Sélectionner",
      choice: [
        { label: "Football", value: "football" },
        { label: "Baseball", value: "baseball" },
        { label: "Hockey", value: "hockey" }
      ]
    },
    {
      name: "Type de freins",
      subtitle: "Sélectionner",
      choice: [
        { label: "Football", value: "football" },
        { label: "Baseball", value: "baseball" },
        { label: "Hockey", value: "hockey" }
      ]
    },
    {
      name: "Taille de chambre à air",
      subtitle: "Sélectionner",
      choice: [
        { label: "Football", value: "football" },
        { label: "Baseball", value: "baseball" },
        { label: "Hockey", value: "hockey" }
      ]
    },
    {
      name: "Type de roues",
      subtitle: "Sélectionner",
      choice: [
        { label: "Football", value: "football" },
        { label: "Baseball", value: "baseball" },
        { label: "Hockey", value: "hockey" }
      ]
    }
  ];

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
        <View style={{ paddingBottom: 15 }}>
          <ListItem.Accordion
            noIcon={true}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>Type de vélo</ListItem.Title>
                  <ListItem.Subtitle>{select.velo}</ListItem.Subtitle>
                </ListItem.Content>
              </>
            }
            isExpanded={selectedVelo}
            onPress={() => {
              setSelectedAir(false);
              setSelectedRoues(false);
              setSelectedFreins(false);
              setSelectedVelo(!selectedVelo);
            }}
          >
            {list.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setSelectedVelo(!selectedVelo);
                  setSelect({ ...select, velo: l.name });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </View>
        <View style={{ paddingBottom: 15 }}>
          <ListItem.Accordion
            noIcon={true}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>Type de freins</ListItem.Title>
                  <ListItem.Subtitle>{select.freins}</ListItem.Subtitle>
                </ListItem.Content>
                <Avatar src={arrow_down}></Avatar>
              </>
            }
            isExpanded={selectedFreins}
            onPress={() => {
              setSelectedAir(false);
              setSelectedRoues(false);
              setSelectedVelo(false);
              setSelectedFreins(!selectedFreins);
            }}
          >
            {listFreins.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setSelectedFreins(!selectedFreins);
                  setSelect({ ...select, freins: l.name });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </View>
        <View style={{ paddingBottom: 15 }}>
          <ListItem.Accordion
            noIcon={true}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>Type de chambre a aire</ListItem.Title>
                  <ListItem.Subtitle>{select.air}</ListItem.Subtitle>
                </ListItem.Content>
              </>
            }
            isExpanded={selectedAir}
            onPress={() => {
              setSelectedRoues(false);
              setSelectedFreins(false);
              setSelectedVelo(false);
              setSelectedAir(!selectedAir);
            }}
          >
            {list.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setSelectedAir(!selectedAir);
                  setSelect({ ...select, air: l.name });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </View>

        <View style={{ paddingBottom: 15 }}>
          <ListItem.Accordion
            noIcon={true}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>Type de roues</ListItem.Title>
                  <ListItem.Subtitle>{select.roues}</ListItem.Subtitle>
                </ListItem.Content>
              </>
            }
            isExpanded={selectedRoues}
            onPress={() => {
              setSelectedAir(false);
              setSelectedVelo(false);
              setSelectedFreins(false);
              setSelectedRoues(!selectedRoues);
            }}
          >
            {list.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setSelectedRoues(!selectedRoues);
                  setSelect({ ...select, roues: l.name });
                }}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </View>
      </View>
      <ButtonDefault handleSend={() => setOpen(!open)} title="Continuer" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: { padding: 22, marginTop: 22, maxHeight: 1200 }
});
