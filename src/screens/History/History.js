import React, {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

import Moment from 'moment';
import Colors from '../../../constants/Colors';

import {connect} from 'react-redux';
import {FREINS, PNEUS, VITESSES, ACCESSOIRE, AUTRE} from '../../locale';
Moment.locale('fr');

const TYPE_PROBLEM = {
  [FREINS]: 'Probleme de freins',
  [PNEUS]: 'Probleme de pneus',
  [VITESSES]: 'Probleme de vitesses',
  [ACCESSOIRE]: "Probleme d'accesoires",
  [AUTRE]: 'Autre problème',
};

function History({navigation, user}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const dataGet = firestore().collection('users').doc(user.id);

      const doc = await dataGet.get();

      if (!doc.exists) {
        console.log('No such document!');
        return null;
      }

      const data = doc.data();

      const dataHistory = data.history.map(async e => {
        const dataGetHistory = await firestore()
          .collection('history')
          .doc(e)
          .get();
        return dataGetHistory.data();
      });

      Promise.all(dataHistory).then(values => {
        console.log('values', values);
        setHistory(values);
      });
    };

    getHistory();
  }, [user.id]);

  if (history?.length !== 0) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{
            marginVertical: 50,
          }}>
          {history.map((e, i) => (
            <View key={i} style={styles.content}>
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
                    {Moment(e.date).format('DD/MM/YYYY')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: Colors.green,
                      fontWeight: '700',
                    }}>
                    {e.typeIntervention ? TYPE_PROBLEM[e.typeIntervention] : ''}
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
        <View style={styles.content}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.grey,
            }}>
            Aucune factures disponible
          </Text>
        </View>
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
