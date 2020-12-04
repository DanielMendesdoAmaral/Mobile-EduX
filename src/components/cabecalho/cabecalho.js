import React from "react";
import {StyleSheet, View, Image, TouchableOpacity, Alert} from "react-native";
import Logo from "../../../assets/logo.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome5';

const Cabecalho = ({navigation, voltar}) => {

    const logout = () => {
        Alert.alert(
            "Sair",
            "Quer mesmo sair? :(",
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "Sair",
                    onPress: () => {
                        AsyncStorage.removeItem("@jwt");
                        navigation.navigate("Login");
                    }
                }
            ]
        )
    }

    return (
        <>
            <View style={styles.cabecalho}>
                <View style={styles.container}>
                    {voltar&&<TouchableOpacity onPress={() => voltar==="Turmas"?navigation.navigate("Turmas"):voltar==="Postagens"?navigation.navigate("Postagens"):voltar==="Objetivos"?navigation.navigate("Objetivos"):voltar==="Alunos"?navigation.navigate("Alunos"):""}><Icon name="angle-left" size={35}/></TouchableOpacity>}
                    <Image
                        source={Logo}
                        style={styles.logo}
                    />
                    <TouchableOpacity onPress={logout}>
                        <Icon
                            name="sign-out-alt"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerBorders}>
                <View style={[styles.border, styles.green]}></View>
                <View style={[styles.border, styles.red]}></View>
                <View style={[styles.border, styles.yellow]}></View>
                <View style={[styles.border, styles.blue]}></View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cabecalho: {
        marginTop: 25,
        width: '100%',
        height: 60,
        alignItems: "center"
    },
    container: {
        width: "85%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    logo: {
        width: 100,
        height: "100%"
    },
    containerBorders: {
        flexDirection: "row"
    },
    border: {
        width: "25%",
        height: 3
    },
    green: {
        backgroundColor: "#00D65F"
    },
    red: {
        backgroundColor: "#FF271C"
    },
    yellow: {
        backgroundColor: "#F9E800"
    },
    blue: {
        backgroundColor: "#00C2EE"
    }
})

export default Cabecalho;