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

export default function Buy({navigation}) {
  const handleSend = () => navigation.navigate('Buy');

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginTop: 34}}>
          <View style={styles.container}>
            <View>
              <View
                style={{
                  paddingLeft: 30,
                  paddingBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: Colors.grey,
                    fontWeight: '700',
                  }}>
                  Abonnement
                </Text>
              </View>

              <View style={styles.content}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <View
                    style={{
                      paddingTop: 10,
                      marginRight: 15,
                    }}>
                    <Image
                      style={{width: 24, height: 24, resizeMode: 'contain'}}
                      source={require('../../assets/icons/abonnement1.png')}
                    />
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Type d'abonnement
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>
                      Premium
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSend()}>
                  <View>
                    <Image
                      style={{width: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </TouchableOpacity>
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
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Type d'abonnement
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>
                      Premium
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 34}}>
          <View style={styles.container}>
            <View>
              <View
                style={{
                  paddingLeft: 30,
                  paddingBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: Colors.grey,
                    fontWeight: '700',
                  }}>
                  Informations
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
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Nom complet
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>
                      Alexandre Dupont
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSend()}>
                  <View>
                    <Image
                      style={{width: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </TouchableOpacity>
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
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Pseudo
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>
                      Alexandre
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSend()}>
                  <View>
                    <Image
                      style={{width: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </TouchableOpacity>
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
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Adresse email
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>
                      jordanprofree@gmail.com
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSend()}>
                  <View>
                    <Image
                      style={{width: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </TouchableOpacity>
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
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Modifier le mot de passe
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSend()}>
                  <View>
                    <Image
                      style={{width: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </TouchableOpacity>
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
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Notification push
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 34}}>
          <View style={styles.container}>
            <View>
              <View
                style={{
                  paddingLeft: 30,
                  paddingBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: Colors.grey,
                    fontWeight: '700',
                  }}>
                  Informations de payements
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
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Solde du compte
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>10€</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSend()}>
                  <View>
                    <Image
                      style={{width: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </TouchableOpacity>
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
                        fontSize: 15,
                        color: Colors.green,
                        fontWeight: '700',
                      }}>
                      Approvisionner le solde
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSend()}>
                  <View>
                    <Image
                      style={{width: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/plus.png')}
                    />
                  </View>
                </TouchableOpacity>
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
                        fontSize: 15,
                        color: Colors.black,
                        fontWeight: '700',
                      }}>
                      Voir l'historique des dépannages
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSend()}>
                  <View>
                    <Image
                      style={{width: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 34, marginBottom: 34}}>
          <View style={[styles.content, {borderTopWidth: 0}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.red,
                    fontWeight: '700',
                  }}>
                  Déconnexion
                </Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleSend()}>
              <View>
                <Image
                  style={{width: 18, resizeMode: 'contain'}}
                  source={require('../../assets/icons/Logout.png')}
                />
              </View>
            </TouchableOpacity>
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
    padding: 14,
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
