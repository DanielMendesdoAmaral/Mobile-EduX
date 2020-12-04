import React, {useState, useEffect} from "react";
import Cabecalho from "../../components/cabecalho/cabecalho";
import { Camera } from 'expo-camera';
import {View, TouchableOpacity, Text, StyleSheet, Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {url} from "../../utils/constants";

const CameraPage = ({navigation}) => {
    const [permissao, setPermissao] = useState(null);
    const [tipo, setTipo] = useState(Camera.Constants.Type.back);
    const [imagem, setImagem] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setPermissao(status === 'granted');
        })();
    }, []);

    const tirarFoto = async () => {
        let foto = await camera.takePictureAsync();
        setImagem(foto);
    }

    const postar = async () => {
        try {
            let formData = new FormData();
            const fileURL = imagem.uri;
            const fileName = fileURL.split("/").pop();
            const ext = fileURL.split(".").pop();

            formData.append("arquivo", {
                uri: fileURL,
                name: fileName,
                type: "image/"+ext
            });

            const response = await fetch(`${url}/upload`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            navigation.navigate("Postagens", {
                urlImagemCamera: data.url
            });
        } 
        catch (error) {
            console.log(error);
        }
    }

    let camera;

    return (
        <>
            <Cabecalho navigation={navigation} voltar="Postagens"/>
            {imagem && <><Image source={{uri: imagem.uri}} style={{flex: 1}}/>
                <View style={styles.containerBorders}>
                    <View style={[styles.border, styles.green]}></View>
                    <View style={[styles.border, styles.red]}></View>
                    <View style={[styles.border, styles.yellow]}></View>
                    <View style={[styles.border, styles.blue]}></View>
                </View>
                <View style={{flexDirection: "row", height: 75, backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center"}}>
                    <TouchableOpacity
                        onPress={() => {
                            setImagem(null)
                        }}>
                            <View style={{alignItems: "center"}}>
                                <Icon name="camera" size={30}/>
                                <Text style={{textAlign: "center"}}>Tirar outra</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => postar()}>
                        <View style={{alignItems: "center"}}>
                            <Icon name="share-alt" size={30}/><Text style={{textAlign: "center"}}>Enviar foto</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>}
            {imagem===null&&<View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={tipo}
                ref={ref=> {
                    camera=ref
                }}>
                    <View
                    style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    }}>
                    </View>
                </Camera>
                <View style={styles.containerBorders}>
                    <View style={[styles.border, styles.green]}></View>
                    <View style={[styles.border, styles.red]}></View>
                    <View style={[styles.border, styles.yellow]}></View>
                    <View style={[styles.border, styles.blue]}></View>
                </View>
                <View style={{flexDirection: "row", height: 75, backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center"}}>
                    <TouchableOpacity
                        onPress={() => {
                            setTipo(
                            tipo === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                        }}>
                            <View style={{alignItems: "center"}}>
                                <Icon name="undo-alt" size={30}/>
                                <Text style={{textAlign: "center"}}>Virar câmera</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => tirarFoto()}>
                        <View style={{alignItems: "center"}}>
                            <Icon name="dot-circle" size={35} color="#FF271C"/><Text style={{textAlign: "center"}}>Tirar foto</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
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

export default CameraPage;