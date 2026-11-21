import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/ui/card.js';
import SubCard from '../../components/ui/sub-card.js';
import FormGroup from '../../components/ui/form-group.js';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import axios from 'axios';
import { BASE_URL, urlLivros } from '../../config/axios.js';
import ChecarAsterisco from '../../utils/checar-asterisco.js';
import ImagemTopo from '../../components/topo-imagem.js';

import { handleEmprestimo } from '../../utils/emprestimo/handleEmprestimo.js';
import { handleDevolucao } from '../../utils/reserva/handleDevolucao.js';

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
    const [status, setStatus] = useState('');

    const [statusExemplar, setStatusExemplar] = useState('');
    const [descricao, setDescricao] = useState('');

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
            setStatus('');
            setStatusExemplar('');
            setDescricao('');
        } else {
            setId(dados.id);
            setIdExemplares(dados.idExemplares);
            setIdPerfis(dados.idPerfis);
            setDtEmprestimo(dados.dtEmprestimo);
            setDtEta(dados.dtEta);
            setDtDevolucao(dados.dtDevolucao);
            setStatus(dados.status);
            setStatusExemplar()
        }
    }

    async function salvar() {
        setTentouSalvar(true);

        if (!idParam) {
            if (!idExemplares || !idPerfis || !dtEmprestimo) {
                return;
            }
        } else {
            if (!idExemplares || !idPerfis || !dtEmprestimo || !dtDevolucao || !status) {
                return;
            }
        }

        const filtrado = idPerfis;

        let data = {
            id,
            idExemplares,
            idPerfis: filtrado,
            dtEmprestimo,
            dtEta,
            dtDevolucao: null,
            renovado: false,
            status: "Ativo",
            ativo: true
        };
        data = JSON.stringify(data);

        const perfil = dadosPerfis.find((dado) => dado.nome === idPerfis);
        const exemplar = dadosExemplares.find((dado) => dado.identificacao === idExemplares);
        const livro = await axios.get(urlLivros).then((response) => {
            const livros = response.data;
            return livros.find((livro) => livro.nome === exemplar.idLivros);
        })

        if (idParam == null) {
            const valido = await handleEmprestimo(perfil, exemplar);

            if (valido) {
                await axios.post(baseURL, data)
                    .then(function (response) {
                        mensagemSucesso(`Emprestimo ${id} cadastrada com sucesso!`);
                        navigate(`/emprestimos`);
                    })
                    .catch(function (error) {
                        mensagemErro(error.response.data);
                    });
                await axios.patch(`${BASE_URL}/exemplares/${exemplar.id}`, { status: "Emprestado" });
            }
        } else {
            await axios.patch(`${baseURL}/${idParam}`, { idPerfis, idExemplares, dtEmprestimo, dtDevolucao, status })
                .then(function (response) {
                    mensagemSucesso(`Emprestimo ${id} alterada com sucesso!`);
                    navigate(`/emprestimos`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
            await axios.patch(`${BASE_URL}/exemplares/${exemplar.id}`, { status: statusExemplar, descricao });

            await handleDevolucao(livro, exemplar);
        }
    }

    async function buscar() {
        await axios.get(`${baseURL}/${idParam}`).then((response) => {
            setDados(response.data);
        });

        const exemplar = dadosExemplares.find((dado) => dado.identificacao === idExemplares);

        await axios.get(`${BASE_URL}/exemplares/${exemplar.id}`).then((response) => {
            setStatusExemplar(response.data.status);
            setDescricao(response.data.descricao);
        })

        setId(dados.id);
        setIdExemplares(dados.idExemplares);
        setIdPerfis(dados.idPerfis);
        setDtEmprestimo(dados.dtEmprestimo);
        setDtEta(dados.dtEta);
        setDtDevolucao(dados.dtDevolucao);
        setStatus(dados.status);
    }

    const [dadosPerfis, setDadosPerfis] = React.useState([]);
    const [dadosExemplares, setDadosExemplares] = React.useState([]);
    const [prazoEmprestimo, setPrazoEmprestimos] = React.useState('')

    useEffect(() => {
        async function carregarDadosIniciais() {
            try {
                const resLeitores = await axios.get(`${BASE_URL}/leitores`);
                setDadosPerfis(resLeitores.data);

                const resExemplares = await axios.get(`${BASE_URL}/exemplares`);
                setDadosExemplares(resExemplares.data);

                const resParametros = await axios.get(`${BASE_URL}/parametros`);
                if (resParametros.data.length > 0) {
                    setPrazoEmprestimos(resParametros.data[0].prazoEmprestimo);
                }
            } catch (error) {
                mensagemErro("Erro ao carregar dados iniciais do sistema.");
            }
        }

        carregarDadosIniciais();
    }, []);

    useEffect(() => {
        if (idParam) {
            async function buscarEmprestimo() {
                try {
                    const response = await axios.get(`${baseURL}/${idParam}`);
                    const emp = response.data;
                    setDados(emp);

                    setId(emp.id);
                    setIdExemplares(emp.idExemplares);
                    setIdPerfis(emp.idPerfis);
                    setDtEmprestimo(emp.dtEmprestimo);
                    setDtEta(emp.dtEta);
                    setDtDevolucao(emp.dtDevolucao || '');
                    setStatus(emp.status);

                    const exemplarEncontrado = dadosExemplares.find((d) => d.identificacao === emp.idExemplares);
                    if (exemplarEncontrado) {
                        const resEx = await axios.get(`${BASE_URL}/exemplares/${exemplarEncontrado.id}`);
                        setStatusExemplar(resEx.data.status || '');
                        setDescricao(resEx.data.descricao || '');
                    }
                } catch (error) {
                    mensagemErro("Erro ao buscar dados do empréstimo.");
                }
            }
            if (dadosExemplares.length > 0) {
                buscarEmprestimo();
            }
        }
    }, [idParam, dadosExemplares]);

    if (!dados) return null;
    if (!dadosPerfis) return null;

    return (
        <div>
            <ImagemTopo
                imagem="/background-gerencia.jpg"
                titulo="Cadastro de Empréstimo"
                subtitulo="Campos com * são obrigatórios."
            />
            <div className="container">
                <Card>
                    <SubCard className='row'>
                        <div className='row col-12 p-4'>
                            <h5>Dados do Exemplar </h5>
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
                            <div className='bs-component col-lg-6'>
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
                                            data.setDate(data.getDate() + Number(prazoEmprestimo))
                                            setDtEta(data.toLocaleDateString('en-CA'));
                                        }
                                        }
                                    />
                                    <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={dtEmprestimo} />
                                </FormGroup>
                            </div>
                            <div className='bs-component col-lg-6'>
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
                            {!idParam ? null : (
                                <>
                                    <hr />
                                    <h5>Dados da Devolução </h5>
                                    <div className='bs-component col-lg-6'>
                                        <FormGroup label='Data de Devolução: ' htmlFor='inputDtDevolucao'>
                                            <input
                                                type='date'
                                                id='inputDtDevolucao'
                                                value={dtDevolucao}
                                                className='form-control'
                                                name='dtDevolucao'
                                                onChange={(e) => {
                                                    setDtDevolucao(e.target.value);
                                                    setStatus('Devolvido');
                                                    setStatusExemplar('Disponível');
                                                }}
                                            />
                                            <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={dtDevolucao} />
                                        </FormGroup>
                                    </div>
                                    <div className='bs-component col-lg-6'>
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
                                    <hr />
                                    <h5>Dados do Exemplar </h5>
                                    <div className='bs-component col-lg-4'>
                                        <FormGroup label='Status: *' htmlFor='selectStatusExemplar'>
                                            <select
                                                className='form-select'
                                                id='selectStatusExemplar'
                                                name='statusExemplar'
                                                value={statusExemplar}
                                                onChange={(e) => setStatusExemplar(e.target.value)}
                                            >
                                                <option value='Emprestado'>
                                                    Emprestado
                                                </option>
                                                <option value='Disponível'>
                                                    Disponível
                                                </option>
                                                <option value='Em manutenção'>
                                                    Em manutenção
                                                </option>
                                                <option value='Perdido'>
                                                    Perdido
                                                </option>
                                            </select>
                                            <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={statusExemplar} />
                                        </FormGroup>
                                    </div>
                                    {statusExemplar === 'Perdido' || statusExemplar === 'Em manutenção' ? (
                                        <div className='bs-component col-lg-8'>
                                            <FormGroup label='Descrição: *' htmlFor='selectDescricao'>
                                                <textarea
                                                    rows="5"
                                                    id='inputDescricao'
                                                    value={descricao}
                                                    className='form-control'
                                                    name='descrica'
                                                    onChange={(e) => setDescricao(e.target.value)}
                                                />
                                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={descricao} />
                                            </FormGroup>
                                        </div>
                                    ) : null}

                                </>
                            )}
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
        </div>
    );
}

export default CadastroEmprestimo;