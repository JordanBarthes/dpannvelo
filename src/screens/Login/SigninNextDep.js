// @ts-nocheck
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Input, ListItem, Avatar} from 'react-native-elements';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';
import {ScrollView} from 'react-native-gesture-handler';
import arrow_down from '../../assets/icons/arrow_down.png';

export default function SigninNextDep({navigation}) {
  const [select, setSelect] = useState({message: ''});

  const onSubmit = () => {
    console.log('Submit');
    return navigation.navigate('Maps');
  };

  return (
    <ScrollView style={{backgroundColor: Colors.default}}>
      <View style={styles.form}>
        <View style={{paddingBottom: 15}}>
          <Input
            textAlign="left"
            placeholder="INPUT WITH CUSTOM ICON"
            label="Message"
            value={select.message}
            onChangeText={message => setSelect({...select, message})}
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
