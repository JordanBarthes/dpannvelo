import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
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

function Login({navigation}) {
  const [select, setSelect] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
        bottomOffset: 120,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }

    if (
      (select.password && select.password.length < 8) ||
      (select.password && select.password.length > 16)
    ) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Error password, minimum length 8 max 16',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 120,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }

    setLoading(true);
    auth()
      .signInWithEmailAndPassword(select.email, select.password)
      .then(async res => {
        try {
          const user = await firestore()
            .collection('users')
            .doc(res.user.uid)
            .get();

          const data = user.data();

          dispatch({type: GET_USER, payload: data});
        } catch (err) {
          setLoading(false);
          console.error(err);
          dispatch({type: DELETE_USER});
          throw err;
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{zIndex: 9999}}>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
      <ImageBackground
        source={require('../../assets/icons/Background.png')}
        resizeMode="stretch"
        style={styles.image}
      />
      <View style={styles.containerLogin}>
        <View style={{marginLeft: 10, marginTop: 10}}>
          <Text style={{color: Colors.BLACK, fontSize: 18, marginBottom: 5}}>
            BIENVENUE SUR DEPANNEVELO !
          </Text>
          <Text style={{color: Colors.grey, marginBottom: 12}}>
            Connecte toi pour continuer
          </Text>
        </View>
        <ScrollView>
          <View style={styles.form}>
            <Input
              style={{fontSize: 14}}
              label="Email"
              labelStyle={{fontSize: 12, marginBottom: -10, marginLeft: 4}}
              textAlign="left"
              placeholder="*****@gmail.com"
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
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
            )}
            <View style={{marginTop: 5, marginBottom: 10}}>
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

const mapStateToProps = (state, props) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(Login);

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
    height: '75%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  form: {},
});
