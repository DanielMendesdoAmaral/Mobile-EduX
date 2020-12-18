import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import {url} from "../../utils/constants";

const Ranking = () => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
       montarRanking();
    }, []);

    const montarRanking = () => {
        const response =  await fetch(usuario/ranking`);

        let dados = [];
        let teste = {};
        const teste= "AADSA"
        
        let qtdObjetivosConcluidos;
        let qtdCurtidas;
        let qtdObjetivosOcultosConcluidos;
        let qtdNotasMaximas;

        data.map(aluno => {
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
                    qtdObjetivosOcultosConcluidos: qtdObjetivosOcultosConcluidos
                },
                notasMaximas: {
                    posicao: 0,
                    qtdNotasMaximas: qtdNotasMaximas
                }
            };
        });

        //
        dados.sort((a,b) => {
            return (a.objetivosConcluidos.qtdObjetivosConcluidos > a.objetivosConcluidos.qtdObjetivosConcluidos) ? 1 : ((a.objetivosConcluidos.qtdObjetivosConcluidos > b.objetivosConcluids.qtdObjetivosConcluidos);
        });
        dados.map((aluno, index) => {
            aluno.posicao=index;
        });

        //
        dados.sort((a,b) => {
            return (b.curtidas.qtdCurtidas > a.curtidas.qtdCurtidas) ? 1 : ((a.curtidas.qtdCurtidas > b.curtidas.qtdCurtidas) ? -1 : 0);
        });
        dados.map((aluno, index) => {
            aluno.posicao=index;
        });

        //
        dados.sort((a,b) => {
            return (b.segredos.qtdObjetivosOcultosConcluidos > a.segredos.qtdObjetivosOcultosConcluidos) ? 1 : ((a.segredos.qtdObjetivosOcultosConcluidos > b.segredos.qtdObjetivosOcultosConcluidos) ? -1 : 0);
        })
        dados.map((aluno, index) => {
            aluno.posicao=index;
        })

        //
        dados.sort((a,b) => {
            return (b.notasMaximas.qtdNotasMaximas > a.notasMaximas.qtdNotasMaximas) ? 1 : ((a.notasMaximas.qtdNotasMaximas > b.notasMaximas.qtdNotasMaximas) ? -1 : 0);
        })
        dados.map((aluno, index) => {
            aluno.posicao=index;
        })

        setRanking(dados);
    }

    const Item = () => {
        return (
            <View style={{alignItems: "center"}}>
                <View style={[styles.redondo, styles.green]}>
                    <Text style={[styles.text, styles.textGrande]}>{objetivosConcluidos.posicao}º</Text>
                    <Text style={styles.text}>{objetivosConcluidos.qtdObjetivosConcluidos}</Text>
                    <Text style={styles.text}>Objetivos concluídos</Text>
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
               return <Item objetivosConcluidos={item.objetivosConcluidos} curtidas={item.curtidas} segredos={item.segredos} notasMaximas={item.notasMaximas}/>
            }}
            keyExtractor={item => item.id}
            style={{width: "100%"}}
        />
    )
}

export default Ranking;