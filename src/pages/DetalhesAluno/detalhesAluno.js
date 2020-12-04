import React from "react";

import Cabecalho from "../../components/cabecalho/cabecalho";
import Titulo from "../../components/titulo/titulo";
import Ranking from "../../components/ranking/ranking";

const DetalhesAluno = ({route, navigation}) => {
    return (
        <>
            <Cabecalho voltar="Alunos" navigation={navigation}/>
            <Titulo titulo={route.params.nome}/>
            <Ranking idUsuario={route.params.idAluno}/>
        </>
    )
}

export default DetalhesAluno;