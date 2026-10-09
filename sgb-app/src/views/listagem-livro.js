import React from 'react';
import Card from '../components/cards';
import '../custom.css';
import { useNavigate } from 'react-router-dom';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import True from '@mui/icons-material/CheckCircleOutlineOutlined';
import False from '@mui/icons-material/RadioButtonUncheckedOutlined';

import axios from 'axios';
import { BASE_URL } from '../config/axios.js';

function ListagemLivro() {
    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/livros`;

    const cadastrar = () => {
        navigate(`/cadastro-livros`);
    };

    const editar = (id) => {
        navigate(`/cadastro-livros/${id}`);
    };

    async function deletar(id) {
        let data = JSON.stringify({ id });
        let url = `${baseURL}/${id}`;
        console.log(url);
        await axios
            .delete(url, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Livro deletado com sucesso!`);
                setDados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar Livro!`);
            });
    };

    const [dados, setDados] = React.useState(null);
    const [campos, setCampos] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL)
            .then((response) => {
                setDados(response.data);
            })
            .catch((error) => {
                mensagemErro('Erro ao se conectar ao servidor!');
            });
    }, []);

    return (
        <div className="container">
            <Card title={`Listagem de Livros`}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => cadastrar()}
                            >
                                Cadastrar Livro
                            </button>

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">ISBN</th>
                                        <th scope="col">Ano</th>
                                        <th scope="col">Genero</th>
                                        <th scope="col">Páginas</th>
                                        <th scope="col">Editora</th>
                                        <th scope="col">Autor</th>
                                        <th scope="col">Sinopse</th>
                                        <th scope="col">Recomendado</th>
                                        <th scope="col">AÇÕES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dados && dados.map((item) => (
                                        <tr >
                                            <td>{item.nome}</td>
                                            <td>{item.ISBN}</td>
                                            <td>{item.dtPublicacao}</td>
                                            <td>{item.idGeneros}</td>
                                            <td>{item.numPaginas}</td>
                                            <td>{item.idEditoras}</td>
                                            <td>{item.idAutores}</td>
                                            <td>{item.sinopsis}</td>
                                            <td>{item.recomendado ? <True /> : <False />}</td>
                                            <td>
                                                <Stack spacing={1} padding={0} direction='row'>
                                                    <IconButton
                                                        aria-label='edit'
                                                        onClick={() => editar(item.id)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label='delete'
                                                        onClick={() => deletar(item.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Stack>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ListagemLivro;