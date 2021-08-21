// @ts-nocheck
import React, {useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
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

  React.useEffect(() => {
    Toast.show({
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  }, []);

  const onSubmit = () => {
    console.log('Submit');
    return navigation.navigate('SigninNext');
  };

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <View style={styles.form}>
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
