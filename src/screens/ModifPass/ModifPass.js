import React, {useState} from 'react';
import {Dimensions, StyleSheet, View, ActivityIndicator} from 'react-native';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';

//Dependance
import auth from '@react-native-firebase/auth';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import {connect, useDispatch} from 'react-redux';

import Toast from 'react-native-toast-message';
import {GET_USER, DELETE_USER} from '../../redux/type';

const HEIGHT = Dimensions.get('window').height;

function ModifPass({navigation, user}) {
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = async () => {
    console.log('ELELEL', email);
    if (!validateEmail(email)) {
      return Toast.show({
        type: 'error',
        position: 'bottom',
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
    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      setLoading(false);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Email envoyé',
        text2: 'Mot de passe oublié',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {
          navigation.navigate('Compte');
        },
        onPress: () => {
          navigation.navigate('Compte');
        },
      });
    } catch (err) {
      console.error('ERROR', err);
    }
  };

  return (
    <View style={styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <ScrollView style={{marginTop: 50}}>
        <View style={styles.form}>
          <Input
            style={{fontSize: 14}}
            label="Email"
            labelStyle={{fontSize: 12, marginBottom: -10, marginLeft: 4}}
            textAlign="left"
            placeholder="jordan@gmail.com"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <View style={{marginTop: 30}}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ModifPass);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Colors.white,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    height: HEIGHT - 180,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
  },
});
