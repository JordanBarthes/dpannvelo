import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Modal,
  Text,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Theme from '../../../constants/Theme';
import Colors from '../../../constants/Colors';

import {Marker} from 'react-native-maps';
import DepanneMarker from '../../components/DepanneMarker';
import CurrentLocation from '../../components/Button/CurrentLocation';
import HeaderMaps from '../../components/Header/HeaderMaps';
import ButtonDefault from '../../components/Button/ButtonDefault';
import ModalDefault from '../../components/Modal/ModalDefault';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const mooveFree = new Animated.Value(HEIGHT * 0.45);
const opacityMap = new Animated.Value(0);
const orderMap = new Animated.Value(0);

export default function Maps({navigation}) {
  const [state, setState] = useState({
    region: {
      latitude: 48.806,
      longitude: 2.576,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    },
    position: true,
    isMapReady: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [startSearch, setSartSearch] = useState(false);
  const [modal, setModal] = useState(false);

  const [problem, setProblem] = useState(null);

  let map;
  let deleteAsync = false;

  // useEffect(() => {
  //   // Geolocation.requestAuthorization();
  //   getPosition();
  // }, []);

  const getPosition = async () => {
    if (!deleteAsync) {
      deleteAsync = true;
      Geolocation.getCurrentPosition(
        location => {
          console.log('location', location);
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
    getPosition();
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
        showsCompass={true}
        customMapStyle={Theme.maps}
        showsUserLocation={true}
        onLayout={onReady}
        minZoomLevel={14.7}
        maxZoomLevel={18}
        style={[
          styles.map,
          {
            minHeight: HEIGHT - 30,
          },
        ]}
        ref={mapView => (map = mapView)}
        initialRegion={state.region}>
        {state.isMapReady && state.position && (
          <DepanneMarker
            source={require('../../assets/icons/Depannage.png')}
            driver={{
              coordinate: {
                latitude: 37.4204472,
                longitude: -122.0842699,
                latitudeDelta: 0.045,
                longitudeDelta: 0.045,
              },
            }}
          />
        )}
        <Marker.Animated
          coordinate={{
            latitude: 37.4218492,
            longitude: -122.0842669,
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
      </MapView>
      <CurrentLocation bottom={HEIGHT * 0.28} cb={centerPosition} />
      <View style={styles.button}>
        <ButtonDefault
          handleSend={() => setModalVisible(!modalVisible)}
          title="J'ai besoin d'un dépanneur"
        />
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
            <Text style={styles.modalText}>Quel est le soucis ?</Text>
            <View style={styles.buttonOption}>
              <ButtonDefault
                buttonOulined
                active={problem === 1}
                handleSend={() => setProblem(1)}
                title="Soucis 1"
              />
            </View>
            <View style={styles.buttonOption}>
              <ButtonDefault
                buttonOulined
                active={problem === 2}
                handleSend={() => setProblem(2)}
                title="Soucis 1"
              />
            </View>
            <View style={styles.buttonOption}>
              <ButtonDefault
                buttonOulined
                active={problem === 3}
                handleSend={() => setProblem(3)}
                title="Soucis 1"
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.modalText}>Confirmez votre position</Text>
            </View>
            <View style={styles.buttonOption}>
              <ButtonDefault
                handleSend={() => {
                  setModalVisible(!modalVisible);
                }}
                title="Continuer"
              />
            </View>
          </View>
        </View>
      </Modal>
      <ModalDefault
        title="Confirmer de dépannages"
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor"
        callBack={open => setModal(open)}
        modal={modal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonOption: {
    width: WIDTH * 0.7,
    marginBottom: 10,
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
