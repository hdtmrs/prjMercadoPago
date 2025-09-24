import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [erroMessage, setErroMessage] = useState('');
  const [carregando, setCarregando] = useState(false);
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const entrar = async () => {
      const tokenUser = await AsyncStorage.getItem('userToken');
      if(tokenUser) {
        navigation.navigate('Home');
      }
    }
    entrar();
  },[]);
  const validarDados = () => {
    if (!senha || !email) {
      setErroMessage('Digite os campos obrigatórios');
      return false;
    }
    if (!regex.test(email)) {
      setErroMessage('Email em formato incorreto');
      return false;
    }
    if (!(senha.length >= 8)) {
      setErroMessage('Digite uma senha com no mínimo 8 caracteres');
      return false;
    }
    return true;
  };

  const enviarLogin = async () => {
    if (!validarDados()) { return };

    setCarregando(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/entrar', {
        email,
        senha,
      });

      const tokenUser = response.data.token;
      await AsyncStorage.setItem('userToken', tokenUser);

      navigation.navigate('Home');
    } catch (erro) {
      if (erro.response?.status) {
        const codigo = erro.response?.status;
        if (codigo === 401) {
          setErroMessage('Não autorizado, email ou senha incorretos');
        } else if (codigo === 500) {
          setErroMessage('Erro no servidor');
        } else {
          setErroMessage('Erro não identificado, tente novamente mais tarde');
        }
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Digite seu email"
          keyboardType='email-address'
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          onChangeText={setSenha}
          value={senha}
          placeholder="Digite sua senha"
          keyboardType='default'
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Pressable>
          <Text style={styles.forgotText}>Esqueci minha senha?</Text>
        </Pressable>

        {erroMessage ? <Text style={styles.error}>{erroMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={enviarLogin} disabled={carregando}>
          {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
        </TouchableOpacity>

        <Pressable onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerText}>Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text></Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#ffe600ff",
      padding: 20,
      justifyContent: "center" 
  },
  header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30 
  },
  backText: {
      fontSize: 22,
      marginRight: 10,
      color: "#009EE3"
  },
  title: {
      fontSize: 26,
      fontWeight: "bold",
      color: "#009EE3"
  },
  form: { 
      width: "100%",
      backgroundColor: "#fff", 
      padding: 16, 
      borderRadius: 12, 
      marginBottom: 14, 
      elevation: 4, 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 3 }, 
      shadowOpacity: 0.15, 
      shadowRadius: 4  
  },
  card: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 20,
      elevation: 5,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6
  },
  label: { 
      fontSize: 14,
      color: "#333",
      marginTop: 15
  },
  input: { 
      backgroundColor: "#F5F5F5",
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#000',
      fontSize: 16,
      color: "#333",
      marginBottom: 10
  },
  forgotText: { 
      marginTop: 10,
      fontSize: 14,
      color: "#009EE3",
      textAlign: "right"
  },
  error: {
      color: "red",
      marginTop: 10,
      fontSize: 14 
  },
  button: {
      backgroundColor: "#009EE3",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20
  },
  buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600" 
  },
  registerText: {
      marginTop: 25, 
      fontSize: 14,
      textAlign: "center",
      color: "#555"
  },
  link: {
      color: "#009EE3",
      fontWeight: "bold"
  }
});

export default LoginScreen;
