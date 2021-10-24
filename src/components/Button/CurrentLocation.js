import React from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CurrentLocation(props) {
  const cb = props.cb ? props.cb : console.log('NOT Callback');
  const bottom = props.bottom ? props.bottom : 65;

  return (
    <View style={[styles.container, {top: HEIGHT - bottom}]}>
      <TouchableOpacity onPress={() => cb()}>
        <Image
          style={{width: 22, height: 22, resizeMode: 'contain'}}
          source={require('../../assets/icons/Vector.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    left: WIDTH - 67,
    borderRadius: 50,
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
