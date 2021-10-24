import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import {Input, ListItem, Avatar} from 'react-native-elements';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';
import {ScrollView} from 'react-native-gesture-handler';
import arrow_down from '../../assets/icons/arrow_down.png';
import RNPickerSelect from 'react-native-picker-select';

import Toast from 'react-native-toast-message';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {GET_USER} from '../../redux/type';
import {ABO_ACTIF, ABO_INACTIF, TYPE_USER} from '../../locale';

export default function SigninNext({route, navigation}) {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
              abonnement: ABO_ACTIF,
              type: TYPE_USER,
              ...select,
            });

          dispatch({
            type: GET_USER,
            payload: {
              id: token.user.uid,
              email: token.user.email,
              abonnement: ABO_ACTIF,
              type: TYPE_USER,
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
        setLoading(false);
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

  const placeholderV = {
    label: 'Type de vélo',
    value: null,
    color: 'black',
  };
  const placeholderF = {
    label: 'Type de freins',
    value: null,
    color: 'black',
  };
  const placeholderA = {
    label: 'Type de chambre a air',
    value: null,
    color: 'black',
  };
  const placeholderR = {
    label: 'Type de roue',
    value: null,
    color: 'black',
  };

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <View style={styles.form}>
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
          <RNPickerSelect
            placeholder={placeholderV}
            style={pickerSelectStyles}
            onValueChange={value => {
              setSelect({...select, velo: value});
            }}
            value={select.velo}
            items={[
              {label: 'Ville', value: 'ville'},
              {label: 'VTT', value: 'vtt'},
            ]}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <RNPickerSelect
            placeholder={placeholderF}
            style={pickerSelectStyles}
            onValueChange={value => {
              setSelect({...select, freins: value});
            }}
            value={select.freins}
            items={[
              {label: 'Disque', value: 'disque'},
              {label: 'Platine', value: 'platine'},
            ]}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <RNPickerSelect
            placeholder={placeholderA}
            style={pickerSelectStyles}
            onValueChange={value => {
              setSelect({...select, air: value});
            }}
            value={select.air}
            items={[
              {label: 'Lent', value: 'lent'},
              {label: 'Rapide', value: 'rapide'},
            ]}
          />
        </View>
        <View style={{marginBottom: 30}}>
          <RNPickerSelect
            placeholder={placeholderR}
            style={pickerSelectStyles}
            onValueChange={value => {
              setSelect({...select, roues: value});
            }}
            value={select.roues}
            items={[
              {label: 'Large', value: 'large'},
              {label: 'Fin', value: 'fin'},
            ]}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    marginTop: 30,
    maxHeight: 1200,
    marginBottom: 30,
    zIndex: -999,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
