import React, { useState } from "react";
import { View, Text, Pressable, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const CadastroScreen = ({ navigation }) => {
  const [carregando, setCarregando] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [cpf, setCpf] = useState('');
  const [erroMessage, setErroMessage] = useState('');
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validarDados = () => {
    if (!nome || !email || !senha || !senhaConfirma || !cpf) {
      setErroMessage('Preencha todos os campos, são obrigatórios');
      return false;
    }
    if (!regexEmail.test(email)) {
      setErroMessage('Digite um email válido');
      return false;
    }
    if (senha.length < 8 || senhaConfirma.length < 8) {
      setErroMessage('Digite uma senha com no mínimo 8 dígitos');
      return false;
    }
    if (senha !== senhaConfirma) {
      setErroMessage('As senhas não coincidem');
      return false;
    }
    if (cpf.length < 11) {
      setErroMessage('Digite um CPF válido');
      return false;
    }
    return true;
  };

  const enviarDados = async () => {
    if (!validarDados()) return;

    setCarregando(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/cadastrar', {
        nome,
        email,
        senha,
        cpf,
      });
      navigation.navigate('Login');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setErroMessage('Erro, cadastro não autorizado');
        } else if (err.response.status === 500) {
          setErroMessage('Erro no servidor');
        } else {
          setErroMessage('Erro, tente novamente mais tarde');
        }
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Cadastrar nova conta</Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          onChangeText={setNome}
          value={nome}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha (mín. 8)"
          secureTextEntry
          onChangeText={setSenha}
          value={senha}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Confirme a senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
          onChangeText={setSenhaConfirma}
          value={senhaConfirma}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Cadastro de Pessoa Física - CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          keyboardType="numeric"
          onChangeText={setCpf}
          value={cpf}
          placeholderTextColor="#999"
        />

        {erroMessage ? <Text style={styles.error}>{erroMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={enviarDados} disabled={carregando}>
          {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
        </TouchableOpacity>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Já tem uma conta? <Text style={styles.link}>Entrar</Text></Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    flexDirection: "row",
  },
  backText: {
    fontSize: 22,
    marginRight: 10,
    color: "#009EE3",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#009EE3",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#009EE3",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  registerText: {
    marginTop: 25,
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  link: {
    color: "#009EE3",
    fontWeight: "bold",
  }
});

export default CadastroScreen;
