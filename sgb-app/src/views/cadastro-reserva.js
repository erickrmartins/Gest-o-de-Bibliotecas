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
    { nome: "Reservas", url: "/listagem-reservas" },
    { nome: "Nova Reserva" }
]

function CadastroReserva() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/reservas`;

    const [id, setId] = useState('');
    const [dtReserva, setDtReserva] = useState('');
    const [idLivros, setIdLivros] = useState('');
    const [idPerfis, setIdPerfis] = useState('');


    const [dados, setDados] = React.useState([]);

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

    async function salvar() {
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
                    navigate(`/listagem-reservas`);
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
                    navigate(`/listagem-reservas`);
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
            <Card title='Cadastro de Reserva'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='Perfil: *' htmlFor='selectPerfil'>
                                <select
                                    className='form-select'
                                    id='selectPerfil'
                                    name='idPerfis'
                                    value={idPerfis}
                                    onChange={(e) => setIdPerfis(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosPerfis.map((dado) => (
                                        <option key={dado.id} value={dado.nome}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
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
                            </FormGroup>
                            <FormGroup label='Livro: *' htmlFor='selectLivro'>
                                <select
                                    className='form-select'
                                    id='selectLivro'
                                    name='idLivros'
                                    value={idLivros}
                                    onChange={(e) => setIdLivros(e.target.value)}
                                >
                                    <option key='0' value='Disponível'>
                                        {' '}
                                    </option>
                                    {dadosLivros.map((dado) => (
                                        <option key={dado.id} value={dado.nome}>
                                            {dado.nome}
                                        </option>
                                    ))}
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

export default CadastroReserva;