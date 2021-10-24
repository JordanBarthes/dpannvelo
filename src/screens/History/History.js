import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Moment from 'moment';
import Colors from '../../../constants/Colors';

import {connect} from 'react-redux';
Moment.locale('fr');

function History({navigation, user}) {
  if (user?.history?.length !== 0) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{
            marginVertical: 50,
          }}>
          {user?.history &&
            user.history.map((e, i) => (
              <View style={styles.content}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Colors.grey,
                      }}>
                      {Moment(e.date).format('dd/mm/yyyy')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        color: Colors.green,
                        fontWeight: '700',
                      }}>
                      {e.intervention?.typeIntervention ?? ''}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          marginVertical: 50,
        }}>
        <View style={styles.content}>Aucune factures disponible</View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(History);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    paddingLeft: 30,
    paddingRight: 30,
    borderTopColor: Colors.borderGrey,
    borderTopWidth: 1,
  },
  buttonContain: {
    padding: 8,
    paddingLeft: 28,
    paddingRight: 28,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
