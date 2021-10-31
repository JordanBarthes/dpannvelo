import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';

// Dependencies
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

// Components
import Maps from '../screens/Maps/Maps';
import Signin from '../screens/Login/Signin';
import SigninNext from '../screens/Login/SigninNext';
import Login from '../screens/Login/Login';
import Compte from '../screens/Compte/Compte';
import Abonnement from '../screens/Abonnement/Abonnement';
import History from '../screens/History/History';
import Factures from '../screens/Factures/Factures';
import SigninDep from '../screens/Login/SigninDep';
import SigninNextDep from '../screens/Login/SigninNextDep';

import {connect, useDispatch} from 'react-redux';

import {GET_USER, DELETE_USER} from '../redux/type';
import ModifNom from '../screens/ModifNom/ModifNom';
import ModifPass from '../screens/ModifPass/ModifPass';
import Payement from '../screens/Payement/Payement';

const Stack = createStackNavigator();

const Navigator = ({user}) => {
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function onAuthStateChanged(user) {
    if (user) {
      const dataGet = firestore().collection('users').doc(user.uid);

      const doc = await dataGet.get();

      if (doc.exists) {
        const data = doc.data();
        dispatch({type: GET_USER, payload: data});
      } else {
        auth()
          .signOut()
          .then(() => {
            console.log('DECONNECTION USER');
            dispatch({type: DELETE_USER});
          })
          .catch(() => {
            dispatch({type: DELETE_USER});
          });
      }
    }
    if (initializing) setInitializing(false);
  }

  if (initializing)
    return (
      <ImageBackground
        resizeMode="stretch"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        source={require('../assets/icons/initBackground.png')}
      />
    );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerNone,
        headerTransparent: true,
        headerTitle: '',
      }}>
      {!user ? (
        <>
          <Stack.Screen
            options={{
              header: ({navigation}) => <View></View>,
            }}
            name="Login"
            component={Login}
          />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="SigninNext" component={SigninNext} />
          <Stack.Screen name="SigninDep" component={SigninDep} />
          <Stack.Screen name="SigninNextDep" component={SigninNextDep} />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              header: ({navigation}) => <View></View>,
            }}
            name="Maps"
            component={Maps}
          />
          <Stack.Screen name="Factures" component={Factures} />
          <Stack.Screen name="Abonnement" component={Abonnement} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Compte" component={Compte} />
          <Stack.Screen name="ModifNom" component={ModifNom} />
          <Stack.Screen name="ModifPass" component={ModifPass} />
          <Stack.Screen name="Payement" component={Payement} />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Navigator);

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerStyles: {flex: 1, width: '63%', backgroundColor: 'transparent'},
  headerNone: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
});
