import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';

//Dependance
import auth from '@react-native-firebase/auth';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

export default function Login({navigation}) {
  const [select, setSelect] = useState({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    console.log('Submit Form');

    //   auth()
    // .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
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

    return navigation.navigate('Maps');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/icons/Background.png')}
        resizeMode="stretch"
        style={styles.image}
      />
      <View style={styles.containerLogin}>
        <ScrollView>
          <View style={{marginLeft: 10, marginTop: 20}}>
            <Text style={{color: Colors.BLACK, fontSize: 18, marginBottom: 10}}>
              BIENVENUE SUR DEPANNEVELO !
            </Text>
            <Text style={{color: Colors.grey, marginBottom: 15}}>
              Connecte toi pour continuer
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              style={{fontSize: 14}}
              label="Email"
              labelStyle={{fontSize: 12, marginBottom: -10, marginLeft: 4}}
              textAlign="left"
              placeholder="jordanprofree@gmail.com"
              value={select.email}
              onChangeText={email => setSelect({...select, email})}
            />
            <View style={{marginTop: -10}}>
              <Input
                style={{fontSize: 14}}
                label="Mot de passe"
                labelStyle={{fontSize: 12, marginBottom: -10, marginLeft: 4}}
                textAlign="left"
                placeholder="******"
                value={select.password}
                onChangeText={password => setSelect({...select, password})}
              />
            </View>
            <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
            <View style={{marginTop: 10, marginBottom: 30}}>
              <Text style={{textAlign: 'center', color: Colors.grey}}>
                Mot de passe oublié ?
              </Text>
            </View>
            <ButtonDefault
              buttonOulined
              handleSend={() => navigation.navigate('Signin')}
              title="Inscription"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  containerLogin: {
    padding: 5,
    position: 'absolute',
    top: '35%',
    backgroundColor: Colors.white,
    width: '100%',
    height: '65%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  form: {},
});
