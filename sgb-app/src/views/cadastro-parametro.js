import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/cards';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

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

    async function salvar() {
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
                navigate(`/listagem-parametros`);
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
            <Card title='Cadastro de Parametro'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='Prazo Emprestimo: *' htmlFor='inputPrazoEmprestimo'>
                                <input
                                    type='number'
                                    id='inputPrazoEmprestimo'
                                    value={prazoEmprestimo}
                                    className='form-control'
                                    name='prazoEmprestimo'
                                    onChange={(e) => setPrazoEmprestimo(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Limite de Empréstimo por Usuário: *' htmlFor='inputLimiteEmprestimo'>
                                <input
                                    type='text'
                                    id='inputLimiteEmprestimo'
                                    value={limiteEmprestimo}
                                    name='limiteEmprestimo'
                                    className='form-control'
                                    onChange={(e) => setLimiteEmprestimo(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Permitir Renovação: *' htmlFor='selectPermitirRenovacao'>
                                <select
                                    className='form-select'
                                    id='inputPermitirRenovacao'
                                    value={permitirRenovacao}
                                    name='permitirRenovacao'
                                    onChange={(e) => setPermitirRenovacao(e.target.value)}
                                >
                                    <option value={true}>
                                        Sim
                                    </option>
                                    <option value={false}>
                                        Não
                                    </option>
                                </select>
                            </FormGroup>
                            <FormGroup label='Permitir Renovação com Fila: *' htmlFor='selectRenovacaoComFila'>
                                <select
                                    className='form-select'
                                    id='inputRenovacaoComFila'
                                    value={renovacaoComFila}
                                    name='renovacaoComFila'
                                    onChange={(e) => setRenovacaoComFila(e.target.value)}
                                >
                                    <option value={true}>
                                        Sim
                                    </option>
                                    <option value={false}>
                                        Não
                                    </option>
                                </select>
                            </FormGroup>
                            <FormGroup label='Quantidade de Dias em Renovações: *' htmlFor='inputDiasRenovacao'>
                                <input
                                    type='text'
                                    id='inputDiasRenovacao'
                                    value={diasRenovacao}
                                    className='form-control'
                                    name='diasRenovacao'
                                    onChange={(e) => setDiasRenovacao(e.target.value)}
                                />

                            </FormGroup>
                            <FormGroup label='Prazo para Retirada de Reservas: *' htmlFor='inputPrazoRetirada'>
                                <input
                                    type='text'
                                    id='inputPrazoRetirada'
                                    value={prazoRetirada}
                                    className='form-control'
                                    name='prazoRetirada'
                                    onChange={(e) => setPrazoRetirada(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Quantidade de Livros Recomendados: *' htmlFor='inputRecomendados'>
                                <input
                                    type='text'
                                    id='inputRecomendados'
                                    value={recomendados}
                                    className='form-control'
                                    name='recomendados'
                                    onChange={(e) => setRecomendados(e.target.value)}
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

export default CadastroParametro;
