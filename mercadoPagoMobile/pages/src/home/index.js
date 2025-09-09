import React, {useState, useEffect} from "react";
import {View, Text, Pressable, ActivityIndicator, Modal, TextInput} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalSet, setModalSet] = useState(false);
    const [modalGet, setModalGet] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const buscarDados = async () => {
            try{
                const tokenUser = await AsyncStorage.getItem('userToken');
                const response = await axios.get('http://127.0.0.1:8000/api/getdate', {
                    headers: {
                        Authorization: `Bearer ${tokenUser}`
                    }
                });
                console.log(response);
                setNome(response.data.nome);

            }catch(err) {
                console.log(err);
            }finally{
                setLoading(false)
            }
        }
        buscarDados();
    },[]);

    if(loading) {
        return(
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando...</Text>
            </View>
        );
    }
    return(
        <View>
            
            <View>
                <Pressable>
                    <Text>{nome}</Text>
                </Pressable>
                <Pressable>
                    <Text>Notificação</Text>
                </Pressable>
                <Pressable>
                    <Text>Ajuda</Text>
                </Pressable>
            </View>
            <View>
                <Text>Valor total</Text>
                <Pressable onPress={() => setModalSet(true)}>
                    <Text>Colocar dinheiro</Text>
                </Pressable>
                <Pressable onPress={() => setModalGet(true)}>
                    <Text>Tirar dinheiro</Text>
                </Pressable>
            </View>
            <View>

            </View>

            <Modal visible={modalSet} transparent={false} animationType="slide" onRequestClose={() => setModalSet(false)}>
                <View>
                    <Pressable onPress={() => setModalSet(false)}>
                        <Text>Fechar</Text>
                    </Pressable>
                    <Text>Guardar dinheiro</Text>
                    <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" />
                    <Pressable>
                        <Text>Enviar</Text>
                    </Pressable>
                </View>
            </Modal>
            <Modal visible={modalGet} transparent={false} animationType="slide" onRequestClose={() => setModalGet(false)}>
                <View>
                    <Pressable onPress={() => setModalGet(false)}>
                        <Text>Fechar</Text>
                    </Pressable>
                    <Text>Retirar dinheiro</Text>
                    <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" />
                    <Pressable>
                        <Text>Enviar</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};
export default HomeScreen;