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
    { nome: "Empréstimos", url: "/listagem-emprestimos" },
    { nome: "Novo Empréstimo" }
]

function CadastroEmprestimo() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/emprestimos`;

    const [id, setId] = useState('');
    const [idExemplares, setIdExemplares] = useState('');
    const [idPerfis, setIdPerfis] = useState('');
    const [dtEmprestimo, setDtEmprestimo] = useState('');
    const [dtEta, setDtEta] = useState('');
    const [dtDevolucao, setDtDevolucao] = useState('');
    const [renovado, setRenovado] = useState('');
    const [status, setStatus] = useState('');

    const [dados, setDados] = React.useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setIdExemplares('');
            setIdPerfis('');
            setDtEmprestimo('');
            setDtEta('');
            setDtDevolucao('');
            setRenovado('');
            setStatus('');
        } else {
            setId(dados.id);
            setIdExemplares(dados.idExemplares);
            setIdPerfis(dados.idPerfis);
            setDtEmprestimo(dados.dtEmprestimo);
            setDtEta(dados.dtEta);
            setDtDevolucao(dados.dtDevolucao);
            setRenovado(dados.renovado);
            setStatus(dados.status);
        }
    }

    async function salvar() {
        let data = {
            id,
            idExemplares,
            idPerfis,
            dtEmprestimo,
            dtEta,
            dtDevolucao,
            renovado,
            status
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Emprestimo ${id} cadastrada com sucesso!`);
                    navigate(`/listagem-emprestimos`);
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
                    mensagemSucesso(`Emprestimo ${id} alterada com sucesso!`);
                    navigate(`/listagem-emprestimos`);
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
        setIdExemplares(dados.idExemplares);
        setIdPerfis(dados.idPerfis);
        setDtEmprestimo(dados.dtEmprestimo);
        setDtEta(dados.dtEta);
        setDtDevolucao(dados.dtDevolucao);
        setRenovado(dados.renovado);
        setStatus(dados.status);
    }

    const [dadosPerfis, setDadosPerfis] = React.useState([]);
    const [dadosExemplares, setDadosExemplares] = React.useState([]);
    const [prazoEmprestimo, setPrazoEmprestimos] = React.useState('')

    useEffect(() => {
        axios.get(`${BASE_URL}/leitores`).then((response) => {
            setDadosPerfis(response.data);
        });
        axios.get(`${BASE_URL}/exemplares`).then((response) => {
            setDadosExemplares(response.data);
        });
        axios.get(`${BASE_URL}/parametros`).then((response) => {
            setPrazoEmprestimos(response.data[0].prazoEmprestimo)
        })
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
            <Breadcrumbs crumbs={breadcrumbs} />
            <Card title='Cadastro de Emprestimo'>
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
                            <FormGroup label='Exemplar: *' htmlFor='selectExemplar'>
                                <select
                                    className='form-select'
                                    id='selectExemplar'
                                    name='idExemplares'
                                    value={idExemplares}
                                    onChange={(e) => setIdExemplares(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosExemplares.map((dado) => (
                                        <option key={dado.id} value={dado.identificacao}>
                                            {dado.identificacao}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup label='Data do Empréstimo: *' htmlFor='inputDtEmprestimo'>
                                <input
                                    type='date'
                                    id='inputDtEmprestimo'
                                    value={dtEmprestimo}
                                    className='form-control'
                                    name='dtEmprestimo'
                                    onChange={(e) => {
                                        setDtEmprestimo(e.target.value)

                                        const data = new Date(e.target.value);
                                        data.setDate(data.getDate() + prazoEmprestimo)
                                        setDtEta(data.toLocaleDateString('en-CA'));
                                    }
                                    }
                                />
                            </FormGroup>
                            <FormGroup label='Data Estimada da Devolução: ' htmlFor='inputEta'>
                                <input
                                    type='date'
                                    id='inputEta'
                                    value={dtEta}
                                    className='form-control'
                                    name='dtEta'
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup label='Data de Devolução: ' htmlFor='inputDtDevolucao'>
                                <input
                                    type='date'
                                    id='inputDtDevolucao'
                                    value={dtDevolucao}
                                    className='form-control'
                                    name='dtDevolucao'
                                    onChange={(e) => setDtDevolucao(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Renovado: ' htmlFor='selectRenovado'>
                                <select
                                    className='form-select'
                                    id='selectRenovado'
                                    name='renovado'
                                    value={renovado}
                                    onChange={(e) => setRenovado(e.target.value)}
                                >
                                    <option value={true}>
                                        Não
                                    </option>
                                    <option value={false}>
                                        Sim
                                    </option>
                                </select>
                            </FormGroup>
                            <FormGroup label='Status: *' htmlFor='selectStatus'>
                                <select
                                    className='form-select'
                                    id='selectStatus'
                                    name='status'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value='Ativo'>
                                        Ativo
                                    </option>
                                    <option value='Devolvido'>
                                        Devolvido
                                    </option>
                                    <option value='Atrasado'>
                                        Atrasado
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

export default CadastroEmprestimo;