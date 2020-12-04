import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import {url} from "../../utils/constants";

const Ranking = ({idUsuario}) => {
    const [ranking, setRanking] = useState([]);
    const [curtidas, setCurtidas] = useState([]);

    useEffect(() => {
        if(curtidas.length<1)
            pegarCurtidas();
        if(ranking.length<1)
            montarRanking();
    });

    const pegarCurtidas = async () => {
        const response = await fetch(`${url}/curtida`);
        const data = await response.json();
        setCurtidas(data);
    }

    const montarRanking = async () => {
        const response =  await fetch(`${url}/usuario/ranking`);
        const data = await response.json();

        let dados = [];
        let obj = {};
        
        let qtdObjetivosConcluidos;
        let qtdCurtidas;
        let qtdObjetivosOcultosConcluidos;
        let qtdNotasMaximas;

        data.map(aluno => {
            qtdObjetivosConcluidos=0;
            qtdCurtidas=0;
            qtdObjetivosOcultosConcluidos=0;
            qtdNotasMaximas=0;
            aluno.alunosTurmas.map(alunoTurma=> {
                alunoTurma.objetivosAlunos.map(objetivoAluno => {
                    if(objetivoAluno.nota>0)
                        qtdObjetivosConcluidos++;
                    if(objetivoAluno.nota>0&&objetivoAluno.objetivo.idCategoria==="32998fb1-1956-46a6-813e-14bbbaadd97b")
                        qtdObjetivosOcultosConcluidos++;
                    if(objetivoAluno.nota===100)
                        qtdNotasMaximas++;
                });
            });

            curtidas.map(dica=> {
                qtdCurtidas += dica.idUsuario===aluno.id ? dica.curtidas.length : 0
            });

            obj = {
                id: aluno.id,
                objetivosConcluidos: {
                    posicao: 0,
                    qtdObjetivosConcluidos: qtdObjetivosConcluidos
                },
                curtidas: {
                    posicao: 0,
                    qtdCurtidas: qtdCurtidas
                },
                segredos: {
                    posicao: 0,
                    qtdObjetivosOcultosConcluidos: qtdObjetivosOcultosConcluidos
                },
                notasMaximas: {
                    posicao: 0,
                    qtdNotasMaximas: qtdNotasMaximas
                }
            };
            dados.push(obj);
        });

        //
        dados.sort((a,b) => {
            return (b.objetivosConcluidos.qtdObjetivosConcluidos > a.objetivosConcluidos.qtdObjetivosConcluidos) ? 1 : ((a.objetivosConcluidos.qtdObjetivosConcluidos > b.objetivosConcluidos.qtdObjetivosConcluidos) ? -1 : 0);
        });
        dados.map((aluno, index) => {
            aluno.objetivosConcluidos.posicao=index+1;
        });

        //
        dados.sort((a,b) => {
            return (b.curtidas.qtdCurtidas > a.curtidas.qtdCurtidas) ? 1 : ((a.curtidas.qtdCurtidas > b.curtidas.qtdCurtidas) ? -1 : 0);
        });
        dados.map((aluno, index) => {
            aluno.curtidas.posicao=index+1;
        });

        //
        dados.sort((a,b) => {
            return (b.segredos.qtdObjetivosOcultosConcluidos > a.segredos.qtdObjetivosOcultosConcluidos) ? 1 : ((a.segredos.qtdObjetivosOcultosConcluidos > b.segredos.qtdObjetivosOcultosConcluidos) ? -1 : 0);
        })
        dados.map((aluno, index) => {
            aluno.segredos.posicao=index+1;
        })

        //
        dados.sort((a,b) => {
            return (b.notasMaximas.qtdNotasMaximas > a.notasMaximas.qtdNotasMaximas) ? 1 : ((a.notasMaximas.qtdNotasMaximas > b.notasMaximas.qtdNotasMaximas) ? -1 : 0);
        })
        dados.map((aluno, index) => {
            aluno.notasMaximas.posicao=index+1;
        })

        setRanking(dados);
    }

    const Item = ({objetivosConcluidos, curtidas, segredos, notasMaximas}) => {
        return (
            <View style={{alignItems: "center"}}>
                <View style={[styles.redondo, styles.green]}>
                    <Text style={[styles.text, styles.textGrande]}>{objetivosConcluidos.posicao}º</Text>
                    <Text style={styles.text}>{objetivosConcluidos.qtdObjetivosConcluidos}</Text>
                    <Text style={styles.text}>Objetivos concluídos</Text>
                </View>
                <View style={{flexDirection: "row", width: "auto"}}>
                    <View style={[styles.redondo, styles.blue]}>
                        <Text style={[styles.text, styles.textGrande]}>{curtidas.posicao}º</Text>
                        <Text style={styles.text}>{curtidas.qtdCurtidas}</Text>
                        <Text style={styles.text}>Curtidas em posts</Text>
                    </View>
                    <View style={[styles.redondo, styles.yellow]}>
                        <Text style={[styles.text, styles.textGrande]}>{segredos.posicao}º</Text>
                        <Text style={styles.text}>{segredos.qtdObjetivosOcultosConcluidos}</Text>
                        <Text style={styles.text}>Segredos encontrados</Text>
                    </View>
                </View>
                <View style={[styles.redondo, styles.red]}>
                    <Text  style={[styles.text, styles.textGrande]}>{notasMaximas.posicao}º</Text>
                    <Text style={styles.text}>{notasMaximas.qtdNotasMaximas}</Text>
                    <Text style={styles.text}>Notas máximas</Text>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={ranking}
            renderItem={({item}) => {
                if(item.id===idUsuario)
                    return <Item objetivosConcluidos={item.objetivosConcluidos} curtidas={item.curtidas} segredos={item.segredos} notasMaximas={item.notasMaximas}/>
            }}
            keyExtractor={item => item.id}
            style={{width: "100%"}}
        />
    )
}

const styles=StyleSheet.create({
    redondo: {
        width: 125,
        height: 125,
        borderRadius: 125
    },
    green: {
        backgroundColor: "#00D65F"
    },
    red: {
        backgroundColor: "#FF271C",
    },
    yellow: {
        backgroundColor: "#F9E800",
    },
    blue: {
        backgroundColor: "#00C2EE"
    },
    text: {
        textAlign: "center",
        color: "white"
    },
    textGrande: {
        fontWeight: "bold",
        fontSize: 30
    }
});

export default Ranking;