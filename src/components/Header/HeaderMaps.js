import React from 'react';

import {View, Image, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';

export default function HeaderMaps({navigation}) {
  return (
    <View
      style={{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 17,
        paddingRight: 17,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() => navigation.navigate('Compte')}
            style={{
              backgroundColor: Colors.white,
              borderRadius: 20,
              paddingRight: 3,
              paddingLeft: 3,
              paddingTop: 3,
              paddingBottom: 3,
              marginBottom: 2,
            }}>
            <Image
              style={{width: 35, height: 35, resizeMode: 'contain'}}
              source={require('../../assets/icons/Profil.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
