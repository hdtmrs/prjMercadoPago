import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { StyleSheet, Dimensions, Alert, Image } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import UrlService from './UrlService';
import { IconService } from '../services/IconService';

const local = require('./GeoJson/zonaLeste_convertido.json');
const { width, height } = Dimensions.get('window');

const MapaZonaLesteGeojson = forwardRef(({ ocorrencias = [] }, ref) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [ocorrenciasState, setOcorrencias] = useState(ocorrencias);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative a localização para usar o mapa.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      };
      setRegion(userRegion);

    })();
  }, []);


  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={region}
      showsUserLocation
      showsMyLocationButton={false}
      loadingEnabled
      toolbarEnabled
      zoomControlEnabled={false}
      minZoomLevel={10}
      maxZoomLevel={19}
      onRegionChangeComplete={handleRegionChangeComplete}
    >
      {polygons.map((poly) => (
        <Polygon
          key={poly.id}
          coordinates={poly.rings[0]}
          strokeColor={'#0A84FF'}
          fillColor={'rgba(10,132,255,0.12)'}
          strokeWidth={2}
        />
      ))}

    </MapView>
  );
});

const styles = StyleSheet.create({
  map: { width, height },
});

export default MapaZonaLesteGeojson;
