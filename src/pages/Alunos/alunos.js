import React, { useEffect, useState } from "react";
import {StyleSheet, View, FlatList, Text} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

var jwtDecode = require('jwt-decode');

import {url} from "../../utils/constants";

import Cabecalho from "../../components/cabecalho/cabecalho";
import Titulo from "../../components/titulo/titulo";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const Alunos = ({navigation}) => {
    const Item = ({nome, id}) => {
        return (
            <View style={{flexDirection: "row", alignItems: "center", width: "50%", marginVertical: 10}}>
                <Text style={{height: 50, width: 50, textAlign: "center", textAlignVertical: "center", backgroundColor: id===meuId? "#00C2EE" : "#AAA", borderRadius: 50, fontWeight: "bold", color: "white", fontSize: 25}}>{nome.substring(0,1).toUpperCase()}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("DetalhesAluno", {
                    idAluno: id,
                    nome: nome
                })} style={{flexDirection: "row"}}>
                    <Text style={{textAlign: "left", marginLeft: 25, color: "#0069D9", fontSize: 15}}>{nome}</Text>
                    {id===meuId&&<Text style={{marginLeft: 5, color: "#0069D9", fontSize: 15}}>(Eu)</Text>}
                </TouchableOpacity>
            </View>
        )
    }

    const [alunos, setAlunos] = useState([]);
    const [meuId, setMeuId] = useState("");

    const pegarMeuId = async () => {
        let token = await AsyncStorage.getItem("@jwt");
        setMeuId(jwtDecode(token).id);
    }

    const pegarAlunos = async () => {
        try {
            const response = await fetch(`${url}/usuario`);
            const data = await response.json();

            let alunos = data.filter(usuario=>usuario.alunosTurmas.length>0)

            let dadosAlunos = [];
            let obj = {};

            alunos.map(aluno => {
                obj = {
                    nome: aluno.nome,
                    id: aluno.id
                };
                dadosAlunos.push(obj);
            })

            alunos.sort(function (a, b) {
                return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
            })

            setAlunos(alunos);
        } 
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        pegarAlunos();
        pegarMeuId()
    }, []);

    const renderItem = ({item}) => {
        return <Item nome={item.nome} id={item.id}/>;
    }

    return (
        <>
            <Cabecalho navigation={navigation}/>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <View style={styles.container}>
                        <Titulo titulo="Alunos" subtitulo="(Em ordem alfabética)"/>
                        <FlatList
                            data={alunos}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={{width: "75%"}}
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
    }
});

export default Alunos;