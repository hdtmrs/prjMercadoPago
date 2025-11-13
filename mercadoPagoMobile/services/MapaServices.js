import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { StyleSheet, Dimensions, Alert, Image } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const { width, height } = Dimensions.get('window');


const MapaZonaLesteGeojson = forwardRef(({ ocorrencias = [] }, ref) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [ocorrenciasState, setOcorrencias] = useState(ocorrencias);

  const bancos24h = [
    { id: 1, nome: 'Banco 24h - Tatuapé', latitude: -23.5393, longitude: -46.5765 },
    { id: 2, nome: 'Banco 24h - Anália Franco', latitude: -23.5601, longitude: -46.5614 },
    { id: 3, nome: 'Banco 24h - Penha', latitude: -23.5258, longitude: -46.5402 },
    { id: 4, nome: 'Banco 24h - Itaquera', latitude: -23.5427, longitude: -46.4713 },
    { id: 5, nome: 'Banco 24h - Vila Matilde', latitude: -23.5331, longitude: -46.5219 },
    { id: 6, nome: 'Banco 24h - São Mateus', latitude: -23.6029, longitude: -46.4808 },
    { id: 7, nome: 'Banco 24h - Aricanduva', latitude: -23.5675, longitude: -46.5072 },
    { id: 8, nome: 'Banco 24h - Mooca', latitude: -23.5574, longitude: -46.5978 },
    { id: 9, nome: 'Banco 24h - Guaianases', latitude: -23.5391, longitude: -46.4075 },
    { id: 10, nome: 'Banco 24h - São Miguel Paulista', latitude: -23.4948, longitude: -46.4391 },
  ];

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

  const handleRegionChangeComplete = (region) => {
    setRegion(region);
  };

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

      {bancos24h.map((banco) => (
        <Marker
          key={banco.id}
          coordinate={{
            latitude: banco.latitude,
            longitude: banco.longitude,
          }}
          title={banco.nome}
          description="Caixa eletrônico 24 horas disponível"
        >
        </Marker>
      ))}
    </MapView>
  );
});

const styles = StyleSheet.create({
  map: { width, height },
});

export default MapaZonaLesteGeojson;
