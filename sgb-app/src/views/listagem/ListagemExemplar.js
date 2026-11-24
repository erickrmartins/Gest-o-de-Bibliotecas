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
import True from '@mui/icons-material/CheckCircleOutlineOutlined';
import False from '@mui/icons-material/RadioButtonUncheckedOutlined';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';
import BtnCadastrar from '../../components/buttons/BtnCadastrar.js';
import PageHeader from '../../components/layout/PageHeader.js';
import BtnRelatorio from '../../components/buttons/BtnRelatorio.js';

function ListagemExemplar() {
    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/exemplares`;

    async function deletar(id) {
        const ativo = false;
        let url = `${baseURL}/${id}`;
        await axios.patch(url, { ativo })
            .then(function (response) {
                mensagemSucesso(`Exemplar deletado com sucesso!`);
                setDadosFiltrados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar Exemplar!`);
            });
    };

    const [dados, setDados] = useState(null);
    const [dadosFiltrados, setDadosFiltrados] = useState(null);

    function procurar(filtro) {
        const resultado = dados.filter((dado) =>
            dado.identificacao.toLowerCase().includes(filtro.toLowerCase())
        );

        setDadosFiltrados(resultado);
    }

    useEffect(() => {
        axios.get(baseURL)
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
                titulo="Listagem de Exemplares"
                subtitulo={`${dadosFiltrados ? dadosFiltrados.length : ""} resultados encontrados`}
            />
            <div className="container">
                <Card>
                    <div className='row mb-4 gy-2'>
                        <form className='col-lg-4' role='search'>
                            <input
                                className='form-control me-2 curvatura shadow-sm'
                                type='search'
                                placeholder='Busque por um dado'
                                aria-label='Procurar'
                                onChange={(e) => procurar(e.target.value)}
                            />
                        </form>
                        <BtnCadastrar btnText={"Novo Exemplar"} />
                        <BtnRelatorio tipo="exemplar" />
                    </div>
                    <SubCard>
                        <div className="row table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Livro</th>
                                        <th scope="col">Identificação</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">AÇÕES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dadosFiltrados && dadosFiltrados.length > 0 ?
                                        dadosFiltrados.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.identificacao}</td>
                                                <td>{item.idLivros}</td>
                                                <td>{item.status}</td>
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

export default ListagemExemplar;