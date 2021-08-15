// @ts-nocheck
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';
import {ScrollView} from 'react-native-gesture-handler';

export default function Signin({navigation}) {
  const [select, setSelect] = useState({
    email: '',
    password: '',
    confirm: '',
  });

  const onSubmit = () => {
    console.log('Submit');
    return navigation.navigate('SigninNext');
  };

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
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
