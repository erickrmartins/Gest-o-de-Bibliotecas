import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/cards/card.js';
import SubCard from '../../components/cards/sub-card.js';

import FormGroup from '../../components/form-group.js';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';

function CadastroLivro() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/livros`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [isbn, setIsbn] = useState('');
    const [dtPublicacao, setDtPublicacao] = useState('');
    const [numPaginas, setNumPaginas] = useState('');
    const [idEditoras, setIdEditora] = useState('');
    const [idAutores, setIdAutores] = React.useState([]);
    const [idAutor, setIdAutor] = useState('');
    const [idGeneros, setIdGenero] = useState('');
    const [sinopse, setSinopse] = useState('');

    const [dados, setDados] = React.useState([]);
    const [tentouSalvar, setTentouSalvar] = useState(false);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setIsbn('');
            setDtPublicacao('');
            setNumPaginas('');
            setIdEditora('');
            setIdAutores([]);
            setIdGenero('');
            setSinopse('');
        } else {
            setId(dados.id);
            setNome(dados.nome);
            setIsbn(dados.isbn);
            setDtPublicacao(dados.dtPublicacao);
            setNumPaginas(dados.numPaginas);
            setIdEditora(dados.idEditoras);
            setIdAutores(dados.idAutores);
            setIdGenero(dados.idGeneros);
            setSinopse(dados.sinopse);
        }
    }

    async function salvar() {
        let data = {
            id,
            nome,
            isbn,
            dtPublicacao,
            numPaginas,
            idEditoras,
            idAutores,
            idGeneros,
            sinopse
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`livro ${nome} cadastrada com sucesso!`);
                    navigate(`/livros`);
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
                    mensagemSucesso(`livro ${nome} alterada com sucesso!`);
                    navigate(`/livros`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        }
    }

    async function buscar() {
        await axios.get(`${baseURL}/${idParam}`).then((response) => {
            const livro = response.data;

            setDados(livro);
            setId(livro.id);
            setNome(livro.nome);
            setIsbn(livro.isbn);
            setDtPublicacao(livro.dtPublicacao);
            setNumPaginas(livro.numPaginas);
            setIdEditora(livro.idEditoras);
            setIdAutores(livro.idAutores ?? []);
            setIdGenero(livro.idGeneros);
            setSinopse(livro.sinopsis);
        });
    }

    const [dadosAutores, setDadosAutores] = React.useState([]);
    const [dadosEditoras, setDadosEditoras] = React.useState([]);
    const [dadosGeneros, setDadosGeneros] = React.useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/autores`).then((response) => {
            setDadosAutores(response.data);
        });
        axios.get(`${BASE_URL}/editoras`).then((response) => {
            setDadosEditoras(response.data);
        });
        axios.get(`${BASE_URL}/generos`).then((response) => {
            setDadosGeneros(response.data);
        });
    }, []);

    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Livro' subtitle="Campos com * são obrigatórios">
                <SubCard className='row'>
                    <div className='row col-12 p-4'>
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
                        </div>
                        <div className='bs-component col-6'>
                            <FormGroup label='ISNB: *' htmlFor='inputISBN'>
                                <input
                                    type='text'
                                    id='inputISBN'
                                    value={isbn}
                                    className='form-control'
                                    name='isbn'
                                    onChange={(e) => setIsbn(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-6'>
                            <FormGroup label='Editora: *' htmlFor='inputIdEditora'>
                                <select
                                    className='form-select'
                                    id='selectIdEditora'
                                    name='idEditora'
                                    value={idEditoras}
                                    onChange={(e) => setIdEditora(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosEditoras.map((dado) => (
                                        <option key={dado.id} value={dado.nome}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </div>
                        <div className='bs-component col-4'>
                            <FormGroup label='Ano: *' htmlFor='inputDtPublicacao'>
                                <input
                                    type='text'
                                    id='inputDtPublicacao'
                                    value={dtPublicacao}
                                    className='form-control'
                                    name='dtPublicacao'
                                    onChange={(e) => setDtPublicacao(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-4'>
                            <FormGroup label='Páginas: *' htmlFor='inputNumPaginas'>
                                <input
                                    type='text'
                                    id='inputNumPaginas'
                                    value={numPaginas}
                                    className='form-control'
                                    name='numPaginas'
                                    onChange={(e) => setNumPaginas(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className='bs-component col-4'>
                            <FormGroup label='Gênero: *' htmlFor='inputIdGenero'>
                                <select
                                    className='form-select'
                                    id='inputIdGenero'
                                    name='idGenero'
                                    value={idGeneros}
                                    onChange={(e) => setIdGenero(e.target.value)}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosGeneros.map((dado) => (
                                        <option key={dado.id} value={dado.nome}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </div>
                        <div className='bs-component col-12'>
                            <FormGroup label='Autor: *' htmlFor='selectIdAutor'>
                                <select
                                    className='form-select'
                                    id='selectIdAutor'
                                    name='idLivros'
                                    value={idAutor}
                                    onChange={(e) => {
                                        setIdAutor(e.target.value);

                                        if (!idAutores.includes(e.target.value)) {
                                            setIdAutores((prev) => [...prev, e.target.value]);
                                        }
                                    }}
                                >
                                    <option key='0' value='0'>
                                        {' '}
                                    </option>
                                    {dadosAutores.map((dado) => (
                                        <option key={dado.id} value={dado.nome}>
                                            {dado.nome}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <div className='d-flex align-items-center gap-3'>
                                <label>Autores Cadastrados: </label>
                                {idAutores.map((autor) => (
                                    <span className='px-2 py-1 border curvatura autorSelec'
                                        onClick={() => setIdAutores((prev) => prev.filter((autorAtual) => autorAtual !== autor))}
                                    >
                                        {autor}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className='bs-component mt-2'>
                            <FormGroup label='Sinopse: *' htmlFor='inputSinopse'>
                                <textarea
                                    rows="5"
                                    id='inputSinopse'
                                    value={sinopse}
                                    className='form-control'
                                    name='sinopse'
                                    onChange={(e) => setSinopse(e.target.value)}
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

export default CadastroLivro;