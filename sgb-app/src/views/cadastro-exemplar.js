import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/cards';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

import Breadcrumbs from '../components/breadcrumbs';
const breadcrumbs = [
    { nome: "Exemplares", url: "/listagem-exemplares" },
    { nome: "Novo Exemplar" }
]

function CadastroExemplar() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/exemplares`;

    const [id, setId] = useState('');
    const [idLivros, setIdLivros] = useState('');
    const [identificacao, setIdentificacao] = useState('');
    const [status, setStatus] = useState('');


    const [dados, setDados] = React.useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setIdLivros('');
            setIdentificacao('');
            setStatus('');
        } else {
            setId(dados.id);
            setIdLivros(dados.idLivros);
            setIdentificacao(dados.identificacao);
            setStatus(dados.status);
        }
    }

    async function salvar() {
        let data = {
            id,
            idLivros,
            identificacao,
            status
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Exemplar ${identificacao} cadastrada com sucesso!`);
                    navigate(`/listagem-exemplares`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        } else {
            await axios
                .put(`${baseURL}/${idParam}`, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Exemplar ${identificacao} alterada com sucesso!`);
                    navigate(`/listagem-exemplares`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        }
    }

    async function buscar() {
        await axios.get(`${baseURL}/${idParam}`).then((response) => {
            setDados(response.data);
        });
        setId(dados.id);
        setIdLivros(dados.idLivros);
        setIdentificacao(dados.identificacao);
        setStatus(dados.status);
    }

    const [dadosLivros, setDadosLivros] = React.useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/livros`).then((response) => {
            setDadosLivros(response.data);
        });
    }, []);

    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [id]);

    if (!dados) return null;
    if (!dadosLivros) return null;

    return (
        <div className='container'>
            <Breadcrumbs crumbs={breadcrumbs} />
            <Card title='Cadastro de exemplar'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='Livro: *' htmlFor='selectLivro'>
                                <select
                                    className='form-select'
                                    id='selectLivro'
                                    name='idLivros'
                                    value={idLivros}
                                    onChange={(e) => setIdLivros(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosLivros.map((dado) => (
                                        <option key={dado.id} value={dado.nome}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup label='Identificação: *' htmlFor='inputIdentificacao'>
                                <input
                                    type='text'
                                    id='inputIdentificacao'
                                    value={identificacao}
                                    className='form-control'
                                    name='identificacao'
                                    onChange={(e) => setIdentificacao(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Status: *' htmlFor='selectStatus'>
                                <select
                                    className='form-select'
                                    id='selectStatus'
                                    name='status'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option key='0' value='Disponível'>
                                        Disponível
                                    </option>
                                    <option key='1' value='Emprestado'>
                                        Emprestado
                                    </option>
                                    <option key='0' value='Em Manutenção'>
                                        Em Manutenção
                                    </option>
                                    <option key='0' value='Perdido'>
                                        Perdido
                                    </option>
                                </select>
                            </FormGroup>
                            <Stack spacing={1} padding={1} direction='row'>
                                <button
                                    onClick={salvar}
                                    type='button'
                                    className='btn btn-success'
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={inicializar}
                                    type='button'
                                    className='btn btn-danger'
                                >
                                    Cancelar
                                </button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default CadastroExemplar;