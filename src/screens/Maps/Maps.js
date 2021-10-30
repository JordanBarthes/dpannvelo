import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Modal,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {Popup} from 'react-native-map-link';

import {TYPE_DEP, TYPE_USER} from '../../locale';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

import Theme from '../../../constants/Theme';
import Colors from '../../../constants/Colors';

import DepanneMarker from '../../components/DepanneMarker';
import CurrentLocation from '../../components/Button/CurrentLocation';
import HeaderMaps from '../../components/Header/HeaderMaps';
import ButtonDefault from '../../components/Button/ButtonDefault';
import ModalDefault from '../../components/Modal/ModalDefault';
import ModalAsk from '../../components/Modal/ModalAsk';
import {connect, useDispatch} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import {GET_USER} from '../../redux/type';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBbtExaxh5Gw-QJ0v97kMvZHxccN78dqSY';
Geocoder.init('AIzaSyBbtExaxh5Gw-QJ0v97kMvZHxccN78dqSY');

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const opacityMap = new Animated.Value(0);

function Maps({navigation, user}) {
  const [state, setState] = useState({
    region: {
      latitude: 37.417001,
      longitude: -122.072376,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    },
    position: false,
    isMapReady: false,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [acceptDep, setAcceptDep] = useState(false);

  const [adresseDep, setAdresseDep] = useState('');

  const [depanneurInLoading, setDepanneurInLoading] = useState(false);

  // const [depanneur, setDepanneur] = useState([]);

  const [request, setRequest] = useState([]);

  const [modalSearchDep, setModalSearchDep] = useState(false);

  const [waitDep, setWaitDep] = useState(false);

  const [modalPositionVisible, setModalPosition] = useState(false);

  const [selectPosition, setSelectPosition] = useState(false);

  // const [modal, setModal] = useState(false);

  const [modalAsk, setModalAsk] = useState(false);

  const [problem, setProblem] = useState(null);

  const [errorModal, setErrorModal] = useState(false);

  const [endDep, setEndDep] = useState(false);

  const [routeDepToReq, setRouteDepToReq] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [modalCertificaVisible, setModalCertificaVisible] = useState(false);

  const [positionDepToReq, setPositionDepToReq] = useState({dep: {}, req: {}});

  const [client, setClient] = useState(null);

  let map;
  let deleteAsync = false;
  let positionDrag = {
    latitude: state.region.latitude,
    longitude: state.region.longitude,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // Geolocation.requestAuthorization();
    if (!state.position) {
      getPosition();
    }
    if (state.isMapReady) {
      if (positionDrag.latitude && state.position) {
        if (user?.type === TYPE_USER) {
          database()
            .ref(`/request/${user.id}`)
            .once(
              'value',
              (data, key) => {
                const dataRequest = data.val();
                console.log('INIT dataRequest', dataRequest);

                // Ca depend si il est TRUE OU FALSE

                // if (dataRequest && key !== 'inLoading') {
                //   setModalSearchDep(true);
                //   setDepanneurInLoading(true);
                //   handlePositionRechercheDepart();
                // }
              },
              errorObject => {
                console.log('The read failed: ' + errorObject.name);
              },
            );

          const onChildUpdate = database()
            .ref(`/request/${user.id}`)
            .on('child_changed', (data, key) => {
              const dataRequest = data.val();
              console.log('*******USER THIS VALUE CHANGE ******', dataRequest);

              if (dataRequest) {
                //UPDATE POP POUR PAS QUIL LE DELETE

                database()
                  .ref(`/request/${user.id}`)
                  .once('value', dataGet => {
                    const dataChange = dataGet.val();
                    console.log(
                      'THIS VALUE CHANGE USERR *********',
                      dataChange,
                    );

                    if (dataChange?.inLoading) {
                      setModalSearchDep(false);
                      setDepanneurInLoading(false);
                      setPositionDepToReq(dataChange.positionDep);
                    }
                  });
              }
            });
          // Stop listening for updates when no longer required
          return () => {
            database()
              .ref(`/request/${user.id}`)
              .off('child_changed', onChildUpdate);
          };
        }

        if (user?.type === TYPE_DEP) {
          ///////VERIFIER SI TU AJOUTE UNE REQUETE AVANT DE L4OUVIRE SI ON LE LANCE BIEN

          const onChildAdd = database()
            .ref('/request')
            .limitToLast(10)
            .on('child_added', data => {
              console.log('GET REQUEST');
              if (!acceptDep) {
                let newRequest = [data.val()].filter(e => !e.inLoading);
                console.log('GET REQUEST', newRequest);
                if (newRequest.length === 0) {
                  return;
                }

                const newClient = [...newRequest].pop();

                setRequest(newRequest);
                setClient(newClient);

                let {latitude, longitude, user: userData} = newClient;

                database()
                  .ref(`/request/${userData.id}`)
                  .once('child_removed', (e, key) => {
                    console.log(
                      '************************** DEPANNEUR  child_removed ************',
                      e.val(),
                      key,
                    );
                    setAcceptDep(false);
                    setAdresseDep('');
                  });

                // if (state.isMapReady) {
                //   console.log('map', map, {
                //     latitude,
                //     longitude,
                //     latitudeDelta: 0.045,
                //     longitudeDelta: 0.045,
                //   });
                //   map.animateToRegion({
                //     latitude,
                //     longitude,
                //     latitudeDelta: 0.045,
                //     longitudeDelta: 0.045,
                //   });
                // }

                getGeoCode(latitude, longitude);
              }
            });

          database()
            .ref(`/depanneur/${user.id}`)
            .set({
              latitude: state.region.latitude,
              longitude: state.region.longitude,
              timestamp: database.ServerValue.TIMESTAMP,
              user,
            })
            .then(() => console.log('Data set DEPANNEUR.'))
            .catch(err => {
              console.log('ERROR', err);
            });

          // Stop listening for updates when no longer required
          return () =>
            database().ref('/request').off('child_added', onChildAdd);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isMapReady, acceptDep]);

  const initPositionDrag = () => {
    positionDrag = {
      latitude: state.region.latitude,
      longitude: state.region.longitude,
    };
  };

  useEffect(() => {
    const callfonction = () => {
      //PROBLEME IL LANCE COMME MEME

      //CALL API

      database()
        .ref(`/request/${user.id}`)
        .once('value', dataGet => {
          const dataChange = dataGet.val();

          if (!dataChange?.inLoading) {
            setModalSearchDep(false);

            setDepanneurInLoading(false);

            setErrorModal(true);

            setWaitDep(false);

            setSelectPosition(false);

            initPositionDrag();

            database().ref(`/request/${user.id}`).remove();

            setTimeout(() => {
              setErrorModal(false);
            }, 5000);
          }
        });
    };
    if (modalSearchDep) {
      setTimeout(() => {
        callfonction();
      }, 15000);
    }
  }, [modalSearchDep, user.id]);

  const getGeoCode = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;

        setAcceptDep(true);
        setAdresseDep(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  const getPosition = async () => {
    if (!deleteAsync) {
      deleteAsync = true;
      Geolocation.getCurrentPosition(
        location => {
          if (!location.coords) {
            alert(
              'We could not find your position. Please make sure your location service provider is On',
            );
            deleteAsync = false;
            return setState({...state, position: false});
          }

          let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
          };

          positionDrag = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          deleteAsync = false;
          if (state.position) {
            map.animateToRegion(region);
          }
          return setState({
            region,
            position: true,
            isMapReady: state.isMapReady,
          });
        },
        e => {
          console.log('Error while trying to get location: ', e);
          alert(
            'We could not find your position. Please make sure your location service provider is On',
          );
          deleteAsync = false;
          setState({...state, position: false});
        },
      );
    }
  };

  const validateIntervention = () => {
    // setModalSearchDep(false);
    setDepanneurInLoading(true);
    setAcceptDep(false);

    let {latitude, longitude, user: userData} = client;

    const dataPosition = {
      dep: {
        latitude: state.region.latitude,
        longitude: state.region.longitude,
      },
      req: {
        latitude,
        longitude,
      },
    };

    database()
      .ref(`/request/${userData.id}`)
      .update({
        inLoading: true,
        positionDep: dataPosition,
      })
      .then(() => {
        setPositionDepToReq(dataPosition);
        setRouteDepToReq(true);
        setIsVisible(true);
      })
      .catch(err => {
        console.log('******** ERROR validateIntervention ******** ', err);
      });

    //demarrer route + BOUTTON CERTIFIé le depannage + WAZE
    // SI UPDATE REAL TIME ALR CHANGER VU USER
  };

  const handleDeleteDep = dataId => {
    //REMOVE REQUEST
    database().ref(`/request/${dataId}`).remove();

    setWaitDep(false);
    setDepanneurInLoading(false);
    setSelectPosition(false);
    setPositionDepToReq({dep: {}, req: {}});
    setRequest([]);
  };

  const saveIntervention = async () => {
    let {
      latitude,
      longitude,
      timestamp,
      user: userData,
      typeIntervention,
    } = client;

    // On  ajoute et ensuite on recuper l'id pour le foutre dans user.history
    const dateToday = new Date().getTime();
    const dateTodayClient = `client-${dateToday}`;
    const dateTodayDep = `depanneur-${dateToday}`;

    const history = {
      date: dateToday,
      latitude,
      longitude,
      timestamp,
      client: userData.id,
      typeIntervention,
      type: user.type,
      id: user.id,
    };

    const historyClient = {
      date: dateToday,
      latitude,
      longitude,
      timestamp,
      depanneur: user.id,
      typeIntervention,
      type: userData.type,
      id: userData.id,
    };

    await firestore().collection('history').doc(dateTodayDep).set(history);
    await firestore()
      .collection('history')
      .doc(dateTodayClient)
      .set(historyClient);

    const historyClientTab = userData?.history
      ? [...userData.history, dateTodayClient]
      : [dateTodayClient];
    const historyDepTab = user?.history
      ? [...user.history, dateTodayDep]
      : [dateTodayDep];

    await firestore()
      .collection('users')
      .doc(userData.id)
      .set({...userData, history: historyClientTab});
    await firestore()
      .collection('users')
      .doc(user.id)
      .set({...user, history: historyDepTab});

    dispatch({
      type: GET_USER,
      payload: {
        ...user,
        history: user.history
          ? [...user.history, historyDepTab]
          : [historyDepTab],
      },
    });

    // AVERTIR CLIENT ET REINITIALISER => FIN

    handleDeleteDep(userData.id);
  };

  const handlePositionValide = () => {
    //LANCEMENT DE LA REQUETE POUR AVOIR UN DEPANNEUR

    // eviter de passer history

    database()
      .ref(`/request/${user.id}`)
      .set({
        typeIntervention: problem,
        ...positionDrag,
        timestamp: database.ServerValue.TIMESTAMP,
        inLoading: false,
        user,
      })
      .then(() => {
        handlePositionRechercheDepart();
      })
      .catch(err => {
        console.log('ERROR', err);
      });
  };

  const handlePositionRechercheDepart = () => {
    console.log('REQUEST DEPANNEUR', modalSearchDep);
    setModalSearchDep(true);
    setWaitDep(true);
  };

  const handlePayement = () => {
    setEndDep(true);
    setDepanneurInLoading(false);
    setWaitDep(false);
    // setSelectPosition(false);

    //VALIDATION AND PAYEMENT
  };

  const backgoundOpacity = opacityMap.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });
  const onReady = () => {
    setState({...state, isMapReady: true});
  };

  const onRegionChange = region => {
    setState({
      ...state,
      region: {
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
        ...region,
      },
    });
    getPosition();
  };

  const onDragEnd = e => {
    positionDrag = e.nativeEvent.coordinate;
  };

  const handleFinishDep = () => {
    console.log('LEELLE handleFinishDep');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerMap,
          {
            opacity: backgoundOpacity,
          },
        ]}>
        <HeaderMaps navigation={navigation} />
      </Animated.View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={false}
        rotateEnabled={false}
        showsCompass={false}
        customMapStyle={Theme.maps}
        showsUserLocation={false}
        onLayout={onReady}
        minZoomLevel={12}
        maxZoomLevel={18}
        style={[
          styles.map,
          {
            minHeight: HEIGHT - 30,
          },
        ]}
        ref={mapView => (map = mapView)}
        initialRegion={state.region}>
        {state.isMapReady &&
          state.position &&
          selectPosition &&
          positionDepToReq?.dep?.latitude && (
            <DepanneMarker
              source={require('../../assets/icons/Online.png')}
              driver={{
                coordinate: {
                  latitude: positionDepToReq.dep.latitude,
                  longitude: positionDepToReq.dep.longitude,
                  latitudeDelta: 0.045,
                  longitudeDelta: 0.045,
                },
              }}
            />
          )}

        {state.isMapReady &&
          !selectPosition &&
          state.position &&
          user?.type === TYPE_DEP &&
          request.length > 0 &&
          request.map((e, i) => (
            <DepanneMarker
              key={i}
              callBack={() => setIsVisible(true)}
              source={require('../../assets/icons/Depannage.png')}
              driver={{
                coordinate: {
                  latitude: e.latitude,
                  longitude: e.longitude,
                  latitudeDelta: 0.045,
                  longitudeDelta: 0.045,
                },
              }}
            />
          ))}
        {!selectPosition && state.position && (
          <Marker.Animated
            coordinate={{
              latitude: state.region.latitude,
              longitude: state.region.longitude,
              latitudeDelta: 0.045,
              longitudeDelta: 0.045,
            }}
            onRegionChange={onRegionChange}
            tracksViewChanges={false}
            anchor={{x: 0.69, y: 1}}
            centerOffset={{x: -18, y: -60}}
            onPress={() => console.log('CLICK Marker Call Select Choos')}
            icon={require('../../assets/icons/Location.png')}
          />
        )}

        {state.isMapReady && state.position && selectPosition && (
          <Marker.Animated
            onDragEnd={onDragEnd}
            draggable={waitDep ? false : true}
            coordinate={{
              latitude: positionDrag.latitude,
              longitude: positionDrag.longitude,
              latitudeDelta: 0.045,
              longitudeDelta: 0.045,
            }}
            centerOffset={{x: -18, y: -60}}
            anchor={{x: 0.69, y: 1}}
            icon={require('../../assets/icons/Vector.png')}
          />
        )}
        {waitDep && state.position && positionDepToReq?.dep?.latitude && (
          <MapViewDirections
            origin={{
              latitude: positionDepToReq.dep.latitude,
              longitude: positionDepToReq.dep.longitude,
            }}
            mode="DRIVING"
            // timePrecision="high"
            destination={{
              latitude: positionDepToReq.req.latitude,
              longitude: positionDepToReq.req.longitude,
            }}
            strokeWidth={4}
            strokeColor="#3CD689"
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
        {routeDepToReq && state.position && positionDepToReq.dep.latitude && (
          <MapViewDirections
            origin={{
              latitude: positionDepToReq.dep.latitude,
              longitude: positionDepToReq.dep.longitude,
            }}
            mode="DRIVING"
            // timePrecision="high"
            destination={{
              latitude: positionDepToReq.req.latitude,
              longitude: positionDepToReq.req.longitude,
            }}
            strokeWidth={4}
            strokeColor="#3CD689"
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
      </MapView>
      <CurrentLocation
        bottom={depanneurInLoading ? HEIGHT * 0.34 : HEIGHT * 0.28}
        cb={getPosition}
      />
      {positionDepToReq?.req?.latitude && (
        <Popup
          isVisible={isVisible}
          onCancelPressed={() => setIsVisible(false)}
          onAppPressed={() => setIsVisible(false)}
          onBackButtonPressed={() => setIsVisible(false)}
          modalProps={{
            animationIn: 'slideInUp',
          }}
          appsWhiteList={[]}
          options={{
            latitude: positionDepToReq?.req?.latitude,
            longitude: positionDepToReq?.req?.longitude,
            dialogTitle: 'Open Waze',
            appsWhiteList: [],
            app: 'waze',
          }}
          style={{
            container: {},
            itemContainer: {},
            image: {},
            itemText: {},
            headerContainer: {},
            titleText: {},
            subtitleText: {},
            cancelButtonContainer: {},
            cancelButtonText: {},
            separatorStyle: {},
            activityIndicatorContainer: {},
          }}
        />
      )}
      {routeDepToReq && (
        <>
          <View style={styles.button}>
            <View style={styles.containerButtonAnnul}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonOulined}
                onPress={() => setIsVisible(true)}>
                <Text
                  style={{
                    color: Colors.BLACK,
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  Ouvrir Google maps / Waze
                </Text>
              </TouchableOpacity>
            </View>
            <ButtonDefault
              handleSend={() => {
                setModalCertificaVisible(!modalCertificaVisible);
              }}
              title={'Certifié le dépannage'}
            />
          </View>
        </>
      )}
      <ModalDefault
        title="DÉPANNAGE CERTIFIÉ !"
        text={`Votre client ${client?.user?.userName} à était avertis, merci`}
        callBack={open => {
          setRouteDepToReq(false);
          setModalCertificaVisible(false);
          saveIntervention();
        }}
        modal={modalCertificaVisible}
      />
      {user?.type === TYPE_USER && (
        <View style={styles.button}>
          {!depanneurInLoading && (
            <ButtonDefault
              handleSend={() =>
                selectPosition
                  ? handlePositionValide()
                  : setModalVisible(!modalVisible)
              }
              title={
                selectPosition
                  ? 'Confirmer la position'
                  : "J'ai besoin d'un dépanneur"
              }
            />
          )}
          {depanneurInLoading && (
            <>
              <View style={styles.containerButtonAnnul}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.buttonOulined}
                  onPress={() => setModalAsk(true)}>
                  <Text
                    style={{
                      color: Colors.BLACK,
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    Annuler
                  </Text>
                </TouchableOpacity>
              </View>
              <ButtonDefault
                handleSend={() => handlePayement()}
                title="Le dépanneur est arrivé"
              />
            </>
          )}
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.backButton}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={{width: 32, height: 32, resizeMode: 'contain'}}
                  source={require('../../assets/icons/cross.png')}
                />
              </Pressable>
            </View>
            <Text style={styles.modalText}>Quel est le soucis ?</Text>
            <View style={styles.buttonOption}>
              <ButtonDefault
                buttonOulined
                active={problem === 1}
                handleSend={() => setProblem(1)}
                title="Freins"
              />
            </View>
            <View style={styles.buttonOption}>
              <ButtonDefault
                buttonOulined
                active={problem === 2}
                handleSend={() => setProblem(2)}
                title="Pneus"
              />
            </View>
            <View style={styles.buttonOption}>
              <ButtonDefault
                buttonOulined
                active={problem === 3}
                handleSend={() => setProblem(3)}
                title="Vitesses"
              />
            </View>
            <View style={styles.buttonOption}>
              <ButtonDefault
                buttonOulined
                active={problem === 4}
                handleSend={() => setProblem(4)}
                title="Montage d’accessoires"
              />
            </View>
            <View style={styles.buttonOption}>
              <ButtonDefault
                buttonOulined
                active={problem === 5}
                handleSend={() => setProblem(5)}
                title="Autres"
              />
            </View>
            <View style={styles.buttonOption}>
              <ButtonDefault
                handleSend={() => {
                  setModalVisible(!modalVisible);
                  setModalPosition(!modalPositionVisible);
                }}
                title="Continuer"
              />
            </View>
          </View>
        </View>
      </Modal>
      <ModalAsk
        title="Etes vous sure ?"
        text="L'annulation est définitive"
        callBack={ask => {
          if (ask) {
            handleDeleteDep(user);
          }
          setModalAsk(false);
        }}
        modal={modalAsk}
      />
      <ModalDefault
        title="Depannage en cours"
        text="Le depannage est en cours nous attendons la validation du depanneur"
        callBack={end => setEndDep(end)}
        encour
        modal={endDep}
      />
      {/* <ModalDefault
        title="Confirmer le dépannages"
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor"
        callBack={open => setModal(open)}
        modal={modal}
      /> */}
      <ModalDefault
        title="Confirmer votre position"
        text="Maintenez appuyer sur le Marker pour le deplacer et ensuite confirmer votre position."
        callBack={open => {
          setModalPosition(open);
          setSelectPosition(true);
        }}
        modal={modalPositionVisible}
      />
      <Modal animationType="none" transparent={true} visible={modalSearchDep}>
        <View style={styles.topView}>
          <View style={styles.modalLoading}>
            <Text style={styles.textModalLoading}>
              Veuillez patienter, nous attendons la confirmation d’un dépanneur.
            </Text>
          </View>
        </View>
      </Modal>
      <Modal animationType="none" transparent={true} visible={errorModal}>
        <View style={styles.topView}>
          <View style={styles.modalLoading}>
            <Text style={styles.textModalLoading}>
              Toutes nos équipes sont occupé, réassayer plus tard.
            </Text>
          </View>
        </View>
      </Modal>
      <ModalDefault
        title="CONFIRMER LE DÉPANNAGE"
        text={`A cet adresse: ${adresseDep}`}
        callBack={open => {
          validateIntervention();
        }}
        modal={acceptDep}
      />
    </View>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Maps);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButtonAnnul: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: -55,
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
  backButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  textModalLoading: {
    fontSize: 16,
  },
  buttonOption: {
    width: WIDTH * 0.7,
    marginBottom: 10,
  },
  modalLoading: {
    backgroundColor: Colors.white,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
  },
  topView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
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
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    position: 'absolute',
    width: WIDTH,
    top: '87%',
  },
  headerMap: {
    minHeight: 80,
    position: 'absolute',
    width: WIDTH,
    zIndex: 5,
  },
  map: {
    flex: 1,
    backgroundColor: Colors.default,
  },
  contentText: {
    marginLeft: 10,
  },
});
