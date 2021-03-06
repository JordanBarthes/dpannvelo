import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

import Moment from 'moment';
import auth from '@react-native-firebase/auth';

import {connect, useDispatch} from 'react-redux';
import Colors from '../../../constants/Colors';
import {DELETE_USER} from '../../redux/type';
// import ModalDefault from '../../components/Modal/ModalDefault';
import ModalAsk from '../../components/Modal/ModalAsk';
import {TYPE_DEP, TYPE_USER} from '../../locale';

Moment.locale('fr');

function Compte({navigation, user}) {
  const dispatch = useDispatch();
  const [modalAsk, setModalAsk] = useState(false);
  const [creneau, setCreneau] = useState();

  const handleDeco = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: DELETE_USER});

        navigation.navigate('Login');
      })
      .catch(() => {
        dispatch({type: DELETE_USER});
      });
  };

  const placeholder = {
    label: 'Choisissez un créneau',
    value: null,
    color: 'black',
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          marginVertical: 30,
        }}>
        {user?.type === TYPE_USER && (
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
                          style={{
                            width: 24,
                            height: 24,
                            resizeMode: 'contain',
                          }}
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
                          {user?.abonnement ? user.abonnement : ''}
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
                        Status d'abonnement
                      </Text>
                      <Text style={{marginTop: 2, color: Colors.grey}}>
                        {user?.statusAbonnement ? user.statusAbonnement : ''}
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
                          fontSize: 15,
                          color: Colors.black,
                        }}>
                        Date de fin d'abonnement
                      </Text>
                      <Text style={{marginTop: 2, color: Colors.grey}}>
                        {user?.dateEndAbonnement
                          ? Moment(user.dateEndAbonnement).format('DD/MM/YYYY')
                          : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
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
                        {user?.firstName} {user?.name}
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
                      Pseudo
                    </Text>
                    <Text style={{marginTop: 2, color: Colors.grey}}>
                      {user?.userName ? user.userName : ''}
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
              {user?.type === TYPE_USER && (
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
              )}
            </View>
          </View>
        </View>
        {user?.type === TYPE_DEP && (
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
                    Disponibilités
                  </Text>
                </View>
                <View style={styles.content}>
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.black,
                      }}>
                      Créneau horaire
                    </Text>
                    <RNPickerSelect
                      placeholder={placeholder}
                      style={pickerSelectStyles}
                      onValueChange={value => {
                        setCreneau(value);
                      }}
                      value={creneau}
                      items={[
                        {
                          label: '7H/10H',
                          value: '7/10',
                        },
                        {label: '10H/12H', value: '10/12'},
                        {label: '14H/17H', value: '14/17'},
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        {/* {user?.type === TYPE_USER ? (
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
                </View> */}
        {/*
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
                      <Text style={{marginTop: 2, color: Colors.grey}}>
                        10€
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={{width: 18, height: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </View> */}
        {/* <Pressable onPress={() => navigation.navigate('Payement')}>
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
                </Pressable> */}
        {/* <Pressable onPress={() => navigation.navigate('History')}>
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
                </Pressable> */}
        {/* </View>
            </View>
          </View>
        ) : ( */}
        {user?.type === TYPE_DEP && (
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
                    Factures
                  </Text>
                </View>

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
                        Solde du compte
                      </Text>
                      <Text style={{marginTop: 2, color: Colors.grey}}>
                        10€
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      style={{width: 18, height: 18, resizeMode: 'contain'}}
                      source={require('../../assets/icons/arrowRight.png')}
                    />
                  </View>
                </View> */}

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
                          Voir mes factures
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
        )}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

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
