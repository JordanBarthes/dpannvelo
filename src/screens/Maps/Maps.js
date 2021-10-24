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

const mooveFree = new Animated.Value(HEIGHT * 0.45);
const opacityMap = new Animated.Value(0);
const orderMap = new Animated.Value(0);

function Maps({navigation, user}) {
  const [state, setState] = useState({
    region: {
      latitude: 48.9351526,
      longitude: 2.5720603,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    },
    position: true,
    isMapReady: false,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [acceptDep, setAcceptDep] = useState(false);

  const [adresseDep, setAdresseDep] = useState('');

  const [depanneurInLoading, setDepanneurInLoading] = useState(false);

  const [depanneur, setDepanneur] = useState([]);

  const [request, setRequest] = useState([]);

  const [modalSearchDep, setModalSearchDep] = useState(false);

  const [waitDep, setWaitDep] = useState(false);

  const [modalPositionVisible, setModalPosition] = useState(false);

  const [selectPosition, setSelectPosition] = useState(false);

  const [position, setPosition] = useState(null);

  const [startSearch, setSartSearch] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalAsk, setModalAsk] = useState(false);

  const [problem, setProblem] = useState(null);

  const [endDep, setEndDep] = useState(false);

  const [routeDepToReq, setRouteDepToReq] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [modalCertificaVisible, setModalCertificaVisible] = useState(false);

  const [positionDepToReq, setPositionDepToReq] = useState({dep: {}, req: {}});

  let map;
  let deleteAsync = false;
  let positionDrag = {
    latitude: state.region.latitude,
    longitude: state.region.longitude,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // Geolocation.requestAuthorization();
    if (state.isMapReady) {
      getPosition();
    }
  }, [state.isMapReady]);

  useEffect(() => {
    if (user?.type === TYPE_USER) {
      const onChildAdd = database()
        .ref('/depanneur')
        .limitToLast(10)
        .on('child_added', data => {
          let newDepanneur = [...depanneur, data.val()];
          setDepanneur(newDepanneur);
        });

      // Stop listening for updates when no longer required
      return () => database().ref('/depanneur').off('child_added', onChildAdd);
    }

    if (user?.type === TYPE_DEP) {
      // HERE FOR DEP
      const onChildAdd = database()
        .ref('/request')
        .limitToLast(10)
        .on('child_added', data => {
          if (!acceptDep) {
            let newRequest = [data.val()].filter(e => !e.inLoading);

            if (newRequest.length === 0) {
              return;
            }

            setRequest(newRequest);

            let {latitude, longitude} = [...newRequest].pop();

            if (state.isMapReady) {
              map.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.045,
              });
            }

            Geocoder.from(latitude, longitude)
              .then(json => {
                var addressComponent = json.results[0].formatted_address;

                setAcceptDep(true);
                setAdresseDep(addressComponent);
              })
              .catch(error => console.warn(error));
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
      return () => database().ref('/request').off('child_added', onChildAdd);
    }
  }, []);

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
            isMapReady: true,
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
    setModalSearchDep(false);
    setDepanneurInLoading(true);
    setAcceptDep(false);

    console.log('VALIDE INTERVENTION');

    let {latitude, longitude, user: userData} = [...request].pop();

    database()
      .ref(`/request/${userData.id}`)
      .update({
        inLoading: true,
      })
      .then(() => {
        console.log('validateIntervention Data set');

        setPositionDepToReq({
          dep: {
            latitude: state.region.latitude,
            longitude: state.region.longitude,
          },
          req: {
            latitude,
            longitude,
          },
        });

        setRouteDepToReq(true);
        setIsVisible(true);
      })
      .catch(err => {
        console.log('ERROR', err);
      });

    //demarrer route + BOUTTON CERTIFIé le depannage + WAZE
    // SI UPDATE REAL TIME ALR CHANGER VU USER
  };

  const handleDeleteDep = () => {
    setWaitDep(false);
    setDepanneurInLoading(false);
    setSelectPosition(false);
  };

  const saveIntervention = async () => {
    let {
      latitude,
      longitude,
      timestamp,
      user: userData,
      typeIntervention,
    } = [...request].pop();

    const history = [
      ...user.history,
      {
        date: new Date().getTime(),
        intervention: {
          latitude,
          longitude,
          timestamp,
          user: userData,
          typeIntervention,
        },
      },
    ];

    await firestore().collection('users').doc(user.id).update(history);
    await firestore().collection('users').doc(userData.id).update(history);

    dispatch({type: GET_USER, payload: {...user, ...history}});
  };

  const handlePositionValide = () => {
    database()
      .ref(`/request/${user.id}`)
      .set({
        typeIntervention: problem,
        ...positionDrag,
        timestamp: database.ServerValue.TIMESTAMP,
        inLoading: false,
        user,
      })
      .then(() => console.log('Data set.'))
      .catch(err => {
        console.log('ERROR', err);
      });

    setModalSearchDep(true);

    setTimeout(() => {
      if (modalSearchDep) {
        setModalSearchDep(false);
      }
    }, 20000);

    setWaitDep(true);
  };

  const handlePayement = () => {
    setEndDep(true);
    setDepanneurInLoading(false);
    setWaitDep(false);
    setSelectPosition(false);

    //VALIDATION AND PAYEMENT
  };

  const centerPosition = () => {
    const {latitude, longitude, latitudeDelta, longitudeDelta} = state.region;

    map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
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
    centerPosition();
  };

  const onDragEnd = e => {
    console.log('e.nativeEvent.coordinate', e.nativeEvent.coordinate);
    positionDrag = e.nativeEvent.coordinate;
  };

  return (
    <View style={styles.container}>
      {!startSearch && (
        <Animated.View
          style={[
            styles.headerMap,
            {
              opacity: backgoundOpacity,
            },
          ]}>
          <HeaderMaps navigation={navigation} />
        </Animated.View>
      )}
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
          !selectPosition &&
          state.position &&
          user?.type === TYPE_USER &&
          depanneur.map((e, i) => (
            <DepanneMarker
              key={i}
              source={require('../../assets/icons/Online.png')}
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

        {state.isMapReady &&
          !selectPosition &&
          state.position &&
          user?.type === TYPE_DEP &&
          request.map((e, i) => (
            <DepanneMarker
              key={i}
              callBack={() => {}}
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
        {!selectPosition && (
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
        {waitDep && (
          <MapViewDirections
            origin={{
              latitude: positionDrag.latitude,
              longitude: positionDrag.longitude,
            }}
            mode="DRIVING"
            // timePrecision="high"
            destination={{
              latitude: 37.4213821,
              longitude: -122.0440064,
            }}
            strokeWidth={4}
            strokeColor="#3CD689"
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
        {routeDepToReq && (
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
        cb={centerPosition}
      />
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
          latitude: state.region.latitude,
          longitude: state.region.longitude,
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
      {routeDepToReq && (
        <View style={styles.button}>
          <ButtonDefault
            handleSend={() => {
              setModalCertificaVisible(!modalCertificaVisible);
            }}
            title={'Certifié le dépannage'}
          />
        </View>
      )}
      <ModalDefault
        title="DÉPANNAGE CERTIFIÉ !"
        text={`A cet adresse: ${adresseDep}`}
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
            handleDeleteDep();
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
      <ModalDefault
        title="Confirmer le dépannages"
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor"
        callBack={open => setModal(open)}
        modal={modal}
      />
      <ModalDefault
        title="Confirmer votre position"
        text="Maintenez appuyer sur le Marker pour le deplacer et ensuite confirmer votre position."
        callBack={open => {
          setModalPosition(open);
          setSelectPosition(true);
        }}
        modal={modalPositionVisible}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalSearchDep}
        onRequestClose={() => {
          setModalSearchDep(!modalSearchDep);
        }}>
        <View style={styles.topView}>
          <View style={styles.modalLoading}>
            <Text style={styles.textModalLoading}>
              Veuillez patienter, nous attendons la confirmation d’un dépanneur.
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
