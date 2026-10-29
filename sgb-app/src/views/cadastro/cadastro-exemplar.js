import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/cards/card.js';
import SubCard from '../../components/cards/sub-card.js';
import FormGroup from '../../components/form-group.js';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';
import ChecarAsterisco from '../../utills/checar-asterisco.js';

function CadastroExemplar() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/exemplares`;

    const [id, setId] = useState('');
    const [idLivros, setIdLivros] = useState('');
    const [identificacao, setIdentificacao] = useState('');
    const [status, setStatus] = useState('');


    const [dados, setDados] = React.useState([]);
    const [tentouSalvar, setTentouSalvar] = useState(false);

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
        setTentouSalvar(true);

        if (!idLivros || !identificacao || !status) {
            return
        }

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
                    navigate(`/exemplares`);
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
                    navigate(`/exemplares`);
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
            <Card title='Cadastro de Exemplar' subtitle="Campos com * são obrigatórios">
                <SubCard className='row'>
                    <div className='row col-12 p-4'>
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
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={idLivros} />
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
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={identificacao} />
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
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={status} />
                            </FormGroup>
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-end'>
                        <span className={`text-danger fs-7 ${tentouSalvar ? undefined : "invisible"}`}>Preencha todos os campos obrigatórios</span>
                        <Stack spacing={1} padding={1} direction='row'>
                            <button
                                onClick={inicializar}
                                type='button'
                                className='btn btn-outline-danger curvatura fw-semibold ls-wide'
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={salvar}
                                type='button'
                                className='btn btn-primary curvatura fw-semibold ls-wide px-3 py-2'
                            >
                                Salvar Parâmetro
                            </button>
                        </Stack>
                    </div>
                </SubCard>
            </Card>
        </div>
    );
}

export default CadastroExemplar;