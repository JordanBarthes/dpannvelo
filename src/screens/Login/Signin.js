import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

//Dependance
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';

import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';

export default function Signin({navigation}) {
  const [select, setSelect] = useState({
    email: '',
    password: '',
    confirm: '',
  });

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = () => {
    if (!validateEmail(select.email)) {
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
      (select.password && select.password.length < 8) ||
      (select.password && select.password.length > 32)
    ) {
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

    return navigation.navigate('SigninNext', {
      email: select.email,
      password: select.password,
    });
  };

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
      <View style={{zIndex: 9999}}>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>CRÉEZ UN COMPTE CLIENT</Text>
        <View>
          <Input
            textAlign="left"
            placeholder="*****@gmail.com"
            label="Email"
            labelStyle={{marginBottom: -12, fontSize: 14}}
            inputStyle={{marginBottom: -5}}
            value={select.email}
            onChangeText={email => setSelect({...select, email})}
          />
        </View>
        <View>
          <Input
            textAlign="left"
            placeholder="*******"
            label="Mot de passe"
            secureTextEntry={true}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            inputStyle={{marginBottom: -5}}
            value={select.password}
            onChangeText={password => setSelect({...select, password})}
          />
        </View>
        <View>
          <Input
            textAlign="left"
            placeholder="*******"
            label="Confirmer le mot de passe"
            value={select.confirm}
            labelStyle={{marginBottom: -12, fontSize: 14}}
            inputStyle={{marginBottom: -5}}
            secureTextEntry={true}
            onChangeText={confirm => setSelect({...select, confirm})}
          />
        </View>
      </View>
      <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
      <View style={{marginTop: 30}}>
        <ButtonDefault
          buttonOulined
          handleSend={() => navigation.navigate('SigninDep')}
          title="Crée un compte dépanneur"
        />
      </View>
      <View style={{marginTop: 20}}>
        <ButtonDefault
          buttonOulined
          handleSend={() => navigation.navigate('Login')}
          title="Se connecter"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {padding: 15, marginTop: 30, maxHeight: 1200, zIndex: 3},
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 50,
  },
});
