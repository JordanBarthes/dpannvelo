// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

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
    Toast.show({
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  }, []);

  const onSubmit = () => {
    console.log('Submit');

    //   auth()
    // .signOut()
    // .then(() => console.log('User signed out!'));

    //   auth()
    // .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
    // .then(() => {
    //   console.log('User account created & signed in!');
    // })
    // .catch(error => {
    //   if (error.code === 'auth/email-already-in-use') {
    //     console.log('That email address is already in use!');
    //   }

    //   if (error.code === 'auth/invalid-email') {
    //     console.log('That email address is invalid!');
    //   }

    //   console.error(error);
    // });

    return navigation.navigate('SigninNext');
  };

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <View style={styles.form}>
        <Text>CRÉEZ UN COMPTE DÉPANNEUR</Text>
        <View style={{paddingBottom: 15}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Nom"
            value={select.name}
            onChangeText={name => setSelect({...select, name})}
          />
        </View>
        <View style={{paddingBottom: 15}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Prénom"
            value={select.firstname}
            onChangeText={firstname => setSelect({...select, firstname})}
          />
        </View>
        <View style={{paddingBottom: 15}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Email"
            value={select.email}
            onChangeText={email => setSelect({...select, email})}
          />
        </View>
        <View style={{paddingBottom: 15}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Mot de passe"
            value={select.password}
            onChangeText={password => setSelect({...select, password})}
          />
        </View>
        <View style={{paddingBottom: 15}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Confirmer le mot de passe"
            value={select.confirm}
            onChangeText={confirm => setSelect({...select, confirm})}
          />
        </View>
      </View>
      <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {padding: 22, marginTop: 22, maxHeight: 1200},
});
