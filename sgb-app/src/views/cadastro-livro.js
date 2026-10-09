import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/cards';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroLivro() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/livros`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [isbn, setIsbn] = useState('');
    const [dtPublicacao, setDtPublicacao] = useState('');
    const [numPaginas, setNumPaginas] = useState('');
    const [idEditora, setIdEditora] = useState('');
    const [idAutor, setIdAutor] = useState('');
    const [idGenero, setIdGenero] = useState('');
    const [sinopse, setSinopse] = useState('');

    const [dados, setDados] = React.useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
            setNome('');
            setIsbn('');
            setDtPublicacao('');
            setNumPaginas('');
            setIdEditora('');
            setIdAutor('');
            setIdGenero('');
            setSinopse('');
        } else {
            setId(dados.id);
            setNome(dados.nome);
            setIsbn(dados.isbn);
            setDtPublicacao(dados.dtPublicacao);
            setNumPaginas(dados.numPaginas);
            setIdEditora(dados.idEditora);
            setIdAutor(dados.idAutor);
            setIdGenero(dados.idGenero);
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
            idEditora,
            idAutor,
            idGenero,
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
                    navigate(`/listagem-livros`);
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
                    navigate(`/listagem-livros`);
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
        setIsbn(dados.ISBN);
        setDtPublicacao(dados.dtPublicacao);
        setNumPaginas(dados.numPaginas);
        setIdEditora(dados.idEditoras);
        setIdAutor(dados.idAutores);
        setIdGenero(dados.idGeneros);
        setSinopse(dados.sinopsis);
    }


    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de livro'>
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
                            <FormGroup label='Data de Publicação: *' htmlFor='inputDtPublicacao'>
                                <input
                                    type='text'
                                    id='inputDtPublicacao'
                                    value={dtPublicacao}
                                    className='form-control'
                                    name='dtPublicacao'
                                    onChange={(e) => setDtPublicacao(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Número de Páginas: *' htmlFor='inputNumPaginas'>
                                <input
                                    type='text'
                                    id='inputNumPaginas'
                                    value={numPaginas}
                                    className='form-control'
                                    name='numPaginas'
                                    onChange={(e) => setNumPaginas(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Sinopse: *' htmlFor='inputSinopse'>
                                <input
                                    type='text'
                                    id='inputSinopse'
                                    value={sinopse}
                                    className='form-control'
                                    name='sinopse'
                                    onChange={(e) => setSinopse(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='ID do Autor: *' htmlFor='inputIdAutor'>
                                <input
                                    type='text'
                                    id='inputIdAutor'
                                    value={idAutor}
                                    className='form-control'
                                    name='idAutor'
                                    onChange={(e) => setIdAutor(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='ID do Gênero: *' htmlFor='inputIdGenero'>
                                <input
                                    type='text'
                                    id='inputIdGenero'
                                    value={idGenero}
                                    className='form-control'
                                    name='idGenero'
                                    onChange={(e) => setIdGenero(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='ID da Editora: *' htmlFor='inputIdEditora'>
                                <input
                                    type='text'
                                    id='inputIdEditora'
                                    value={idEditora}
                                    className='form-control'
                                    name='idEditora'
                                    onChange={(e) => setIdEditora(e.target.value)}
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

export default CadastroLivro;