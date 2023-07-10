import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import PropTypes from "prop-types";

export const MapScreen = ({ route }) => {
  const { selectedPostObj } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={{
          latitude: +selectedPostObj.lat,
          longitude: +selectedPostObj.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={10}
        onMapReady={() => console.log(selectedPostObj)}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title={selectedPostObj.title}
          coordinate={{
            latitude: +selectedPostObj.lat,
            longitude: +selectedPostObj.long,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

MapScreen.propTypes = {
  route: PropTypes.object.isRequired,
};
