import React, {useState} from "react";
import {View, Text, Pressable, TextInput, Button} from 'react-native';
import axios from 'axios';

const CadastroScreen = ({navigation}) => {
    const [carregando, setCarregando] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirma, setSenhaConfirma] = useState('');
    const [cpf, setCpf] = useState('');
    const [erroMessage, setErroMessage] = useState('');
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validarDados = () => {
        if(!nome || !email || !senha || !senhaConfirma || !cpf) {
            setErroMessage('Preencha todos os campos, são obrigatorios');
            return false;
        }

        if(!regexEmail.test(email)) {
            setErroMessage('Digite um email valido');
            return false;
        }

        if(senha.length < 8 || senhaConfirma.length < 8) {
            setErroMessage('Digite uma senha com mais de 8 digitos');
            return false;
        }

        if(!senha === senhaConfirma) {
            setErroMessage('As senhas estão divergentes');
            return false;
        }

        if(cpf.length < 11) {
            setErroMessage('Digite um cpf de tamanho valido')
            return false;
        }

        return true;

    }

    const enviarDados = async () => {
        if(!validarDados) return;

        setCarregando(true);
        try{
        const response = await axios.post('http://127.0.0.1:8000/api/cadastrar', {
            nome,
            email,
            senha,
            cpf,
        });

        if(response.status === 200) {
            navigation.navigate('Login');
        }
        }catch(err) {
            if(err.response) {
                if(err.response.status === 401) {
                    setErroMessage('Erro, cadastro não autorizado');
                    return;
                }else if(err.response.status === 500) {
                    setErroMessage('Erro, no Servidor');
                    return;
                }else{
                    setErroMessage('Erro, tente novamente mais tarde');
                    return;
                }
            }
        }finally{
            setCarregando(false);
        }
    }
    return(
        <View>
            <Pressable>
                <Text>
                    Back
                </Text>
            </Pressable>
            <Text>
                Cadastrar nova conta
            </Text>

            <View>
                <Text>
                    Nome
                </Text>
                <TextInput 
                    keyboardType="default"
                    onChangeText={nome => setNome(nome)}
                    placeholder="Digite seu nome"
                />

                <Text>
                    Email
                </Text>
                <TextInput 
                    keyboardType="email-address"
                    onChangeText={email => setEmail(email)}
                    placeholder="Digite seu email"
                />

                <Text>
                    Senha
                </Text>
                <TextInput 
                    keyboardType="default"
                    onChangeText={senha => setSenha(senha)}
                    placeholder="Digite sua senha (min:8)"
                    secureTextEntry
                />

                <Text>
                    Confirme a senha
                </Text>
                <TextInput 
                    keyboardType="default"
                    onChangeText={senhaConfirma => setSenhaConfirma(senhaConfirma)}
                    placeholder="Digite sua senha (min:8)"
                    secureTextEntry
                />
                <Text>
                    Cadastro de Pessoa Fisica - CPF
                </Text>
                <TextInput 
                    keyboardType="default"
                    onChangeText={cpf => setCpf(cpf)}
                    placeholder="Digite seu cpf"
                />

                <Button onPress={() => enviarDados()}/>
            </View>
        </View>
    );
};

export default CadastroScreen;