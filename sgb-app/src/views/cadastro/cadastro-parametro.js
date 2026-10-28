import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/cards/card.js';
import SubCard from '../../components/cards/sub-card.js';

import FormGroup from '../../components/form-group.js';
import ChecarAsterisco from '../../utills/checar-asterisco.js';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';

function CadastroParametro() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/parametros`;

    const [id, setId] = useState('');
    const [prazoEmprestimo, setPrazoEmprestimo] = useState('');
    const [limiteEmprestimo, setLimiteEmprestimo] = useState('');
    const [permitirRenovacao, setPermitirRenovacao] = useState('');
    const [renovacaoComFila, setRenovacaoComFila] = useState('');
    const [diasRenovacao, setDiasRenovacao] = useState('');
    const [prazoRetirada, setPrazoRetirada] = useState('');
    const [recomendados, setRecomendados] = useState('');

    const [dados, setDados] = React.useState([]);

    function inicializar() {
        setId(dados.id);
        setPrazoEmprestimo(dados.prazoEmprestimo);
        setLimiteEmprestimo(dados.limiteEmprestimo);
        setPermitirRenovacao(dados.permitirRenovacao);
        setRenovacaoComFila(dados.renovacaoComFila);
        setDiasRenovacao(dados.diasRenovacao);
        setPrazoRetirada(dados.prazoRetirada);
        setRecomendados(dados.recomendados);
    }

    const [tentouSalvar, setTentouSalvar] = useState(false);

    async function salvar() {
        setTentouSalvar(true);

        if (!prazoEmprestimo || !limiteEmprestimo || !permitirRenovacao || !renovacaoComFila || !diasRenovacao || !prazoRetirada || !recomendados) {
            return;
        }

        let data = {
            id,
            prazoEmprestimo,
            limiteEmprestimo,
            permitirRenovacao,
            renovacaoComFila,
            diasRenovacao,
            prazoRetirada,
            recomendados
        };
        data = JSON.stringify(data);

        await axios
            .put(`${baseURL}/${idParam}`, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Parametro alterado com sucesso!`);
                navigate(`/parametros`);
            })
            .catch(function (error) {
                mensagemErro(error.response.data);
            });

    }

    async function buscar() {
        await axios.get(`${baseURL}/${idParam}`).then((response) => {
            setDados(response.data);
        });
        setId(dados.id);
        setPrazoEmprestimo(dados.prazoEmprestimo);
        setLimiteEmprestimo(dados.limiteEmprestimo);
        setPermitirRenovacao(dados.permitirRenovacao);
        setRenovacaoComFila(dados.renovacaoComFila);
        setDiasRenovacao(dados.diasRenovacao);
        setPrazoRetirada(dados.prazoRetirada);
        setRecomendados(dados.recomendados);
    }


    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Parâmetros' subtitle="Campos com * são obrigatórios">
                <SubCard className='row p-5'>
                    <div className='row col-12 p-4'>
                        <div className='bs-component col-lg-6 col-sm-12'>
                            <FormGroup label='Prazo Emprestimo: *' htmlFor='inputPrazoEmprestimo'>
                                <input
                                    type='text'
                                    id='inputPrazoEmprestimo'
                                    value={prazoEmprestimo}
                                    className='form-control'
                                    name='prazoEmprestimo'
                                    onChange={(e) => setPrazoEmprestimo(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={prazoEmprestimo} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6 col-sm-12'>
                            <FormGroup label='Limite de Empréstimo por Usuário: *' htmlFor='inputLimiteEmprestimo'>
                                <input
                                    type='text'
                                    id='inputLimiteEmprestimo'
                                    value={limiteEmprestimo}
                                    name='limiteEmprestimo'
                                    className='form-control'
                                    onChange={(e) => setLimiteEmprestimo(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={limiteEmprestimo} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6 col-sm-12'>
                            <FormGroup label='Renovação: *' htmlFor='selectPermitirRenovacao'>
                                <select
                                    className='form-select'
                                    id='inputPermitirRenovacao'
                                    value={permitirRenovacao}
                                    name='permitirRenovacao'
                                    onChange={(e) => setPermitirRenovacao(e.target.value)}
                                >
                                    <option value={true}>
                                        Permitir
                                    </option>
                                    <option value={false}>
                                        Não Permitir
                                    </option>
                                </select>
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={permitirRenovacao} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6 col-sm-12'>
                            <FormGroup label='Renovação com Fila: *' htmlFor='selectRenovacaoComFila'>
                                <select
                                    className='form-select'
                                    id='inputRenovacaoComFila'
                                    value={renovacaoComFila}
                                    name='renovacaoComFila'
                                    onChange={(e) => setRenovacaoComFila(e.target.value)}
                                >
                                    <option value={true}>
                                        Permitir
                                    </option>
                                    <option value={false}>
                                        Não Permitir
                                    </option>
                                </select>
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={renovacaoComFila} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6 col-sm-12'>
                            <FormGroup label='Quantidade de Dias em Renovações: *' htmlFor='inputDiasRenovacao'>
                                <input
                                    type='text'
                                    id='inputDiasRenovacao'
                                    value={diasRenovacao}
                                    className='form-control'
                                    name='diasRenovacao'
                                    onChange={(e) => setDiasRenovacao(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={diasRenovacao} />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-lg-6 col-sm-12'>
                            <FormGroup label='Prazo para Retirada de Reservas: *' htmlFor='inputPrazoRetirada'>
                                <input
                                    type='text'
                                    id='inputPrazoRetirada'
                                    value={prazoRetirada}
                                    className='form-control'
                                    name='prazoRetirada'
                                    onChange={(e) => setPrazoRetirada(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={prazoRetirada} />
                            </FormGroup>
                        </div>
                        <FormGroup label='Quantidade de Livros Recomendados: *' htmlFor='inputRecomendados'>
                            <input
                                type='text'
                                id='inputRecomendados'
                                value={recomendados}
                                className='form-control'
                                name='recomendados'
                                onChange={(e) => setRecomendados(e.target.value)}
                            />
                            <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={recomendados} />
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
                                Salvar Parâmetro
                            </button>
                        </Stack>
                    </div>
                </SubCard>
            </Card>
        </div >
    );
}

export default CadastroParametro;
