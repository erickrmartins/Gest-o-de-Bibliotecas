import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/cards';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroExemplar() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/exemplares`;

    const [id, setId] = useState('');
    const [idLivro, setIdLivro] = useState('');
    const [identificacao, setIdentificacao] = useState('');
    const [status, setStatus] = useState('');


    const [dados, setDados] = React.useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setIdLivro('');
            setIdentificacao('');
            setStatus('');
        } else {
            setId(dados.id);
            setIdLivro(dados.idLivro);
            setIdentificacao(dados.identificacao);
            setStatus(dados.status);
        }
    }

    async function salvar() {
        let data = {
            id,
            idLivro,
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
        setIdLivro(dados.idLivro);
        setIdentificacao(dados.identificacao);
        setStatus(dados.status);
    }


    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de exemplar'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='ID do Livro: *' htmlFor='inputIdLivro'>
                                <input
                                    type='text'
                                    id='inputIdLivro'
                                    value={idLivro}
                                    className='form-control'
                                    name='idLivro'
                                    onChange={(e) => setIdLivro(e.target.value)}
                                />
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
                            <FormGroup label='Status: *' htmlFor='inputStatus'>
                                <input
                                    type='text'
                                    id='inputStatus'
                                    value={status}
                                    className='form-control'
                                    name='status'
                                    onChange={(e) => setStatus(e.target.value)}
                                />
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