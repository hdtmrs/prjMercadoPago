import React, {useState, useEffect} from "react";
import {View, Text, Pressable, ActivityIndicator, Modal, TextInput} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalSet, setModalSet] = useState(false);
    const [modalGet, setModalGet] = useState(false);
    const [dinheiro, setDinheiro] = useState(0);
    const [dinheiroSet, setDinheiroSet] = useState(0);
    const [dinheiroGet, setDinheiroGet] = useState(0);

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
                setDinheiro(Number(response.data.dinheiro));
            }catch(err) {
                console.log(err);
            }finally{
                setLoading(false)
            }
        }
        buscarDados();
    },[]);

    const colocarGrana = () => {
        setDinheiro(dinheiro + dinheiroSet);
        setDinheiroSet(0);
        setModalSet(false);
    };

    const tirarGrana = () => {
        setDinheiro(dinheiro - dinheiroGet);
        setDinheiroGet(0);
        setModalGet(false);
    };

    const atualizarGrana = async () => {
        try{
            const tokenUser = await AsyncStorage.getItem('userToken');
            await axios.put('http://127.0.0.1:8000/api/update-money',{dinheiro}, {
                headers: {
                    Authorization: `Bearer ${tokenUser}`
                }
            })
        }catch(err) {
            console.log(err);
        }
    }

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
                <Text>{dinheiro}</Text>
                <Pressable onPress={() => setModalSet(true)}>
                    <Text>Colocar dinheiro</Text>
                </Pressable>
                <Pressable onPress={() => setModalGet(true)}>
                    <Text>Tirar dinheiro</Text>
                </Pressable>
            </View>

            <Modal visible={modalSet} transparent={false} animationType="slide" onRequestClose={() => setModalSet(false)}>
                <View>
                    <Pressable onPress={() => setModalSet(false)}>
                        <Text>Fechar</Text>
                    </Pressable>
                    <Text>Guardar dinheiro</Text>
                    <TextInput 
                        value={dinheiroSet.toString()} 
                        onChangeText={(text) => setDinheiroSet(Number(text))}
                        keyboardType="numeric" 
                    />
                    <Pressable onPress={colocarGrana}>
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
                    <TextInput 
                        value={dinheiroGet.toString()} 
                        onChangeText={(text) => setDinheiroGet(Number(text))}
                        keyboardType="numeric" 
                    />
                    <Pressable onPress={tirarGrana}>
                        <Text>Enviar</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};
export default HomeScreen;
