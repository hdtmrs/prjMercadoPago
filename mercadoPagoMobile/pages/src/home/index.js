import React, {useState, useEffect} from "react";
import {View, Text, Pressable, ActivityIndicator, Modal, TextInput, StyleSheet, ScrollView} from 'react-native';
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
                    headers: { Authorization: `Bearer ${tokenUser}` }
                });
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
                    headers: { Authorization: `Bearer ${tokenUser}` }
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

    const exit = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
    }

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
            await axios.post('http://127.0.0.1:8000/api/post',{
                valorEntregue,
                tipo,
                motivo,
            },{
                headers: { Authorization: `Bearer ${tokenUser}` }
            });
        }catch(err) {
            console.log(err);
        }
    }

    const atualizarGrana = async (valor) => {
        try{
            const tokenUser = await AsyncStorage.getItem('userToken');
            await axios.put('http://127.0.0.1:8000/api/update-money',{valor}, {
                headers: { Authorization: `Bearer ${tokenUser}` }
            })
        }catch(err) {
            console.log(err);
        }
    }

    if(loading) {
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#009ee3" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.headerText}>{nome}</Text>
                <Pressable><Text style={styles.headerBtn}>Notificação</Text></Pressable>
                <Pressable onPress={exit}><Text style={styles.headerBtn}>Sair</Text></Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Seu saldo</Text>
                    <Text style={styles.balanceValue}>R$ {dinheiro.toFixed(2)}</Text>
                    <View style={styles.balanceActions}>
                        <Pressable style={styles.btnPrimary} onPress={() => setModalSet(true)}>
                            <Text style={styles.btnText}>Colocar</Text>
                        </Pressable>
                        <Pressable style={styles.btnSecondary} onPress={() => setModalGet(true)}>
                            <Text style={styles.btnText}>Retirar</Text>
                        </Pressable>
                    </View>
                </View>

                
                <Text style={styles.sectionTitle}>Histórico</Text>
                {historicos.map((historico, index) => (
                    <View key={index} style={styles.historyCard}>
                        <Text style={styles.historyText}>Valor: R$ {historico.valor}</Text>
                        <Text style={styles.historyText}>Tipo: {historico.tipo}</Text>
                        <Text style={styles.historyText}>Motivo: {historico.motivo}</Text>
                        <Text style={styles.historyDate}>Data: {historico.data}</Text>
                    </View>
                ))}
            </ScrollView>

            
            <Modal visible={modalSet} transparent={true} animationType="slide" onRequestClose={() => setModalSet(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Pressable onPress={() => setModalSet(false)}><Text style={styles.closeBtn}>✕</Text></Pressable>
                        <Text style={styles.modalTitle}>Adicionar dinheiro</Text>
                        <TextInput 
                            style={styles.input}
                            value={dinheiroSet.toString()} 
                            onChangeText={(text) => setDinheiroSet(Number(text))}
                            keyboardType="numeric" 
                            placeholder="Valor"
                        />
                        <TextInput
                            style={styles.input}
                            value={motivo}
                            onChangeText={setMotivo}
                            placeholder="Motivo"
                        /> 
                        <Pressable style={styles.btnPrimary} onPress={colocarGrana}>
                            <Text style={styles.btnText}>Enviar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            
            <Modal visible={modalGet} transparent={true} animationType="slide" onRequestClose={() => setModalGet(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Pressable onPress={() => setModalGet(false)}><Text style={styles.closeBtn}>✕</Text></Pressable>
                        <Text style={styles.modalTitle}>Retirar dinheiro</Text>
                        <TextInput 
                            style={styles.input}
                            value={dinheiroGet.toString()} 
                            onChangeText={(text) => setDinheiroGet(Number(text))}
                            keyboardType="numeric" 
                            placeholder="Valor"
                        />
                        <TextInput
                            style={styles.input}
                            value={motivo}
                            onChangeText={setMotivo}
                            placeholder="Motivo"
                        /> 
                        <Pressable style={styles.btnSecondary} onPress={tirarGrana}>
                            <Text style={styles.btnText}>Enviar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#ffe600ff" 
    },

    loadingContainer: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    loadingText: { 
        marginTop: 8, 
        fontSize: 16, 
        color: "#555", 
        fontWeight: "300",
        letterSpacing: 0.5
    },

    header: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        backgroundColor: "#009ee3", 
        padding: 16, 
        elevation: 6, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3
    },
    headerText: { 
        color: "#fff", 
        fontSize: 20, 
        fontWeight: "600", 
        letterSpacing: 0.5 
    },
    headerBtn: { 
        color: "#fff", 
        fontSize: 14, 
        fontWeight: "400" 
    },

    scrollContent: { padding: 16 },

    balanceCard: { 
        backgroundColor: "#fff", 
        padding: 20, 
        borderRadius: 14, 
        marginBottom: 20, 
        alignItems: "center",
        elevation: 6, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 3 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 6 
    },
    balanceLabel: { 
        fontSize: 15, 
        color: "#666", 
        fontWeight: "300" 
    },
    balanceValue: { 
        fontSize: 32, 
        fontWeight: "600", 
        color: "#009ee3", 
        marginVertical: 8,
        letterSpacing: 1 
    },
    balanceActions: { 
        flexDirection: "row", 
        gap: 12, 
        marginTop: 14 
    },

    btnPrimary: { 
        backgroundColor: "#009ee3", 
        paddingVertical: 12, 
        paddingHorizontal: 24, 
        borderRadius: 12, 
        elevation: 4, 
        shadowColor: "#009ee3",
        shadowOpacity: 0.25,
        shadowRadius: 5
    },
    btnSecondary: { 
        backgroundColor: "#00d46a", 
        paddingVertical: 12, 
        paddingHorizontal: 24, 
        borderRadius: 12, 
        elevation: 4, 
        shadowColor: "#00d46a",
        shadowOpacity: 0.25,
        shadowRadius: 5
    },
    btnText: { 
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "600" 
    },

    sectionTitle: { 
        fontSize: 18, 
        fontWeight: "600", 
        marginBottom: 12, 
        color: "#333", 
        letterSpacing: 0.5 
    },

    historyCard: { 
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
    historyText: { 
        fontSize: 14, 
        color: "#333", 
        fontWeight: "400" 
    },
    historyDate: { 
        fontSize: 12, 
        color: "#888", 
        marginTop: 6, 
        fontStyle: "italic" 
    },

    modalContainer: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "rgba(0,0,0,0.5)" 
    },
    modalContent: { 
        width: "85%", 
        backgroundColor: "#fff", 
        borderRadius: 14, 
        padding: 22, 
        elevation: 8, 
        shadowColor: "#000", 
        shadowOpacity: 0.25, 
        shadowRadius: 6 
    },
    closeBtn: { 
        fontSize: 20, 
        alignSelf: "flex-end", 
        color: "#444" 
    },
    modalTitle: { 
        fontSize: 20, 
        fontWeight: "600", 
        marginBottom: 16, 
        color: "#009ee3", 
        textAlign: "center" 
    },
    input: { 
        borderWidth: 1, 
        borderColor: "#ccc", 
        borderRadius: 10, 
        padding: 12, 
        marginBottom: 14, 
        fontSize: 14,
        fontWeight: "300",
        color: "#333"
    }
});


export default HomeScreen;
