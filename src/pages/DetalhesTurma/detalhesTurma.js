import React, { useEffect, useState } from "react";
import {StyleSheet, View, FlatList, Text, ScrollView} from "react-native";

import {url} from "../../utils/constants";

import Cabecalho from "../../components/cabecalho/cabecalho";
import Titulo from "../../components/titulo/titulo";

const DetalhesTurma = ({route, navigation}) => {
    const [professores, setProfessores] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [turma, setTurma] = useState([]);

    useEffect(() => {
        listarTurma();
    }, [turma]);

    const pegarProfessores = () => {
        let professores = [];

        turma.map(turma => {
            turma.professoresTurmas.sort(function (a, b) {
                return (a.usuario.nome > b.usuario.nome) ? 1 : ((b.usuario.nome > a.usuario.nome) ? -1 : 0);
            })
            .map(professor => {
                professores.push(professor.usuario.nome);
            });
        })

        if(turma[0].professoresTurmas.length===professores.length)
            setProfessores(professores);
    }

    const pegarAlunos = () => {
        let alunos = [];

        turma.map(turma => {
            turma.alunosTurmas.sort(function (a, b) {
                return (a.usuario.nome > b.usuario.nome) ? 1 : ((b.usuario.nome > a.usuario.nome) ? -1 : 0);
            })
            .map(aluno => {
                alunos.push(aluno.usuario.nome);
            });
        })

        if(turma[0].alunosTurmas.length===alunos.length)
            setAlunos(alunos);
    }

    const listarTurma = async () => {
        const response = await fetch(`${url}/turma`)
        const data = await response.json();

        let turmas = data.filter(dado => dado.id===route.params.id);

        setTurma(turmas);
        pegarProfessores();
        pegarAlunos();
    }

    const Item = ({nome}) => {
        return (
            <Text style={{marginVertical: 15, textAlign: "center"}}>{nome}</Text>
        )
    }

    const renderItem = ({item}) => {
        return <Item
            nome = {item}
        />;
    }

    return(
        <>
            <Cabecalho navigation={navigation} voltar="Turmas"/>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <View style={styles.container}>
                        <Titulo titulo={`${route.params.nome} - ${route.params.curso}`} style={{textTransform: "uppercase"}}/>
                        <View style={{width: "100%", height: "auto", borderWidth: 1, borderRadius: 10, borderColor: "#CCC", padding: 15, marginVertical: 10}}>
                            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 17.5}}>Professores</Text>
                            <FlatList
                                data={professores}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                style={{width: "100%"}}
                            />
                        </View>
                        <View style={{width: "100%", height: "auto", borderWidth: 1, borderRadius: 10, borderColor: "#CCC", padding: 15, marginVertical: 10}}>
                            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 17.5}}>Alunos</Text>
                            <FlatList
                                data={alunos}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                style={{width: "100%"}}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%"
    }
})

export default DetalhesTurma;