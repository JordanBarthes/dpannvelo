import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../constants/Colors';

const HEIGHT = Dimensions.get('window').height;

export default function ButtonDefault({
  title,
  handleSend,
  buttonOulined = false,
  active = false,
  disable = false,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disable}
        style={[
          buttonOulined ? styles.buttonOulined : styles.buttonContain,
          active ? styles.active : styles.noactive,
          disable
            ? styles.buttonContainDisable
            : styles.buttonContainNotDisable,
        ]}
        onPress={() => handleSend()}>
        <Text
          style={{
            color: buttonOulined || disable ? Colors.BLACK : Colors.white,
            fontSize: 16,
            fontWeight: '700',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  noactive: {},
  active: {
    borderColor: Colors.green,
    borderWidth: 2,
  },
  buttonOulined: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderWidth: 1,
    height: HEIGHT * 0.076,
    borderRadius: 10,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContain: {
    backgroundColor: Colors.green,
    height: HEIGHT * 0.076,
    borderRadius: 10,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainDisable: {
    backgroundColor: Colors.buttongrey,
  },
  buttonContainNotDisable: {},
});
