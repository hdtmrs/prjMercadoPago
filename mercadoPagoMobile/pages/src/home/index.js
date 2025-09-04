import React, {useState, useEffect} from "react";
import {View, Text, Pressable} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [nome, setNome] = useState('');
    useEffect(() => {
        const buscarDados = async () => {
            const tokenUser = await AsyncStorage.getItem('userToken');
            const response = await axios.get('http://127.0.0.1:8000/api/getdate', {}, {
                Headers: {
                    Authenticate: `Bearer: ${tokenUser}`
                }
            })
        }
    },[]);
    return(
        <View>
            
            <View>
                <Pressable>
                    <Text>Nome</Text>
                </Pressable>
                <Pressable>
                    <Text>Notificação</Text>
                </Pressable>
                <Pressable>
                    <Text>Ajuda</Text>
                </Pressable>
            </View>
            <View>
                
            </View>
        </View>
    );
};
export default HomeScreen;