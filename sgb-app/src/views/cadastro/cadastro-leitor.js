import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/cards/card.js';
import SubCard from '../../components/cards/sub-card.js';

import FormGroup from '../../components/form-group.js';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';


function CadastroLeitor() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/leitores`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [dtNasc, setDtNasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [dados, setDados] = React.useState([]);
    const [tentouSalvar, setTentouSalvar] = useState(false);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setDtNasc('');
            setCpf('');
            setTelefone('');
            setEmail('');
            setSenha('');
        } else {
            setId(dados.id);
            setNome(dados.nome);
            setDtNasc(dados.dtNasc);
            setCpf(dados.cpf);
            setTelefone(dados.telefone);
            setEmail(dados.email);
            setSenha(dados.senha);
        }
    }

    async function salvar() {
        let data = {
            id,
            nome,
            dtNasc,
            cpf,
            telefone,
            email,
            senha
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Leitor ${nome} cadastrado com sucesso!`);
                    navigate(`/leitores`);
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
                    mensagemSucesso(`Leitor ${nome} alterado com sucesso!`);
                    navigate(`/leitores`);
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
        setDtNasc(dados.dtNasc);
        setCpf(dados.cpf);
        setTelefone(dados.telefone);
        setEmail(dados.email);
        setSenha(dados.senha);
    }


    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Leitor' subtitle="Campos com * são obrigatórios">
                <SubCard className='row'>
                    <div className='row col-12 p-4'>
                        <div className='bs-component col-lg-8'>
                            <FormGroup label='Nome: *' htmlFor='inputNome'>
                                <input
                                    type='text'
                                    id='inputNome'
                                    value={nome}
                                    className='form-control'
                                    name='nome'
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-4'>
                            <FormGroup label='CPF: *' htmlFor='inputCpf'>
                                <input
                                    type='text'
                                    id='inputCpf'
                                    maxLength='11'
                                    value={cpf}
                                    className='form-control'
                                    name='cpf'
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6'>
                            <FormGroup label='Data de Nascimento: *' htmlFor='inputDtNasc'>
                                <input
                                    type='date'
                                    id='inputDtNasc'
                                    value={dtNasc}
                                    className='form-control'
                                    name='dtNasc'
                                    onChange={(e) => setDtNasc(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6'>
                            <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                                <input
                                    type='text'
                                    id='inputTelefone'
                                    value={telefone}
                                    className='form-control'
                                    name='telefone'
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6'>
                            <FormGroup label='E-mail: *' htmlFor='inputEmail'>
                                <input
                                    type='email'
                                    id='inputEmail'
                                    value={email}
                                    className='form-control'
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6'>
                            <FormGroup label='Senha: *' htmlFor='inputSenha'>
                                <input
                                    type='password'
                                    id='inputSenha'
                                    value={senha}
                                    className='form-control'
                                    name='senha'
                                    onChange={(e) => setSenha(e.target.value)}
                                />
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

export default CadastroLeitor;
