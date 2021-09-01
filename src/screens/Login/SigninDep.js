// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

//Dependance
import auth from '@react-native-firebase/auth';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';

import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';

export default function SigninDep({navigation}) {
  const [select, setSelect] = useState({
    email: '',
    password: '',
    confirm: '',
    firstname: '',
    name: '',
  });

  useEffect(() => {
    // Toast.show({
    //   text1: 'Hello',
    //   text2: 'This is some something 👋',
    // });
  }, []);

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = () => {
    if (
      (select?.firstname.length < 3 && select?.firstname.length <= 24) ||
      (select?.name.length < 3 && select?.name.length <= 24)
    ) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Error name or firstname, minimum length 3 max 24',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }

    if (!validateEmail(select.email)) {
      setSelect({...select, select: ''});
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Error email',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }

    if (
      select.password &&
      select.password.length < 8 &&
      select.password.length <= 16
    ) {
      setSelect({...select, password: '', confirm: ''});
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Error password, minimum length 8 max 16',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }

    if (select.password !== select.confirm) {
      setSelect({...select, password: '', confirm: ''});
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Error password different to confirm password',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }

    //   auth()
    // .signOut()
    // .then(() => console.log('User signed out!'));

    auth()
      .createUserWithEmailAndPassword(select.email, select.password)
      .then(() => {
        console.log('User account created & signed in!');
        Toast.show({
          text1: 'Good',
          text2: 'Welcome to dpannvelo 👋',
        });
        return navigation.navigate('SigninNextDep');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);

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

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
      <View style={styles.form}>
        <Toast ref={ref => Toast.setRef(ref)} />
        <Text style={styles.title}>CRÉEZ UN COMPTE DÉPANNEUR</Text>
        <View style={{paddingBottom: 5}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Nom"
            value={select.name}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            onChangeText={name => setSelect({...select, name})}
          />
        </View>
        <View style={{paddingBottom: 5}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Prénom"
            value={select.firstname}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            onChangeText={firstname => setSelect({...select, firstname})}
          />
        </View>
        <View style={{paddingBottom: 5}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Email"
            value={select.email}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            onChangeText={email => setSelect({...select, email})}
          />
        </View>
        <View style={{paddingBottom: 5}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Mot de passe"
            value={select.password}
            secureTextEntry={true}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            onChangeText={password => setSelect({...select, password})}
          />
        </View>
        <View style={{paddingBottom: 5}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Confirmer le mot de passe"
            value={select.confirm}
            secureTextEntry={true}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            onChangeText={confirm => setSelect({...select, confirm})}
          />
        </View>
      </View>
      <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {padding: 22, marginTop: 22, maxHeight: 1200, zIndex: 1},
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});
