import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Input, ListItem, Avatar} from 'react-native-elements';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';
import {ScrollView} from 'react-native-gesture-handler';
import arrow_down from '../../assets/icons/arrow_down.png';

import Toast from 'react-native-toast-message';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {GET_USER} from '../../redux/type';

export default function SigninNext({route, navigation}) {
  const [selectedVelo, setSelectedVelo] = useState(false);
  const [selectedFreins, setSelectedFreins] = useState(false);
  const [selectedAir, setSelectedAir] = useState(false);
  const [selectedRoues, setSelectedRoues] = useState(false);

  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({email: '', password: ''});

  useEffect(() => {
    const {email, password} = route.params;
    console.log('*****Email******', email, password);

    setLoginData({email, password});
  }, []);

  const [select, setSelect] = useState({
    userName: '',
    name: '',
    firstName: '',
    velo: '',
    freins: '',
    air: '',
    roues: '',
  });

  const onSubmit = () => {
    console.log('UserSubmit');
    if (
      select.userName.length < 1 ||
      select.name.length < 2 ||
      select.name.length > 26 ||
      select.firstName.length < 2
    ) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Error data',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }
    console.log('User');

    auth()
      .createUserWithEmailAndPassword(loginData.email, loginData.password)
      .then(async token => {
        console.log('User account created & signed in!');

        try {
          await firestore()
            .collection('users')
            .doc(token.user.uid)
            .set({
              id: token.user.uid,
              email: token.user.email,
              ...select,
            });

          dispatch({
            type: GET_USER,
            payload: {
              id: token.user.uid,
              email: token.user.email,
              ...select,
            },
          });
        } catch (err) {
          console.error(err);
          throw err;
        }
      })
      .catch(error => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          return Toast.show({
            type: 'error',
            text1: 'Sorry',
            text2: 'That email address is already in use!',
          });
        }

        if (error.code === 'auth/invalid-email') {
          return Toast.show({
            type: 'error',
            text1: 'Sorry',
            text2: 'That email address is invalid!',
          });
        }

        return Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Error contact dpannvelo',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {},
          onPress: () => {},
        });
      });
  };

  const listFreins = [
    {name: 'Football', subtitle: 'football'},
    {name: 'Baseball', subtitle: 'baseball'},
    {name: 'Hockey', subtitle: 'hockey'},
  ];
  const list = [
    {
      name: 'Type de vélo',
      subtitle: 'Sélectionner',
      choice: [
        {label: 'Football', value: 'football'},
        {label: 'Baseball', value: 'baseball'},
        {label: 'Hockey', value: 'hockey'},
      ],
    },
    {
      name: 'Type de freins',
      subtitle: 'Sélectionner',
      choice: [
        {label: 'Football', value: 'football'},
        {label: 'Baseball', value: 'baseball'},
        {label: 'Hockey', value: 'hockey'},
      ],
    },
    {
      name: 'Taille de chambre à air',
      subtitle: 'Sélectionner',
      choice: [
        {label: 'Football', value: 'football'},
        {label: 'Baseball', value: 'baseball'},
        {label: 'Hockey', value: 'hockey'},
      ],
    },
    {
      name: 'Type de roues',
      subtitle: 'Sélectionner',
      choice: [
        {label: 'Football', value: 'football'},
        {label: 'Baseball', value: 'baseball'},
        {label: 'Hockey', value: 'hockey'},
      ],
    },
  ];

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
      <View style={styles.form}>
        <Toast ref={ref => Toast.setRef(ref)} />
        <View>
          <Input
            textAlign="left"
            placeholder="pseudo"
            label="Username"
            value={select.userName}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            inputStyle={{marginBottom: -5}}
            onChangeText={userName => setSelect({...select, userName})}
          />
        </View>
        <View>
          <Input
            textAlign="left"
            placeholder="john"
            label="Firstname"
            value={select.firstName}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            inputStyle={{marginBottom: -5}}
            onChangeText={firstName => setSelect({...select, firstName})}
          />
        </View>
        <View>
          <Input
            textAlign="left"
            placeholder="smith"
            label="Name"
            value={select.name}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            inputStyle={{marginBottom: -5}}
            onChangeText={name => setSelect({...select, name})}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <ListItem.Accordion
            noIcon={true}
            // containerStyle={{backgroundColor: Colors.blueLight}}
            content={
              <>
                <ListItem.Content
                  style={{
                    paddingBottom: -25,
                    paddingLeft: 10,
                    paddingTop: 10,
                    margin: -15,
                  }}>
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
            }}>
            {listFreins.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setSelectedVelo(!selectedVelo);
                  setSelect({...select, velo: l.name});
                }}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </View>
        <View style={{marginBottom: 15}}>
          <ListItem.Accordion
            noIcon={true}
            // containerStyle={{backgroundColor: Colors.blueLight}}
            content={
              <>
                <ListItem.Content
                  style={{
                    paddingLeft: 10,
                    margin: -15,
                    marginBottom: -15,
                  }}>
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
            }}>
            {listFreins.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setSelectedFreins(!selectedFreins);
                  setSelect({...select, freins: l.name});
                }}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </View>
        <View style={{marginBottom: 15}}>
          <ListItem.Accordion
            noIcon={true}
            // containerStyle={{backgroundColor: Colors.blueLight}}
            content={
              <>
                <ListItem.Content
                  style={{
                    paddingBottom: -25,
                    paddingLeft: 10,
                    paddingTop: 10,
                    margin: -15,
                  }}>
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
            }}>
            {listFreins.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setSelectedAir(!selectedAir);
                  setSelect({...select, air: l.name});
                }}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </View>

        <View style={{marginBottom: 30}}>
          <ListItem.Accordion
            noIcon={true}
            // containerStyle={{backgroundColor: Colors.blueLight}}
            content={
              <>
                <ListItem.Content
                  style={{
                    paddingBottom: -25,
                    paddingLeft: 10,
                    paddingTop: 10,
                    margin: -15,
                  }}>
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
            }}>
            {listFreins.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  setSelectedRoues(!selectedRoues);
                  setSelect({...select, roues: l.name});
                }}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        </View>
        <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {padding: 20, marginTop: 50, maxHeight: 1200, marginBottom: 30},
});
