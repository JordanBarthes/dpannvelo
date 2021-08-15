import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Animated from 'react-native-reanimated';
import Maps from '../screens/Maps/Maps';
import Signin from '../screens/Login/Signin';
import SigninNext from '../screens/Login/SigninNext';
import Login from '../screens/Login/Login';
import Homelogin from '../screens/Login/Home/Homelogin';

const Stack = createStackNavigator();

const Navigator = () => {
  const [connect, setConnection] = React.useState(false);

  //Ajouter redux pour la connection

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerNone,
        headerTransparent: true,
        headerTitle: '',
      }}>
      {/* {!connect && ( */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Homelogin" component={Homelogin} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="SigninNext" component={SigninNext} />

      {/* )} */}
      <Stack.Screen
        options={{
          header: ({navigation}) => <View></View>,
        }}
        name="Maps"
        component={Maps}
      />
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
