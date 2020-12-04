import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Titulo = ({titulo, subtitulo}) => {
    return (
        <View style={{marginVertical: 50}}>
            <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 30}}>{titulo}</Text>
            {subtitulo&&<Text style={{fontWeight: "bold", textAlign: "center", fontSize: 15}}>{subtitulo}</Text>}
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <View style={[styles.circulo, styles.green, {margin: 10}]}></View>
                <View style={[styles.quadrado, styles.red, {margin: 10}]}></View>
                <View style={[styles.triangulo, {margin: 10}]}></View>
                <View style={[styles.trianguloEsquerda, {margin: 10}]}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circulo: {
        height: 10,
        width: 10,
        borderRadius: 10
    },
    quadrado: {
        height: 10,
        width: 10
    },
    triangulo: {
        borderLeftWidth: 5,
        borderLeftColor: "transparent",
        borderRightWidth: 5,
        borderRightColor: "transparent",
        borderBottomWidth: 10,
        borderBottomColor: "#F9E800"
    },
    trianguloEsquerda: {
        borderRightWidth: 10,
        borderRightColor: "#00C2EE",
        borderTopWidth: 5,
        borderTopColor: "transparent",
        borderBottomWidth: 5,
        borderBottomColor: "transparent"
    },
    green: {
        backgroundColor: "#00D65F"
    },
    red: {
        backgroundColor: "#FF271C"
    }
});

export default Titulo;