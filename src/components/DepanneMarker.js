import React, { useState, useEffect } from "react";

import { Easing } from "react-native";

import { AnimatedRegion, Marker } from "react-native-maps";

function DepanneMarkerWithOutMemo(props) {
  const newCoords = new AnimatedRegion({
    latitude: props.driver.coordinate.latitude,
    longitude: props.driver.coordinate.longitude,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05
  });

  const [state, setState] = useState({
    driver: {
      coordinate: newCoords
    }
  });

  useEffect(() => {
    setTimeout(() => {
      newCoords
        .timing({
          latitude: props.driver.coordinate.latitude + 0.0005,
          longitude: props.driver.coordinate.longitude + 0.0007,
          duration: 700,
          easing: Easing.linear
        })
        .start();
    }, 2000);

    setTimeout(() => {
      newCoords
        .timing({
          latitude: props.driver.coordinate.latitude + 0.001,
          longitude: props.driver.coordinate.longitude + 0.0009,
          duration: 700,
          easing: Easing.linear
        })
        .start();
    }, 5000);

    setTimeout(() => {
      newCoords
        .timing({
          latitude: props.driver.coordinate.latitude + 0.0019,
          longitude: props.driver.coordinate.longitude + 0.0019,
          duration: 700,
          easing: Easing.linear
        })
        .start();
    }, 7000);

    setTimeout(() => {
      newCoords
        .timing({
          latitude: props.driver.coordinate.latitude + 0.004,
          longitude: props.driver.coordinate.longitude + 0.001,
          duration: 700,
          easing: Easing.linear
        })
        .start();
    }, 8500);

    setTimeout(() => {
      newCoords
        .timing({
          latitude: props.driver.coordinate.latitude + 0.005,
          longitude: props.driver.coordinate.longitude + 0.00004,
          duration: 700,
          easing: Easing.linear
        })
        .start();
    }, 10000);
  }, []);

  // transform: rotate(45deg);

  return (
    <Marker.Animated
      coordinate={state.driver.coordinate}
      onRegionChange={props.onRegionChange}
      tracksViewChanges={false}
      anchor={{ x: 0.69, y: 1 }}
      centerOffset={{ x: -18, y: -60 }}
      onPress={() => console.log("CLICK Marker Call Select Choos")}
      icon={props.source}
    />
  );
}

const DepanneMarker = React.memo(DepanneMarkerWithOutMemo);

export default DepanneMarker;
