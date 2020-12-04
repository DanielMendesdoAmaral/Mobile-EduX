import React, {useEffect, useState} from "react";
import {StyleSheet, View, ScrollView, Text} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

var jwtDecode = require('jwt-decode');

import Cabecalho from "../../components/cabecalho/cabecalho";
import Titulo from "../../components/titulo/titulo";

import Ranking from "../../components/ranking/ranking";

const Home = ({navigation}) => {
    const [meuId, setMeuId] = useState("");
    const [nome, setNome] = useState("");

    useEffect(() => {
        pegarMeuId();
    }, []);

    const pegarMeuId = async () => {
        let token = await AsyncStorage.getItem("@jwt");
        setMeuId(jwtDecode(token).id);
        setNome(jwtDecode(token).nameid);
    }

    return(
        <>
            <Cabecalho navigation={navigation}/>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <View style={styles.container}>
                        <Titulo titulo="Ranking Geral"/>
                        <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 50}}>
                            <View style={{width: "75%", backgroundColor: "#9100D6", flexDirection: "row", padding: 5, borderRadius: 50}}>
                                <Text style={{width: 50, height: 50, borderRadius: 50, backgroundColor: "gray", textAlignVertical: "center", textAlign: "center", fontWeight: "bold", color: "white", fontSize: 30}}>{nome.substring(0,1).toUpperCase()}</Text>
                                <Text style={{textAlign: "center", color: "white", fontWeight: "bold", fontSize: 25, textAlignVertical: "center", paddingLeft: 35}}>{nome}</Text>
                            </View>
                        </View>
                        <Ranking idUsuario={meuId}/>
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
})

export default Home;