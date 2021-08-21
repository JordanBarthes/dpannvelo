import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

// Dependencies
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

// Components
import Maps from '../screens/Maps/Maps';
import Signin from '../screens/Login/Signin';
import SigninNext from '../screens/Login/SigninNext';
import Login from '../screens/Login/Login';
import Homelogin from '../screens/Login/Homelogin';
import Compte from '../screens/Compte/Compte';
import Abonnement from '../screens/Abonnement/Abonnement';
import History from '../screens/History/History';
import Factures from '../screens/Factures/Factures';
import SigninDep from '../screens/Login/SigninDep';
import SigninNextDep from '../screens/Login/SigninNextDep';

const Stack = createStackNavigator();

const Navigator = () => {
  const [connect, setConnection] = useState(true);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      console.log('ICI', userState);
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    console.log('********** USER ***********', user);
    if (!user) {
      setConnection(false);
    }
    //STORE USER
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerNone,
        headerTransparent: true,
        headerTitle: '',
      }}>
      {!connect && (
        <>
          <Stack.Screen name="Homelogin" component={Homelogin} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="SigninNext" component={SigninNext} />
          <Stack.Screen name="SigninDep" component={SigninDep} />
          <Stack.Screen name="SigninNextDep" component={SigninNextDep} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
      <Stack.Screen
        options={{
          header: ({navigation}) => <View></View>,
        }}
        name="Maps"
        component={Maps}
      />
      <Stack.Screen name="Factures" component={Factures} />
      <Stack.Screen
        options={{
          header: ({navigation}) => <View></View>,
        }}
        name="Abonnement"
        component={Abonnement}
      />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Compte" component={Compte} />
    </Stack.Navigator>
  );
};

export default Navigator;

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
