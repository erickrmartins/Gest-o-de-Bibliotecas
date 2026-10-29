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
    const [tentouSalvar, setTentouSalvar] = useState(false);

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
        setTentouSalvar(true);

        if(!idExemplares || !idPerfis || !dtEmprestimo || !dtEta || !dtDevolucao || !renovado || !status) {
            return;
        }

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
                    navigate(`/emprestimos`);
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
                    navigate(`/emprestimos`);
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
            <Card title='Cadastro de Emprestimo' subtitle="Campos com * são obrigatórios">
                <SubCard className='row'>
                    <div className='row col-12 p-4'>
                        <div className='bs-component col-lg-6 col-sm-12'>
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
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={idPerfis} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6 col-sm-12'>
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
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={idExemplares} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-4'>
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
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={dtEmprestimo} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-4'>
                            <FormGroup label='Data Estimada da Devolução: ' htmlFor='inputEta'>
                                <input
                                    type='date'
                                    id='inputEta'
                                    value={dtEta}
                                    className='form-control'
                                    name='dtEta'
                                    readOnly
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={dtEta} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-4'>
                            <FormGroup label='Data de Devolução: ' htmlFor='inputDtDevolucao'>
                                <input
                                    type='date'
                                    id='inputDtDevolucao'
                                    value={dtDevolucao}
                                    className='form-control'
                                    name='dtDevolucao'
                                    onChange={(e) => setDtDevolucao(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={dtDevolucao} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6 col-sm-12'>
                            <FormGroup label='Renovado: *' htmlFor='selectRenovado'>
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
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={renovado} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6 col-sm-12'>
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

export default CadastroEmprestimo;