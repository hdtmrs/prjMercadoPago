import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, TextInput, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import Mapa from "../../../services/MapaServices";

const HomeScreen = ({ navigation }) => {
  const [permissao, setPermissao] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [endereco, setEndereco] = useState('');
  const mapaRef = useRef(null);

  useEffect(() => {
    const verificarModal = async () => {
      const vizualizacao = await AsyncStorage.getItem('welcomeSeen');
      if (!vizualizacao) {
        setWelcome(true);
      }

      const response = await AsyncStorage.getItem('permissaoLocal');
      if (response !== 'granted') {
        setPermissao(true);
      }
    };
    verificarModal();
  }, []);

  const pedirPermissao = async (permitiu) => {
    if (permitiu) {
      await LocalizacaoService();
      await AsyncStorage.setItem('permissaoLocal', 'granted');
      await NotificacaoService();

    } else {
      await AsyncStorage.setItem('permissaoLocal', 'denied');
    }
     
    setPermissao(false);
  };

  const esconderModal = async () => {
    await AsyncStorage.setItem('welcomeSeen', 'ok');
    setWelcome(false);
    setPermissao(true);
    
  }
  
  const buscarEndereco = async () => {
    try {
      const coords = await CoordenadaService(endereco);
      mapaRef.current?.centralizarNoEndereco(coords.lat, coords.lng);
    } catch (e) {
      alert('Endereço não encontrado');
    }
  };
  


  return (
    <View style={styles.container}>

     
      <View style={styles.navCima}>
        <View style={styles.navRota}>
          <Pressable 
            style={({ pressed }) => [
              styles.navButton,
              { opacity: pressed ? 0.6 : 1 }
            ]} 
            onPress={() => navigation.navigate('registrar')}
          >
            <View style={styles.buttonRota}>
              <Icon name="directions" size={28} color="#fafafaff" />
            </View>
          </Pressable>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise um local..."
            placeholderTextColor="#888"
            value={endereco}
            onChangeText={setEndereco}
          />
          <Pressable style={styles.searchButton} onPress={() => buscarEndereco()}>
            <Icon name="search" size={24} color="#003366" />
          </Pressable>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Mapa style={styles.mapImage} />
      </View>
        <View style={styles.navigationContainer}>
        <Pressable 
          style={({ pressed }) => [
            styles.navButton,
            { opacity: pressed ? 0.6 : 1 }
          ]} 
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="home" size={26} color="#FFFFFF" />
          <Text style={styles.navButtonText}>Início</Text>
        </Pressable>
      </View>

      <Modal animationType="slide" transparent visible={permissao}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Aviso!</Text>
            <Text style={styles.modalText}>
              Esse aplicativo precisa da sua localização!
            </Text>
            <Pressable onPress={() => {setPermissao(false);pedirPermissao(true);}}>
              <Text style={styles.modalButton}>Sim</Text>
            </Pressable>
            <Pressable onPress={() => pedirPermissao(false)}>
              <Text style={styles.modalButton}>Não</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
  },
  navCima: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  }, 
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '75%', 
  },
  navRota: { 
    flexDirection: 'row', 
  }, 
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    width: '100%', 
  },
  buttonRota: {
    padding: 8,
    height: 'auto', 
    width: 45, 
    backgroundColor: '#12577B', 
    borderRadius: 6,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },

  ocorrenciaButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e55858',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 1,
    left: 4,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 51, 102, 0.9)',
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 10,
  },
  centralButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003366',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    color: '#007BFF',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
