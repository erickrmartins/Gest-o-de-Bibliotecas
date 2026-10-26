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
    { nome: "Funcionários", url: "/listagem-funcionarios" },
    { nome: "Novo Funcionário" }
]

function CadastroFuncionario() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/funcionarios`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [dtNasc, setDtNasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [dados, setDados] = React.useState([]);

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
                    mensagemSucesso(`Funcionario ${nome} cadastrado com sucesso!`);
                    navigate(`/listagem-funcionarios`);
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
                    mensagemSucesso(`Funcionario ${nome} alterado com sucesso!`);
                    navigate(`/listagem-funcionarios`);
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
            <Breadcrumbs crumbs={breadcrumbs} />
            <Card title='Cadastro de Funcionario'>
                <div className='row'>
                    <div className='col-lg-12'>
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
                            </FormGroup>
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

export default CadastroFuncionario;
