import React, { useEffect, useState } from "react";
import {StyleSheet, TextInput, View, TouchableOpacity, Text, FlatList, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

var jwtDecode = require('jwt-decode');

import {url} from "../../utils/constants";

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconPreenchido from 'react-native-vector-icons/FontAwesome';

import Cabecalho from "../../components/cabecalho/cabecalho";
import Titulo from "../../components/titulo/titulo";

import { ScrollView } from "react-native-gesture-handler";

//ImagePicker
import * as ImagePicker from 'expo-image-picker';

const Timeline = ({navigation, route}) => {
    const Item = ({nomeUsuario, tipo, urlImagem, texto, qtdCurtidas, dataPostagem, souAutor, id, curtiu}) => {
        
        return (
            <View style={{width: "100%", padding: 10, borderWidth: 1, borderColor: "#CCC", marginVertical: 10, borderRadius: 10}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    {souAutor===false&&<Text style={{fontWeight: "bold", fontSize: 16}}>({tipo}) - {nomeUsuario}</Text>}
                    {souAutor===true&&<Text style={{fontWeight: "bold", fontSize: 16, color: "#00C2EE"}}>({tipo}) - Eu</Text>}
                    <View style={{flexDirection: "row"}}>
                        {souAutor===true&&<><TouchableOpacity style={{marginRight: 15}} onPress={()=>editar(id, texto, urlImagem)}><Icon name="pencil-alt" size={20} color="#00D65F"/></TouchableOpacity><TouchableOpacity onPress={()=>deletar(id)}><Icon name="trash-alt" size={20} color="#FF271C"/></TouchableOpacity></>}
                    </View>
                </View>
                <View style={{marginHorizontal: 0.5, borderWidth: 1, borderColor: "#CCC", borderRadius: 10, marginVertical: 10}}>
                    {(urlImagem!=""&&urlImagem!=null)&&<Image
                        source={{uri:urlImagem}}
                        style={{width: "100%", height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                        resizeMode="cover"
                    />}
                    {(texto!==""&&texto!==null)&&<Text style={{padding: 10}}>{texto}</Text>}
                </View>
                <View style={{paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {curtiu===false&&<TouchableOpacity onPress={() => curtir(id, meuId)}><Icon name="heart" size={25} color="#FF271C"/></TouchableOpacity>}
                        {curtiu&&<TouchableOpacity onPress={() => descurtir(id)}><IconPreenchido name="heart" size={25} color="#FF271C"/></TouchableOpacity>}
                        <Text style={{marginLeft: 10}}>{qtdCurtidas}</Text>
                    </View>
                    <View>
                        <Text style={{color: "#666", textAlign: "center"}}>{dataPostagem.getDate()}/{dataPostagem.getMonth()+1}/{dataPostagem.getFullYear()}</Text>
                        <Text style={{color: "#666", textAlign: "center"}}>{dataPostagem.getHours()+3}:{dataPostagem.getMinutes()}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const curtir = async (idDica, idUsuario) => {
        const response = await fetch(`${url}/curtida`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                idDica: idDica,
                idUsuario: idUsuario
            })
        })

        pegarPosts()
    }

    const descurtir = async (id) => {
        const responsePost = await fetch(`${url}/dica/buscar/id/${id}`);
        const dataPost = await responsePost.json();

        let idCurtida = dataPost.curtidas.filter(curtida=>curtida.idUsuario===meuId)[0].id;

        const response = await fetch(`${url}/curtida/${idCurtida}`, {
            method: "DELETE"
        })

        pegarPosts();
    }

    const deletar = async (id) => {
        const response = await fetch(`${url}/dica/${id}`, {
            method: "DELETE"
        });
        pegarPosts();
    }

    const editar = (id, texto, urlImagem) => {
        setId(id);
        setTexto(texto);
        setUrlImagem(urlImagem);
        setClicouParaEditar(true);
    }
    
    let rota = route.params!==undefined?route.params.urlImagemCamera:"";

    const [posts, setPosts] = useState([]);
    const [meuId, setMeuId] = useState("");
    const [texto, setTexto] = useState("");
    const [urlImagem, setUrlImagem] = useState("");
    const [id, setId] = useState("");

    const [postou, setPostou] = useState(false);

    const [selecionouImagem, setSelecionouImagem] = useState(false);

    const [clicouParaEditar, setClicouParaEditar] = useState(false);

    useEffect(() => {
        if(postou===false&&selecionouImagem===false&&clicouParaEditar===false)
            setUrlImagem(rota)
    })

    useEffect(() => {
        pegarPosts();
        pegarMeuId();
    }, []);

    const pegarPosts = async () => {
        try {
            const response = await fetch(`${url}/dica`);
            const data = await response.json();

            let posts = data.data;

            function compare(a,b) {
                return a.dataPostagem < b.dataPostagem;
            }

            posts.map(post=> {
                post.dataPostagem = new Date(post.dataPostagem);
            })

            posts.sort(compare);

            setPosts(posts);

            limparCampos();
        } 
        catch (error) {
            console.log(error);
        }
    }

    const pegarMeuId = async () => {
        try {
            let token = await AsyncStorage.getItem("@jwt");
            setMeuId(jwtDecode(token).id);
        } 
        catch (error) {
            console.log(error);
        }
    }

    const tirarFoto = () => {
        setClicouParaEditar(false);
        setPostou(false);
        setSelecionouImagem(false);
        navigation.navigate("Camera");
    }

    const selecionarFoto = () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Desculpe! O aplicativo precisa ter permissão para acessar a galeria para realizar esta tarefa! :/');
                }
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
          
            if (!result.cancelled) {
                let formData = new FormData();

                const fileURL = result.uri;
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
                })
    
                const data = await response.json();

                setSelecionouImagem(true);
                setClicouParaEditar(false);
    
                setUrlImagem(data.url);
            }
        })();
    }

    const postar = async () => {
        try {
            let metodo = id===""?"POST":"PUT"
            let local = id===""?`${url}/dica`:`${url}/dica/${id}`

            const response = await fetch(local, {
                method: metodo,
                body: JSON.stringify({
                    texto: texto,
                    urlImagem: urlImagem,
                    idUsuario: meuId
                }),
                headers: {
                    "content-type": "application/json"
                }
            });
            setPostou(true);
            pegarPosts();
        } 
        catch (error) {
            console.log(error);
        }
    }

    const limparCampos = () => {
        setTexto("");
        setUrlImagem("");
        setClicouParaEditar(false);
    }

    const renderItem = ({item}) => {
        let curtiu=false;
        item.curtidas.map(curtida => {
            if(curtida.idUsuario===meuId)
                curtiu=true;
        })
        return <Item nomeUsuario={item.usuario.nome} tipo={item.usuario.alunosTurmas.length<1?"Professor":"Aluno"} urlImagem={item.urlImagem} texto={item.texto} qtdCurtidas={item.curtidas.length} dataPostagem={item.dataPostagem} souAutor={item.usuario.id===meuId?true:false} id={item.id} curtiu={curtiu}/>
    }

    return (
        <>
            <Cabecalho navigation={navigation}/>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <View style={styles.container}>
                        <Titulo titulo="Postagens"/>
                        <TextInput
                            placeholder="Qual sua dica para hoje?"
                            style={styles.input}
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={text=>setTexto(text)}
                            value={texto}
                        />
                        <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginVertical: 25}}>
                            <TouchableOpacity onPress={tirarFoto}>
                                <Icon
                                    name="camera"
                                    size={22.5}
                                    color="#555"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={selecionarFoto}>
                                <Icon
                                    name="images"
                                    size={22.5}
                                    color="#555"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={postar}>
                                <Text style={{paddingVertical: 5, paddingHorizontal: 30, backgroundColor: "#0069D9", fontWeight: "500", color: "white", borderRadius: 5}}>ENVIAR</Text>
                            </TouchableOpacity>
                        </View>
                        {urlImagem!==""&&<View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}><Image source={{uri:urlImagem}} style={{height:100,width: 100, marginBottom: 12.5, borderRadius: 10}}/><Text>Imagem a ser enviada.</Text></View>}
                        <View style={{width: "100%", height: 1, backgroundColor: "#CCC"}}></View>
                        <FlatList
                            data={posts}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={{width: "100%"}}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 10,
        borderTopColor: "#00D65F",
        borderRightColor: "#FF271C",
        borderBottomColor: "#F9E800",
        borderLeftColor: "#00C2EE",
        padding: 10
    },
    container: {
        width: "90%"
    }
});

export default Timeline;