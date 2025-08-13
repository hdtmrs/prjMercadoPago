import React, {useState} from "react";
import {View, Text, Pressable, TextInput, Button} from 'react-native';

import axios from 'axios';

const LoginScreen = ({navigation}) => {
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [erroMessage, setErroMessage] = useState('');
    const [carregando, setCarregando] = useState(false);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validarDados = () => {

        if(!senha || !email) {
            setErroMessage('Digite os campos obrigatorios');
            return false;
        }
        if(!regex.test(email)) {
            setErroMessage('Email em formato incorreto');
            return false;
        }

        if(!senha.length >= 8) {
            setErroMessage('Digite uma senha com no minimo 8 caracteres');
            return false;
        }

        return true;
    }

    const enviarLogin = async () => {
        if(!validarDados()){return};

        setCarregando(true);

        try{
            const response = await axios.get('http://127.0.0.1:8000', {
                email,
                senha,
            });

            navigation.navigate('Home');
        }catch(erro) {
            if(erro.response?.status){
                const codigo = erro.response?.status;
                if(codigo === 401){
                    setErroMessage('Não autorizado, email ou senha incorretos');
                    return;
                }else if(codigo === 500){
                    setErroMessage('Erro no servidor');
                    return;
                }else{
                    setErroMessage('Erro não indentificado, tente novamente mais tarde');
                    return;
                }
            }
        }finally{
            setCarregando(false);
        }
    }
    return(
        <View>
            <View>
                <Pressable>
                    <Text>Back</Text>
                </Pressable>
                <Text>Login</Text>
            </View>
            <View>
                <Text>Email</Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Digite seu email"
                    keyboardType='email-address'
                />
                <Text>Senha</Text>
                <TextInput
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Digite seu email"
                    keyboardType='email-address'
                />
                <Text>Esqueci minha senha?</Text>

                <Button
                    onPress={() => enviarLogin()}
                />
                <Pressable onPress={() => navigation.navigate('Cadastro')}>
                    <Text>Não tem uma conta? Cadastre-se aqui</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LoginScreen;