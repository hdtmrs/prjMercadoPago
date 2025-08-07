import React, {use, useState} from "react";
import {View, Text, Pressable, TextInput} from 'react-native';
import axios from 'axios';

const CadastroScreen = () => {
    const [carregando, setCarregando] = (false);
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
        const response = await axios.post('http://127.0.0.1:8000/api/cadastrar', {
            nome,
            email,
            senha,
            cpf,
        });

        

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
                <TextInput />

                <Text>
                    Email
                </Text>
                <TextInput />

                <Text>
                    Senha
                </Text>
                <TextInput />

                <Text>
                    Confirme a senha
                </Text>
                <TextInput />

                <Text>
                    Cadastro de Pessoa Fisica - CPF
                </Text>
                <TextInput />

                <Button />
            </View>
        </View>
    );
};
export default CadastroScreen;