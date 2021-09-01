import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../../components/Button/ButtonDefault';

//Dependance
import auth from '@react-native-firebase/auth';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

import Toast from 'react-native-toast-message';

import firestore from '@react-native-firebase/firestore';
import {connect, useDispatch} from 'react-redux';

import {GET_USER, DELETE_USER} from '../../redux/type';

const HEIGHT = Dimensions.get('window').height;

function ModifNom({navigation, user}) {
  const [select, setSelect] = useState({
    firstName: user.firstname,
    name: user.name,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (
      (select.firstName && select.firstName.length < 2) ||
      (select.name && select.name.length > 32)
    ) {
      return Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Error name / firstname, minimum length 2 max 32',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 100,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }
    setLoading(true);

    try {
      await firestore().collection('users').doc(user.id).update(select);
      dispatch({type: GET_USER, payload: {...user, ...select}});
      navigation.navigate('Compte');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <ScrollView>
        <View style={styles.form}>
          <Input
            style={{fontSize: 14}}
            label="Prénom"
            labelStyle={{fontSize: 12, marginBottom: -10, marginLeft: 4}}
            textAlign="left"
            placeholder="jordan"
            value={select.firstName}
            onChangeText={firstName => setSelect({...select, firstName})}
          />
          <View style={{marginTop: -10}}>
            <Input
              style={{fontSize: 14}}
              label="Nom"
              labelStyle={{fontSize: 12, marginBottom: -10, marginLeft: 4}}
              textAlign="left"
              placeholder="barthes"
              value={select.name}
              onChangeText={name => setSelect({...select, name})}
            />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
        )}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ModifNom);

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
  },
});
