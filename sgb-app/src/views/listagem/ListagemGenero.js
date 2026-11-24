import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.js';
import SubCard from '../../components/ui/SubCard.js';

import '../../custom.css';
import { useNavigate } from 'react-router-dom';

import { mensagemSucesso, mensagemErro } from '../../components/Toastr.js';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { urlGeneros } from '../../config/axios.js';
import BtnCadastrar from '../../components/buttons/BtnCadastrar.js';
import PageHeader from '../../components/layout/PageHeader.js';

function ListagemGenero() {
    const navigate = useNavigate();

    async function deletar(id) {
        let ativo = false;
        let url = `${urlGeneros}/${id}`;
        console.log(url);
        await axios.patch(url, { ativo })
            .then(function (response) {
                mensagemSucesso(`Gênero deletado com sucesso!`);
                setDadosFiltrados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar Gênero!`);
            });
    };

    const [dados, setDados] = useState(null);
    const [dadosFiltrados, setDadosFiltrados] = useState(null);

    function procurar(filtro) {
        const resultado = dados.filter((dado) =>
            dado.nome.toLowerCase().includes(filtro.toLowerCase())
        );

        setDadosFiltrados(resultado);
    }

    useEffect(() => {
        axios.get(urlGeneros)
            .then((response) => {
                const filtrar = response.data.filter((dado) => dado.ativo === true);

                setDados(filtrar);
                setDadosFiltrados(filtrar);
            })
            .catch((error) => {
                mensagemErro('Erro ao se conectar ao servidor!');
            });
    }, []);

    return (
        <div>
            <PageHeader
                imagem="/background-gerencia.jpg"
                titulo="Listagem de Generos"
                subtitulo={`${dadosFiltrados ? dadosFiltrados.length : ""} resultados encontrados`}
            />
            <div className="container">
                <Card>
                    <div className='row gy-2 mb-4'>
                        <form className='col-lg-4' role='search'>
                            <input
                                className='form-control me-2 curvatura shadow-sm ps-4'
                                type='search'
                                placeholder='Busque por um dado'
                                aria-label='Procurar'
                                onChange={(e) => procurar(e.target.value)}
                            />
                        </form>
                        <BtnCadastrar />
                    </div>
                    <SubCard className="row">
                        <div className="row table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Label</th>
                                        <th scope="col">AÇÕES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dadosFiltrados && dadosFiltrados.length > 0 ?
                                        dadosFiltrados.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.nome}</td>
                                                <td>{item.label}</td>
                                                <td>
                                                    <Stack spacing={1} padding={0} direction='row'>
                                                        <IconButton
                                                            aria-label='edit'
                                                            onClick={() => navigate(`cadastrar/${item.id}`)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label='delete'
                                                            onClick={() => deletar(item.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </td>
                                            </tr>
                                        )) :
                                        (
                                            <tr>
                                                <td>
                                                    Nenhum dado foi encontrado.
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </SubCard>
                </Card>
            </div>
        </div>
    );
}

export default ListagemGenero;