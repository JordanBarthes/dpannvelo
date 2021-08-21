import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Colors from '../../../constants/Colors';

export default function Factures({navigation}) {
  const handleSend = () => navigation.navigate('Buy');

  return (
    <View style={styles.container}>
      <ScrollView>
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
                25/06/2021 - 10:25
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.green,
                  fontWeight: '700',
                }}>
                Type de dépannage
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 15,
              color: Colors.BLACK,
              fontWeight: '700',
            }}>
            + 20€
          </Text>
        </View>
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
                25/06/2021 - 10:25
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.green,
                  fontWeight: '700',
                }}>
                Type de dépannage
              </Text>
            </View>
          </View>
        </View>
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
                25/06/2021 - 10:25
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.green,
                  fontWeight: '700',
                }}>
                Type de dépannage
              </Text>
            </View>
          </View>
        </View>
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
                25/06/2021 - 10:25
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.green,
                  fontWeight: '700',
                }}>
                Type de dépannage
              </Text>
            </View>
          </View>
        </View>
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
                25/06/2021 - 10:25
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.green,
                  fontWeight: '700',
                }}>
                Type de dépannage
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
