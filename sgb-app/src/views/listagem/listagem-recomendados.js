import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/card.js';
import SubCard from '../../components/ui/sub-card.js';

import '../../custom.css';
import { useNavigate } from 'react-router-dom';

import { mensagemSucesso, mensagemErro, mensagemServidorFalhou } from '../../components/toastr.js';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL, urlLivros } from '../../config/axios.js';
import BtnCadastrar from '../../components/btnForm/btnCadastrar.js';
import ImagemTopo from '../../components/topo-imagem.js';

function ListagemRecomendados() {
    const navigate = useNavigate();
    const [livro, setLivro] = useState('');

    async function deletar(id) {
        const url = `${urlLivros}/${id}`;

        await axios.patch(url, { recomendado: false })
            .then((response) => {
                mensagemSucesso(`Recomendação retirada com sucesso!`);
                buscarDados();
            })
            .catch((error) => {
                mensagemServidorFalhou();
            });
    };

    async function recomendar() {
        const url = `${urlLivros}/${livro}`;

        await axios.patch(url, { recomendado: true })
            .then((response) => {
                mensagemSucesso(`Recomendação realizada com sucesso!`);
                buscarDados();
            })
            .catch((error) => {
                mensagemServidorFalhou();
            });
    }

    const [dados, setDados] = useState([]);
    const [dadosRecomendados, setDadosRecomendados] = useState([]);

    async function buscarDados() {
        await axios.get(urlLivros)
            .then((response) => {
                const filtrar = response.data.filter((dado) => dado.ativo && dado.recomendado);
                setDados(response.data)
                setDadosRecomendados(filtrar);
            })
            .catch((error) => {
                mensagemErro('Erro ao se conectar ao servidor!');
            });
    }

    useEffect(() => {
        buscarDados();
    }, []);

    return (
        <div>
            <ImagemTopo
                imagem="/background-gerencia.jpg"
                titulo="Listagem de Recomendados"
                subtitulo={`${dados ? dados.length : ""} resultados encontrados`}
            />
            <div className="container">
                <Card>
                    <div className='row gy-2 mb-4'>
                        <form className='col-lg-6' role='search'>
                            <select
                                className='form-select'
                                id='selectLivros'
                                value={livro}
                                name='livro'
                                onChange={(e) => setLivro(e.target.value)}
                            >
                                {dados.length > 0 ? dados.map((dado) => (
                                    <option key={dado.id} value={dado.id}>
                                        {dado.nome}
                                    </option>
                                )) : null}
                            </select>
                        </form>
                        <button className='btn btn-primary col-lg-2 col-6' onClick={() => recomendar()}>Recomendar</button>
                    </div>
                    <SubCard>
                        <div className="row table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">AÇÕES</th>
                                        <th scope="col">Nome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dadosRecomendados.length > 0 ?
                                        dadosRecomendados.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <IconButton
                                                        aria-label='delete'
                                                        onClick={() => deletar(item.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </td>
                                                <td className='w-100'>{item.nome}</td>
                                            </tr>
                                        )) :
                                        (
                                            <tr>
                                                <td colSpan='2'>
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
        </div >
    );
}

export default ListagemRecomendados;