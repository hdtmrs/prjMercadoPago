import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from 'react-native';

const PerfilScreen = ({ navigation }) => {
    return(
        <View>
            <View>
                <Pressable onPress={() => navigation.goback()}>
                    <Text>Voltar</Text>
                </Pressable>
                <Text>
                    Perfil
                </Text>
            </View>
            <View>
                <Image source={require('../../../assets/avatar-placeholder.png')} />
            </View>
        </View>
    );
};
export default PerfilScreen;
// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, Pressable, Image, StyleSheet, Modal, TextInput } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import axios from 'axios';
// import { AuthContext } from '../../../services/AuthContext';

// const MenuScreen = ({ navigation, route }) => {
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const { logout } = useContext(AuthContext);
//   const [erroMessage, setErroMessage] = useState('');
//   const [modalDelete, setModalDelete] = useState(false);
//   const [modalPermissaoDelete, setModalPermissaoDelete] = useState(false);
//   const mensagem = route.params?.mensagem;

//   useEffect(() => {
//     async function puxarInfos() {
//       try {
//         const token = await AsyncStorage.getItem('userToken');

//         if (!token) {
//           console.log('Token não recebido');
//         }

//         const response = await axios.get('http://127.0.0.1:8000/api/usuario/buscar', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log(response);

//         setNome(response.data.usuario.nome);
//         setEmail(response.data.usuario.email);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           setErroMessage('Acesso negado', 'Credenciais incorretas');
//           console.log(err);
//         } else {
//           setErroMessage('Falha na conexão com servidor.');
//           console.log('parara:', err);
//         }
//       }
//     }
//     puxarInfos();
//   }, []);

//   const excluirConta = async () => {
//     if (senha.length < 8) {
//       setErroMessage('Digite uma senha com mais de 8 caracteres');
//       return;
//     }

//     const tokenUser = await AsyncStorage.getItem('userToken');
//     try {
//       const response = await axios.delete('http://127.0.0.1:8000/api/usuario/deletar', {
//         headers: {
//           Authorization: `Bearer ${tokenUser}`,
//           senha: senha,
//         },
//       });
//       logout();
//     } catch (erro) {
//       if (erro.response?.status) {
//         const codigo = erro.response.status;

//         if (codigo === 401) {
//           setErroMessage('Não autorizado');
//           return;
//         } else if (codigo === 505) {
//           setErroMessage('Erro no servidor, tente novamente mais tarde');
//         } else {
//           setErroMessage('Erro inesperado, tente novamente mais tarde');
//         }
//       }
//       console.log(erro);
//     }
//   };

//   const sairConta = async () => {
//     await logout();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cabecalho}>
//         <Pressable onPress={() => navigation.navigate('Home')} style={styles.iconeCabecalho}>
//           <FontAwesome name="arrow-left" size={24} color="#12577B" />
//         </Pressable>
//         <Text style={styles.tituloCabecalho}>Seu Perfil</Text>
//         <Pressable onPress={() => navigation.navigate('Configuracao')} style={styles.iconeCabecalho}>
//           <FontAwesome name="cog" size={24} color="#12577B" />
//         </Pressable>
//       </View>
//       <Text>{mensagem}</Text>

//       <View style={styles.perfilContainer}>
//         <Image style={styles.avatar} source={require('../../../assets/avatar-placeholder.png')} />
//         <Text style={styles.nomePerfil}>{nome}</Text>
//         <Text style={styles.emailPerfil}>{email}</Text>
//       </View>

//       <View style={styles.opcoesContainer}>
//         <Text style={styles.tituloSecao}>O que você pode fazer por aqui</Text>

//         <Pressable style={styles.botaoOpcao} onPress={() => navigation.navigate('Ocorrencia')}>
//           <Text style={styles.textoOpcao}>Minhas Ocorrências</Text>
//           <FontAwesome name="chevron-right" size={16} color="#999" />
//         </Pressable>

//         <Pressable style={styles.botaoOpcao} onPress={() => navigation.navigate('DigiteDados')}>
//           <Text style={styles.textoOpcao}>Editar Perfil</Text>
//           <FontAwesome name="chevron-right" size={16} color="#999" />
//         </Pressable>

//         <Pressable style={styles.botaoOpcao}>
//           <Text style={styles.textoOpcao}>Termos e Privacidade</Text>
//           <FontAwesome name="chevron-right" size={16} color="#999" />
//         </Pressable>

//         <Pressable style={styles.botaoOpcao} onPress={() => navigation.navigate('DigiteCodigo')}>
//           <Text style={styles.textoOpcao}>Redefinir Senha</Text>
//           <FontAwesome name="chevron-right" size={16} color="#999" />
//         </Pressable>

//         <Pressable style={[styles.botaoOpcao, styles.botaoSair]} onPress={sairConta}>
//           <Text style={[styles.textoOpcao, styles.textoSair]}>Sair da Conta</Text>
//         </Pressable>

//         <Pressable style={[styles.botaoOpcao, styles.botaoSair]} onPress={() => setModalDelete(true)}>
//           <Text style={[styles.textoOpcao, styles.textoSair]}>Excluir Conta</Text>
//         </Pressable>
//       </View>

//       <Modal animationType="slide" transparent visible={modalPermissaoDelete}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Aviso!</Text>
//             <Text style={styles.modalMessage}>Deseja mesmo prosseguir com essa ação?</Text>

//             <Pressable style={styles.modalButtonConfirm} onPress={() => setModalDelete(true)}>
//               <Text style={styles.modalButtonText}>Sim</Text>
//             </Pressable>
//             <Pressable style={styles.modalButtonCancel} onPress={() => setModalPermissaoDelete(false)}>
//               <Text style={styles.modalButtonText}>Não</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//       <Modal animationType="fade" transparent visible={modalDelete}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Digite sua senha para confirmar</Text>
//             <TextInput
//               style={styles.modalInput}
//               secureTextEntry
//               value={senha}
//               onChangeText={setSenha}
//               placeholder="Senha"
//             />
//             {erroMessage ? <Text style={styles.modalError}>{erroMessage}</Text> : null}

//             <Pressable style={styles.modalButtonConfirm} onPress={excluirConta}>
//               <Text style={styles.modalButtonText}>Excluir</Text>
//             </Pressable>
//             <Pressable style={styles.modalButtonCancel} onPress={() => setModalDelete(false)}>
//               <Text style={styles.modalButtonText}>Voltar</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   cabecalho: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 30,
//     paddingHorizontal: 10,
//   },
//   tituloCabecalho: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#12577B',
//   },
//   iconeCabecalho: {
//     padding: 5,
//   },
//   perfilContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E2E8F0',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#E0E0E0',
//     marginBottom: 15,
//   },
//   nomePerfil: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#000',
//     marginBottom: 5,
//   },
//   emailPerfil: {
//     fontSize: 14,
//     color: '#666',
//   },
//   opcoesContainer: {
//     paddingHorizontal: 10,
//   },
//   tituloSecao: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//     fontWeight: '500',
//   },
//   botaoOpcao: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E2E8F0',
//   },
//   textoOpcao: {
//     fontSize: 16,
//     color: '#000',
//   },
//   botaoSair: {
//     marginTop: 20,
//     borderBottomWidth: 0,
//   },
//   textoSair: {
//     color: '#E74C3C',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(11, 11, 11, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   modalMessage: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   modalInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   modalError: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   modalButtonConfirm: {
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   modalButtonCancel: {
//     backgroundColor: 'gray',
//     padding: 10,
//     borderRadius: 5,
//   },
//   modalButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// });

// export default MenuScreen;
