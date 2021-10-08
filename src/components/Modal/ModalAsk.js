import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../constants/Colors';
import ButtonDefault from '../Button/ButtonDefault';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalAsk = ({title, text, callBack, modal}) => {
  return (
    <Modal
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        callBack(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <Text>{text}</Text>
          <View style={styles.buttonOption}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.buttonOulined]}
              onPress={() => callBack(true)}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Oui
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.buttonOulined]}
              onPress={() => callBack(false)}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Non
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAsk;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOulined: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderWidth: 1,
    height: HEIGHT * 0.076,
    width: WIDTH * 0.17,
    borderRadius: 10,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonOption: {
    marginTop: 20,
    width: WIDTH * 0.4,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
