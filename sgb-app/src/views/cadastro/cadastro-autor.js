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

function CadastroAutor() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/autores`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [citacao, setCitacao] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');

    const [dados, setDados] = React.useState([]);

    const [tentouSalvar, setTentouSalvar] = useState(false);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setCitacao('');
            setNacionalidade('');
        } else {
            setId(dados.id);
            setNome(dados.nome);
            setCitacao(dados.citacao);
            setNacionalidade(dados.nacionalidade);
        }
    }

    async function salvar() {
        setTentouSalvar(true);

        if (!nome || !citacao || !nacionalidade) {
            return;
        }

        let data = {
            id,
            nome,
            citacao,
            nacionalidade,
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Autor ${nome} cadastrado com sucesso!`);
                    navigate(`/autores`);
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
                    mensagemSucesso(`Autor ${nome} alterado com sucesso!`);
                    navigate(`/autores`);
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
        setNome(dados.nome);
        setCitacao(dados.citacao);
        setNacionalidade(dados.nacionalidade);
    }


    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Autor' subtitle="Campos com * são obrigatórios">
                <SubCard className='row'>
                    <div className='row col-12 p-4'>
                        <div className='bs-component'>
                            <FormGroup label='Nome: *' htmlFor='inputNome'>
                                <input
                                    type='text'
                                    id='inputNome'
                                    value={nome}
                                    className='form-control'
                                    name='nome'
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={nome} />
                            </FormGroup>
                            <FormGroup label='Citação: *' htmlFor='inputCitacao'>
                                <input
                                    type='text'
                                    id='inputCitacao'
                                    value={citacao}
                                    className='form-control'
                                    name='citacao'
                                    onChange={(e) => setCitacao(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={citacao} />
                            </FormGroup>
                            <FormGroup label='Nacionalidade: *' htmlFor='inputNacionalidade'>
                                <input
                                    type='text'
                                    id='inputNacionalidade'
                                    value={nacionalidade}
                                    className='form-control'
                                    name='nacionalidade'
                                    onChange={(e) => setNacionalidade(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={nacionalidade} />
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

export default CadastroAutor;
