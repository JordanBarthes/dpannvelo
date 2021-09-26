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

import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
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

const GOOGLE_MAPS_APIKEY = 'AIzaSyBbtExaxh5Gw-QJ0v97kMvZHxccN78dqSY';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const mooveFree = new Animated.Value(HEIGHT * 0.45);
const opacityMap = new Animated.Value(0);
const orderMap = new Animated.Value(0);

export default function Maps({navigation}) {
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

  const [depanneurInLoading, setDepanneurInLoading] = useState(false);

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

  let map;
  let deleteAsync = false;
  let positionDrag = {
    latitude: state.region.latitude,
    longitude: state.region.longitude,
  };

  useEffect(() => {
    // Geolocation.requestAuthorization();
    if (state.isMapReady) {
      getPosition();
    }
  }, [state.isMapReady]);

  const searchDepanneur = position => {
    setTimeout(() => {
      setModalSearchDep(false);
      setDepanneurInLoading(true);
    }, 2000);
  };

  const handleDeleteDep = () => {
    setWaitDep(false);
    setDepanneurInLoading(false);
    setSelectPosition(false);
  };

  const handlePositionValide = () => {
    //REQUEST TO GET SEARCH DEPANNEUR + ADD MODAL + Route

    setModalSearchDep(true);
    setWaitDep(true);
    searchDepanneur(positionDrag);

    //OPEN MODAL RECHERCHE

    //OPEN ROUTE

    //AVANT ARRIVER BUTTON IL EST ARRIVER
    // npm i react-native-maps-directions
    //DEPANNAGE EN COURS

    // PUIS END
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
          if (state.position) map.animateToRegion(region);
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

  const handlePayement = () => {
    console.log('PAYEMENT VALIDER');
    setEndDep(true);
    setDepanneurInLoading(false);
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
          Array.from([
            {
              latitude: 37.4219221,
              longitude: -122.0540064,
            },
            {
              latitude: 37.4219221,
              longitude: -122.0240064,
            },
            {
              latitude: 37.4219221,
              longitude: -122.0140064,
            },
          ]).map((e, i) => (
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
      </MapView>
      <CurrentLocation
        bottom={depanneurInLoading ? HEIGHT * 0.34 : HEIGHT * 0.28}
        cb={centerPosition}
      />
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
          if (ask) handleDeleteDep();
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
        title="Confirmer de dépannages"
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
    </View>
  );
}

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
