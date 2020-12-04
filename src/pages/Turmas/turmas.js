import React, { useEffect, useState } from "react";
import {StyleSheet, View, FlatList, Text, ScrollView, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

var jwtDecode = require('jwt-decode');

import {url} from "../../utils/constants";

import Cabecalho from "../../components/cabecalho/cabecalho";
import Titulo from "../../components/titulo/titulo";

const Item = ({nome, curso, qtdProfessores, qtdAlunos, idTurma, navigation}) => {
    return (
        <View style={{width: "100%", height: "auto", borderWidth: 1, borderRadius: 10, borderColor: "#CCC", padding: 15, marginVertical: 10}}>
            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 17.5}}>{nome} - {curso}</Text>
            <Text style={{marginVertical: 15, textAlign: "center"}}>Essa turma possui {qtdProfessores} professor(es) e {qtdAlunos} aluno(s).</Text>
            <View style={{width: "100%", alignItems: "center"}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("DetalhesTurma", {
                        id: idTurma,
                        nome: nome,
                        curso: curso
                    })}
                >
                    <Text style={styles.buttonText}>Ver objetivos</Text>
                </TouchableOpacity>
            </View>
        </View>  
    )
}

const Turmas = ({navigation}) => {
    const [idUsuarioLogado, setIdUsuarioLogado] = useState("");
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        if(turmas.length<1)
            listar();
    });

    const pegarIdUsuarioLogado = async () => {
        let token = await AsyncStorage.getItem("@jwt");
        setIdUsuarioLogado(jwtDecode(token).id);
    }

    const listar = async () => {
        try {
            pegarIdUsuarioLogado();
            
            const response = await fetch(`${url}/turma`);
            const data = await response.json();
            
            let turmasDoUsuario = [];

            data.map(turma => {
                turma.alunosTurmas.map(alunoTurma => {
                    if(alunoTurma.idUsuario===idUsuarioLogado) {
                        turmasDoUsuario.push(turma);
                    }
                })
            })

            setTurmas(turmasDoUsuario);
        } 
        catch (error) {
            console.log(error);
        }
    }

    const renderItem = ({item}) => {
        return <Item nome={item.descricao} curso={item.curso.titulo} qtdProfessores={item.professoresTurmas.length} qtdAlunos={item.alunosTurmas.length} idTurma={item.id} navigation={navigation}/>
    }

    return (
        <>
            <Cabecalho navigation={navigation}/>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <View style={styles.container}>
                        <Titulo titulo="Turmas"/>
                        <FlatList
                            data={turmas}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={{width: "100%"}}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%"
    },
    button : {
        backgroundColor : '#0069D9',
        padding: 10,
        borderRadius: 6,
        width: "80%",
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText : {
        color: 'white'
    },
});

export default Turmas;