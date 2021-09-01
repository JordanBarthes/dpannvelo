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

import {GET_USER, DELETE_USER} from '../../redux/type';

function Payement({navigation, user}) {
  const [select, setSelect] = useState({
    firstName: user.firstname,
    name: user.name,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = () => {
    setLoading(true);

    // auth()
    //   .signInWithEmailAndPassword(select.email, select.password)
    //   .then(async res => {
    //     try {
    //       const user = await firestore()
    //         .collection('users')
    //         .doc(res.user.uid)
    //         .get();

    //       const data = user.data();

    //       dispatch({type: GET_USER, payload: data});
    //     } catch (err) {
    //       console.error(err);
    //       dispatch({type: DELETE_USER});
    //       throw err;
    //     }
    //   })
    //   .catch(error => {
    //     setLoading(false);
    //     console.error(error);
    //   });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogin}>
        <ScrollView>
          <View style={styles.form}>
            <Input
              style={{fontSize: 14}}
              label="Payement"
              labelStyle={{fontSize: 12, marginBottom: -10, marginLeft: 4}}
              textAlign="left"
              placeholder="345432341"
              value={select.firstName}
              onChangeText={firstName => setSelect({...select, firstName})}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ButtonDefault handleSend={() => onSubmit()} title="Continuer" />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Payement);

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
