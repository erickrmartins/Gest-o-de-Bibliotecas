import React, { useEffect, useState } from "react";

import Card from '../../components/cards/card.js';
import DashboardCard from "../../components/dashboardCard/dashboardCard.js";

import PersonOutlined from '@mui/icons-material/PersonOutlined';
import BusinessOutlined from '@mui/icons-material/BusinessOutlined';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import AssignmentOutlined from '@mui/icons-material/AssignmentOutlined';
import GroupOutlined from '@mui/icons-material/GroupOutlined';
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import TuneOutlined from '@mui/icons-material/TuneOutlined';

import axios from "axios";
import { BASE_URL } from "../../config/axios.js";

const items = [
    { id: 1, imagem: <MenuBookOutlined fontSize="medium" />, titulo: "Livros", descricao: "títulos no acervo", url: "livros" },
    { id: 2, imagem: <Inventory2Outlined fontSize="medium" />, titulo: "Exemplares", descricao: "adicionados a coleção", url: "exemplares" },
    { id: 3, imagem: <PersonOutlined fontSize="medium" />, titulo: "Autores", descricao: "autores cadastrados", url: "autores" },
    { id: 4, imagem: <BusinessOutlined fontSize="medium" />, titulo: "Editoras", descricao: "editoras cadastradas", url: "editoras" },
    { id: 5, imagem: <BookmarkBorderOutlined fontSize="medium" />, titulo: "Reservas", descricao: "na fila de espera", url: "reservas" },
    { id: 6, imagem: <AssignmentOutlined fontSize="medium" />, titulo: "Empréstimos", descricao: "ativos atualmente", url: "emprestimos" },
    { id: 7, imagem: <GroupOutlined fontSize="medium" />, titulo: "Leitores", descricao: "leitores cadastrados", url: "leitores" },
    { id: 8, imagem: <BadgeOutlined fontSize="medium" />, titulo: "Funcionários", descricao: "funcionários cadastrados", url: "funcionarios" },
    { id: 9, imagem: <TuneOutlined fontSize="medium" />, titulo: "Parâmetros", descricao: "parâmetros do sistema", url: "parametros" },
];

function Gerenciar() {

    const [quantidades, setQuantidades] = useState({});

    useEffect(() => {
        items.forEach((item) => {
            axios.get(`${BASE_URL}/${item.url}`)
                .then((response) => {
                    setQuantidades((prev) => ({
                        ...prev,
                        [item.id]: response.data.length
                    }))
                });
        })
    }, []);

    return (
        <div className="container">
            <Card title="Gerenciar" subtitle="Selecione uma opção para obter mais informações.">
                <div className="row g-3">
                    {items.map((item) => (
                        <div key={item.id} className="col-12 col-sm-12 col-md-6 col-lg-4">
                            <DashboardCard
                                id={item.id}
                                imagem={item.imagem}
                                titulo={item.titulo}
                                qtd={item.url === "parametros" ? "Os" : quantidades[item.id] !== undefined ? quantidades[item.id] : ""}
                                descricao={item.descricao}
                                btnUrl={`/${item.url}`}
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default Gerenciar;