import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = () => {
    if (
      select?.firstname.length < 3 ||
      select?.firstname.length >= 24 ||
      select?.name.length < 3 ||
      select?.name.length >= 24
    ) {
      return Toast.show({
        type: 'error',
        // position: 'top',
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
      return Toast.show({
        type: 'error',
        // position: 'top',
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
      return Toast.show({
        type: 'error',
        // position: 'top',
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
        // position: 'top',
        text1: 'Error',
        text2: 'Error password different to confirm password',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }

    setLoading(true);

    auth()
      .createUserWithEmailAndPassword(select.email, select.password)
      .then(async token => {
        console.log('User account created & signed in!');

        // try {
        //   await firestore()
        //     .collection('users')
        //     .doc(token.user.uid)
        //     .set({
        //       id: token.user.uid,
        //       email: token.user.email,
        //       ...select,
        //     });

        return navigation.navigate('SigninNextDep', {
          user: {
            id: token.user.uid,
            email: token.user.email,
            ...select,
          },
        });
        // } catch (err) {
        //   setLoading(false);
        //   console.error(err);
        //   throw err;
        // }
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);

        return Toast.show({
          type: 'error',
          // position: 'bottom',
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
      <View style={{zIndex: 9999}}>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
      <Text style={styles.title}>CRÉEZ UN COMPTE DÉPANNEUR</Text>
      <View style={{paddingBottom: 5}}>
        <Input
          textAlign="left"
          placeholder="INPUT WITH CUSTOM ICON"
          label="Nom"
          value={select.name}
          labelStyle={{marginBottom: -12, fontSize: 14}}
          inputStyle={{marginBottom: -5}}
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
          inputStyle={{marginBottom: -5}}
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
          inputStyle={{marginBottom: -5}}
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
          inputStyle={{marginBottom: -5}}
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
          inputStyle={{marginBottom: -5}}
          onChangeText={confirm => setSelect({...select, confirm})}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  form: {
    padding: 15,
    marginTop: 70,
    maxHeight: 1200,
    zIndex: 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});
