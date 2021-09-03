import React, {useState} from 'react';

import {StyleSheet, View, Text, Modal, Dimensions} from 'react-native';
import ButtonDefault from '../Button/ButtonDefault';

const WIDTH = Dimensions.get('window').width;

const ModalDefault = ({title, text, callBack, modal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        callBack(!modal);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <Text>{text}</Text>
          <View style={styles.buttonOption}>
            <ButtonDefault
              handleSend={() => callBack(!modal)}
              title="Continuer"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDefault;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
    width: WIDTH * 0.7,
    marginBottom: 10,
    marginTop: 20,
  },
});
