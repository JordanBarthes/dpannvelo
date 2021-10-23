import React from 'react';

import {AnimatedRegion, Marker} from 'react-native-maps';

function DepanneMarkerWithOutMemo(props) {
  const newCoords = new AnimatedRegion({
    latitude: props.driver.coordinate.latitude,
    longitude: props.driver.coordinate.longitude,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  return (
    <Marker.Animated
      coordinate={newCoords}
      onRegionChange={props.onRegionChange}
      tracksViewChanges={false}
      anchor={{x: 0.69, y: 1}}
      centerOffset={{x: -18, y: -60}}
      onPress={() => props.callBack()}
      icon={props.source}
    />
  );
}

const DepanneMarker = React.memo(DepanneMarkerWithOutMemo);

export default DepanneMarker;
