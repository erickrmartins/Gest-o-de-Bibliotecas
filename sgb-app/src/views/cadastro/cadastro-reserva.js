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

function CadastroReserva() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/reservas`;

    const [dados, setDados] = React.useState([]);

    const [id, setId] = useState('');
    const [dtReserva, setDtReserva] = useState('');
    const [idLivros, setIdLivros] = useState('');
    const [idPerfis, setIdPerfis] = useState('');

    const [tentouSalvar, setTentouSalvar] = useState(false);

    async function salvar() {
        setTentouSalvar(true);

        if (!dtReserva || !idLivros || !idPerfis) {
            return;
        }

        let data = {
            id,
            dtReserva,
            idLivros,
            idPerfis
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Reserva ${id} cadastrada com sucesso!`);
                    navigate(`/reservas`);
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
                    mensagemSucesso(`Reserva ${id} alterada com sucesso!`);
                    navigate(`/reservas`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        }
    }


    function inicializar() {
        if (idParam == null) {
            setId('');
            setDtReserva('');
            setIdLivros('');
            setIdPerfis('');
        } else {
            setId(dados.id);
            setDtReserva(dados.dtReserva);
            setIdLivros(dados.idLivros);
            setIdPerfis(dados.idPerfis);
        }
    }

    async function buscar() {
        await axios.get(`${baseURL}/${idParam}`).then((response) => {
            setDados(response.data);
        });
        setId(dados.id);
        setDtReserva(dados.dtReserva);
        setIdLivros(dados.idLivros);
        setIdPerfis(dados.idPerfis);
    }

    const [dadosPerfis, setDadosPerfis] = React.useState([]);
    const [dadosLivros, setDadosLivros] = React.useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/leitores`).then((response) => {
            setDadosPerfis(response.data);
        });
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
    if (!dadosPerfis) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Reserva' subtitle="Campos com * são obrigatórios">
                <SubCard className='row'>
                    <div className='col-lg-12 p-4'>
                        <div className='bs-component mb-4'>
                            <FormGroup className="fs-2" label='Perfil: *' htmlFor='selectPerfil'>
                                <select
                                    className='form-select'
                                    id='selectPerfil'
                                    name='idPerfis'
                                    value={idPerfis}
                                    onChange={(e) => setIdPerfis(e.target.value)}
                                >
                                    <option key='0' value=''>
                                        {' '}
                                    </option>
                                    {dadosPerfis.map((dado) => (
                                        <option key={dado.id} value={dado.nome}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={idPerfis}/>
                            </FormGroup>
                            <FormGroup label='Data: *' htmlFor='inputDtReserva'>
                                <input
                                    type='date'
                                    id='inputDtReserva'
                                    value={dtReserva}
                                    className='form-control'
                                    name='dtReserva'
                                    onChange={(e) => setDtReserva(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={dtReserva}/>
                            </FormGroup>
                            <FormGroup label='Livro: *' htmlFor='selectLivro'>
                                <select
                                    className='form-select'
                                    id='selectLivro'
                                    name='idLivros'
                                    value={idLivros}
                                    onChange={(e) => setIdLivros(e.target.value)}
                                >
                                    <option key='0' value=''>
                                        {' '}
                                    </option>
                                    {dadosLivros.map((dado) => (
                                        <option key={dado.id} value={dado.nome}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={idLivros}/>
                            </FormGroup>
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
                                    Salvar Reserva
                                </button>
                            </Stack>
                        </div>
                    </div>
                </SubCard>
            </Card>
        </div>
    );
}

export default CadastroReserva;