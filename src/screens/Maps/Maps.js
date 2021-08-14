import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Animated, Text} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Theme from '../../../constants/Theme';
import Colors from '../../../constants/Colors';

import { Marker } from "react-native-maps";
import DepanneMarker from '../../components/DepanneMarker';
import CurrentLocation from '../../components/Button/CurrentLocation';
import HeaderMaps from '../../components/Header/HeaderMaps';
import PositionDesactived from '../../components/PositionDesactived';

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

  const [startSearch, setStartSearch] = useState(false);

  let map;
  let deleteAsync = false;

  useEffect(() => {
    // Geolocation.requestAuthorization();
    getPosition()
  }, []);

  const getPosition = async () => {
    if (!deleteAsync) {
      deleteAsync = true;
      Geolocation.getCurrentPosition((location) => {
          if (!location.coords) {
            alert(
              "We could not find your position. Please make sure your location service provider is On"
            );
            deleteAsync = false;
            return setState({ ...state, position: false });
          }
          let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045
          };
          deleteAsync = false;
          if (state.position) map.animateToRegion(region);
          return setState({
            region,
            position: true,
            isMapReady: true
          });
        }, (e) => {
          console.log("Error while trying to get location: ", e);
          alert(
            "We could not find your position. Please make sure your location service provider is On"
          );
          deleteAsync = false;
          setState({ ...state, position: false });
        });
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
    setState({ ...state, isMapReady: true })
  };

  const onRegionChange = (region) =>  {
      setState({ ...state, region: {
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
        ...region
      }
    }, centerPosition());
  }

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
        anchor={{ x: 0.69, y: 1 }}
        centerOffset={{ x: -18, y: -60 }}
        onPress={() => console.log("CLICK Marker Call Select Choos")}
        icon={require('../../assets/icons/Location.png')}
      />
      </MapView>
      <CurrentLocation bottom={HEIGHT - (HEIGHT - 100)} cb={centerPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerMap: {
    minHeight: 80,
    position: 'absolute',
    width: WIDTH,
    zIndex: 5,
  },
  map: {
    flex: 1,
    backgroundColor: Colors.default
  },
  contentText: {
    marginLeft: 10,
  },
});
