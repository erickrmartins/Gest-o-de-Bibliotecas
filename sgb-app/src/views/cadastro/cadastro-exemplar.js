import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/ui/card.js';
import SubCard from '../../components/ui/sub-card.js';
import FormGroup from '../../components/ui/form-group.js';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';
import ChecarAsterisco from '../../utils/checar-asterisco.js';
import ImagemTopo from '../../components/topo-imagem.js';

function CadastroExemplar() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/exemplares`;

    const [id, setId] = useState('');
    const [idLivros, setIdLivros] = useState('');
    const [identificacao, setIdentificacao] = useState('');
    const [status, setStatus] = useState('Disponível');


    const [dados, setDados] = React.useState([]);
    const [tentouSalvar, setTentouSalvar] = useState(false);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setIdLivros('');
            setIdentificacao('');
            setStatus('');
        } else {
            setId(dados.id);
            setIdLivros(dados.idLivros);
            setIdentificacao(dados.identificacao);
            setStatus(dados.status);
        }
    }

    async function salvar() {
        setTentouSalvar(true);

        if (!idLivros || !identificacao || !status) {
            return
        }

        let data = {
            id,
            idLivros,
            identificacao,
            status,
            ativo: true
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios.post(baseURL, data)
                .then(function (response) {
                    mensagemSucesso(`Exemplar ${identificacao} cadastrada com sucesso!`);
                    navigate(`/exemplares`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        } else {
            await axios.patch(`${baseURL}/${idParam}`, data)
                .then(function (response) {
                    mensagemSucesso(`Exemplar ${identificacao} alterada com sucesso!`);
                    navigate(`/exemplares`);
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
        setIdLivros(dados.idLivros);
        setIdentificacao(dados.identificacao);
        setStatus(dados.status);
    }

    const [dadosLivros, setDadosLivros] = React.useState([]);

    useEffect(() => {
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
    if (!dadosLivros) return null;

    return (
        <div>
            <ImagemTopo
                imagem="/background-gerencia.jpg"
                titulo="Cadastro de Exemplar"
                subtitulo="Campos com * são obrigatórios."
            />
            <div className="container">
                <Card>
                    <SubCard className='row'>
                        <div className='row col-12 p-4'>
                            <div className='bs-component'>
                                <FormGroup label='Livro: *' htmlFor='selectLivro'>
                                    <select
                                        className='form-select'
                                        id='selectLivro'
                                        name='idLivros'
                                        value={idLivros}
                                        onChange={(e) => setIdLivros(e.target.value)}
                                    >
                                        <option value='0'>
                                            {' '}
                                        </option>
                                        {dadosLivros.map((dado) => (
                                            <option key={dado.id} value={dado.nome}>
                                                {dado.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={idLivros} />
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
                                    <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={identificacao} />
                                </FormGroup>
                                <FormGroup label='Status: *' htmlFor='selectStatus'>
                                    <select
                                        className='form-select'
                                        id='selectStatus'
                                        name='status'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value='Disponível'>
                                            Disponível
                                        </option>
                                        <option value='Emprestado'>
                                            Emprestado
                                        </option>
                                        <option value='Em Manutenção'>
                                            Em Manutenção
                                        </option>
                                        <option value='Perdido'>
                                            Perdido
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
                                    Salvar
                                </button>
                            </Stack>
                        </div>
                    </SubCard>
                </Card>
            </div>
        </div>
    );
}

export default CadastroExemplar;