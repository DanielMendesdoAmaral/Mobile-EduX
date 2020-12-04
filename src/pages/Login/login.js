import React, {useState} from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from "../../utils/constants";
import Logo from "../../../assets/logo.png";

const Login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const salvarToken = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } 
        catch (error) {
            console.log(error);
        }
    }

    const Entrar = () => {
        fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })
        .then(response => {
            if(response.ok) 
                return response.json();
            Alert.alert(
                "Erro!",
                "Email ou senha inválidos! :/"
            )
        })
        .then(data => {
            salvarToken(data.token);
            navigation.push("Autenticado");
        })
        .catch(err => console.log(err));
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={Logo}
            />
            
            <Text style={styles.loginText}>Faça login para prosseguir</Text>

            <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={text=>setEmail(text)} 
                placeholder="Digite seu email..."
            />

            <TextInput
                style={styles.input} 
                value={senha} 
                onChangeText={text=>setSenha(text)} 
                placeholder="Digite sua senha..."
                secureTextEntry={true}
           /> 
            
            <TouchableOpacity
                style={styles.button}
                onPress={Entrar}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Text 
                style={styles.linkText}
                onPress={() => Linking.openURL('http://google.com')}>
                Esqueceu sua senha?
            </Text>

        </View>
    )
}


const styles = StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input : {
        borderColor: "#DEDEDE",
        borderWidth: 1,
        borderRadius: 6,
        width: "90%",
        height: 40,
        marginTop: 10,
        padding: 10
    },
    button : {
        backgroundColor : '#0069D9',
        padding: 10,
        borderRadius: 6,
        width: "90%",
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText : {
        color: 'white'
    },
    loginText : {
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    },
    tinyLogo: {
        width: '45%',
        height: 100
    },
    linkText : {
        color: '#0069D9',
        marginTop: 10
    } 
  });

export default Login;