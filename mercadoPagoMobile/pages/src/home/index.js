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
    const [motivo, setMotivo] = useState('');
    const [historicos, setHistoricos] = useState([]);


    useEffect(() => {
        const buscarDados = async () => {
            try{
                setLoading(true);
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

    useEffect(() => {
        const buscarHistorico =  async () => {
            try {
                setLoading(true);
                const tokenUser = await AsyncStorage.getItem('userToken');
                const response = await axios.get('http://127.0.0.1:8000/api/see',{
                    headers: {
                        Authorization: `Bearer ${tokenUser}`
                    }
                });
                setHistoricos(response.data);
            }catch(err) {
                console.log(err);
            }finally{
                setLoading(false);
            }

        }
        buscarHistorico();
    },[]);

    const colocarGrana = () => {
        const tipo = 'entrada';
        const valorEntregue = dinheiroSet;
        const valor = (dinheiro + dinheiroSet);
        setDinheiro(valor);
        setDinheiroSet(0);
        setModalSet(false);
        setMotivo('');
        guardarHistorico(tipo, valorEntregue);
        atualizarGrana(valor);
    };

    const tirarGrana = () => {
        const tipo = 'saida';
        const valorEntregue = dinheiroGet;
        const valor = (dinheiro - dinheiroGet);
        setDinheiro(valor);
        setDinheiroGet(0);
        setModalGet(false);
        setMotivo('');
        guardarHistorico(tipo, valorEntregue);
        atualizarGrana(valor);
    };

    const guardarHistorico = async (tipo, valorEntregue) => {
        try {
            const tokenUser = await AsyncStorage.getItem('userToken');
            const response = await axios.post('http://127.0.0.1:8000/api/post',{
                valorEntregue,
                tipo,
                motivo,
            },{
                headers: {
                    Authorization: `Bearer ${tokenUser}`
                }
            });


        }catch(err) {
            console.log(err);
        }
    }

    const atualizarGrana = async (valor) => {
        try{
            const tokenUser = await AsyncStorage.getItem('userToken');
            await axios.put('http://127.0.0.1:8000/api/update-money',{valor}, {
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
            {historicos.map((historico, index) => (
                <View key={index}>
                    <Text>Valor: {historico.valor}</Text>
                    <Text>Tipo: {historico.tipo}</Text>
                    <Text>Motivo: {historico.motivo}</Text>
                    <Text>Data: {historico.data}</Text>
                </View>
            ))}
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
                    <Text>Motivo</Text>
                    <TextInput
                        value={motivo}
                        onChangeText={setMotivo}
                        keyboardType="none"
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
                    <Text>Motivo</Text>
                    <TextInput
                        value={motivo}
                        onChangeText={setMotivo}
                        keyboardType="none"
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
