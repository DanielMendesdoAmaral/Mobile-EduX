import React, { useEffect, useState } from "react";
import {StyleSheet, View, FlatList, Text, ScrollView} from "react-native";

import {url} from "../../utils/constants";

import Cabecalho from "../../components/cabecalho/cabecalho";
import Titulo from "../../components/titulo/titulo";

const ObjetivosTurmas = ({navigation, route}) => {
    const [alunoTurma, setAlunoTurma] = useState({});

    const [desejaveis, setDesejaveis] = useState([]);
    const [criticos, setCriticos] = useState([]);
    const [ocultos, setOcultos] = useState([]);

    useEffect(() => {
        if(alunoTurma==={}||desejaveis.length<1||criticos.length<1||ocultos.length<1)
            pegarAlunoTurma();
    });

    const pegarAlunoTurma = async () => {
        try {
            const response = await fetch(`${url}/usuario/buscar/id/${route.params.idUsuario}`);
            const data = await response.json();

            data.alunosTurmas.map(alunoTurma => {
                if(route.params.idTurma===alunoTurma.idTurma) {
                    setAlunoTurma(alunoTurma);
                }
            });

            pegarDesejaveis();
            pegarCriticos();
            pegarOcultos();
        } 
        catch(error) {
            console.log(error);
        }
    }

    const pegarDesejaveis = () => {
        let objetivosDesejaveis = []
        alunoTurma.objetivosAlunos.map(objetivoAluno => {
            if(objetivoAluno.objetivo.idCategoria==="ede0aec0-9c16-4d5f-bf8a-d0d37c911838") {
                objetivosDesejaveis.push(objetivoAluno);
            }
        })
        setDesejaveis(objetivosDesejaveis);
    }

    const pegarCriticos = () => {
        let objetivosCriticos=[];
        alunoTurma.objetivosAlunos.map(objetivoAluno => {
            if(objetivoAluno.objetivo.idCategoria==="6a658a5a-d30e-4d81-904b-bd345d805989") {
                objetivosCriticos.push(objetivoAluno);
            }
        })
        setCriticos(objetivosCriticos);
    }

    const pegarOcultos = () => {
        let objetivosOcultos = [];
        alunoTurma.objetivosAlunos.map(objetivoAluno => {
            if(objetivoAluno.objetivo.idCategoria==="32998fb1-1956-46a6-813e-14bbbaadd97b"&&objetivoAluno.nota>0) {
                objetivosOcultos.push(objetivoAluno);
            }
        })
        setOcultos(objetivosOcultos);
    }

    const renderItem = ({item}) => {
        return <Item 
            dataAlcancado = {item.dataAlcancado}
            nota = {item.nota}
            descricao = {item.objetivo.descricao}
        />
    }

    const Item = ({dataAlcancado, nota, descricao}) => {
        return (
            <View style={{width: "100%", height: "auto", borderWidth: 1, borderRadius: 10, borderColor: "#CCC", padding: 15, marginVertical: 10}}>
                <Text style={{marginVertical: 15, textAlign: "center"}}>{descricao}</Text>
                <Text style={{marginVertical: 15, textAlign: "center", fontWeight: "bold"}}>Nota: <Text>{nota}</Text></Text>
                <Text style={{marginVertical: 15, textAlign: "center"}}>{dataAlcancado.substring(0, 10)} - {dataAlcancado.substring(11, 16)}</Text>
            </View>
        )
    }

    return (
        <>
            <Cabecalho voltar="Objetivos" navigation={navigation}/>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <View style={styles.container}>
                        <Titulo titulo={`Objetivos em ${route.params.nomeTurma}`}/>
                        <View style={{width: "100%", height: "auto", borderWidth: 1, borderRadius: 10, borderColor: "#CCC", padding: 15, marginVertical: 10}}>
                            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 17.5}}>Crítico</Text>
                            <FlatList
                                data={criticos}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                style={{width: "100%"}}
                            />
                        </View>
                        <View style={{width: "100%", height: "auto", borderWidth: 1, borderRadius: 10, borderColor: "#CCC", padding: 15, marginVertical: 10}}>
                            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 17.5}}>Desejável</Text>
                            <FlatList
                                data={desejaveis}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                style={{width: "100%"}}
                            />
                        </View>
                        <View style={{width: "100%", height: "auto", borderWidth: 1, borderRadius: 10, borderColor: "#CCC", padding: 15, marginVertical: 10}}>
                            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 17.5}}>Oculto</Text>
                            <FlatList
                                data={ocultos}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                style={{width: "100%"}}
                            />
                        </View>
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

export default ObjetivosTurmas;