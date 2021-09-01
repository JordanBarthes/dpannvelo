import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import {connect, useDispatch} from 'react-redux';
import Colors from '../../../constants/Colors';
import {DELETE_USER} from '../../redux/type';
import ModalDefault from '../../components/Modal/ModalDefault';
import ModalAsk from '../../components/Modal/ModalAsk';

function Compte({navigation, user}) {
  const dispatch = useDispatch();
  const [modalAsk, setModalAsk] = useState(false);

  const handleSend = () => {
    navigation.navigate('Buy');
  };

  const handleDeco = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: DELETE_USER});

        navigation.navigate('Homelogin');
      })
      .catch(() => {
        dispatch({type: DELETE_USER});
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginTop: 20}}>
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
                  }}>
                  Abonnement
                </Text>
              </View>

              <Pressable onPress={() => navigation.navigate('Abonnement')}>
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
                        }}>
                        Type d'abonnement
                      </Text>
                      <Text style={{marginTop: 2, color: Colors.grey}}>
                        Premium
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Image
                      style={{width: 18, height: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </View>
              </Pressable>
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
        <View style={{marginTop: 25}}>
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
                  }}>
                  Informations
                </Text>
              </View>

              <Pressable onPress={() => navigation.navigate('ModifNom')}>
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
                        }}>
                        Nom complet
                      </Text>
                      <Text style={{marginTop: 2, color: Colors.grey}}>
                        {user?.firstname} {user?.name}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={{width: 18, height: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('ModifNom')}>
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
                        }}>
                        Pseudo
                      </Text>
                      <Text style={{marginTop: 2, color: Colors.grey}}>
                        {user?.userName ? user.userName : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
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
                      }}>
                      Adresse email
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>
                      {user?.email ? user.email : ''}
                    </Text>
                  </View>
                </View>
              </View>
              <Pressable onPress={() => navigation.navigate('ModifPass')}>
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
                        }}>
                        Modifier le mot de passe
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={{width: 18, height: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </View>
              </Pressable>
              {/* <View style={styles.content}>
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
                      }}>
                      Notification push
                    </Text>
                  </View>
                </View>
              </View> */}
            </View>
          </View>
        </View>
        <View style={{marginTop: 25}}>
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
                      }}>
                      Solde du compte
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>10€</Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={{width: 18, height: 18, resizeMode: 'contain'}}
                    source={require('../../assets/icons/arrowRight.png')}
                  />
                </View>
              </View>
              <Pressable onPress={() => navigation.navigate('Payement')}>
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
                        style={{width: 18, height: 18, resizeMode: 'contain'}}
                        source={require('../../assets/icons/plus.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </Pressable>

              <Pressable onPress={() => navigation.navigate('History')}>
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
                        }}>
                        Voir l'historique des dépannages
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={{width: 18, height: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{marginTop: 25, marginBottom: 25}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModalAsk(true)}>
            <View style={[styles.content, {borderTopWidth: 0, padding: 20}]}>
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
                    }}>
                    Déconnexion
                  </Text>
                </View>
              </View>
              <View>
                <Image
                  style={{width: 18, height: 18, resizeMode: 'contain'}}
                  source={require('../../assets/icons/Logout.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <ModalAsk
          title="Etes vous sure ?"
          text="Vous serez déconnecté"
          callBack={ask => {
            if (ask) handleDeco();
            setModalAsk(false);
          }}
          modal={modalAsk}
        />
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Compte);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },
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
  textModalLoading: {
    fontSize: 16,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 12,
    paddingLeft: 25,
    paddingRight: 20,
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
