import React from 'react';
import {View, TouchableOpacity, Text} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Login from './src/pages/Login/login';
import Home from "./src/pages/Home/home";
import Objetivos from "./src/pages//Objetivos/objetivos";
import Timeline from "./src/pages/Timeline/timeline";
import Turmas from "./src/pages/Turmas/turmas";
import Alunos from "./src/pages/Alunos/alunos";
import DetalhesTurma from "./src/pages/DetalhesTurma/detalhesTurma";
import Camera from "./src/pages/Camera/camera";
import ObjetivosTurma from "./src/pages/ObjetivosTurma/objetivosTurma";
import DetalhesAluno from './src/pages/DetalhesAluno/detalhesAluno';

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1}}
          >
            <View style={{ backgroundColor: !isFocused ? '#EEE' : label==="Início" ? "#00D65F" : label==="Objetivos" ? "#FF271C" : label==="Postagens" ? "#F9E800" : label==="Turmas" ? "#00C2EE" : label==="Alunos" ? "#00D65F" : "", padding: 2}}>
              <Icon name={label==="Início"?"home": label==="Objetivos"?"book":label==="Postagens"?"comment":label==="Turmas"?"graduation-cap":label==="Alunos"?"users":""} size={18} style={{fontWeight: isFocused ? "bold" : "normal", textAlign: "center", color: isFocused? "white" : "black"}}/>
              <Text style={{fontWeight: isFocused ? "bold" : "normal", textAlign: "center", color: isFocused? "white" : "black"}}>
                {label}
              </Text>
            </View>
            
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Autenticado = () => {
  return (
    <Tab.Navigator initialRouteName="Home" lazy={true} tabBar={props=><MyTabBar {...props}/>}>
      <Tab.Screen name="Início" component={Home}/>
      <Tab.Screen name="Objetivos" component={Objetivos}/>
      <Tab.Screen name="Postagens" component={Timeline}/>
      <Tab.Screen name="Turmas" component={Turmas}/>
      <Tab.Screen name="Alunos" component={Alunos}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Autenticado" component={Autenticado}/>
          <Stack.Screen name="DetalhesTurma" component={DetalhesTurma}/>
          <Stack.Screen name="ObjetivosTurma" component={ObjetivosTurma}/>
          <Stack.Screen name="Camera" component={Camera}/>
          <Stack.Screen name="DetalhesAluno" component={DetalhesAluno}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}