import React, { useEffect, useState } from 'react';

import Card from '../../components/ui/Card.js';
import SubCard from '../../components/ui/SubCard.js';

import '../../custom.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { mensagemSucesso, mensagemErro } from '../../components/Toastr.js';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import True from '@mui/icons-material/CheckCircleOutlineOutlined';
import False from '@mui/icons-material/RadioButtonUncheckedOutlined';
import StarIcon from '@mui/icons-material/StarBorder';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';
import BtnCadastrar from '../../components/buttons/BtnCadastrar.js';
import PageHeader from '../../components/layout/PageHeader.js';

function ListagemLivro() {
    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/livros`;

    async function deletar(id) {
        const ativo = false;
        let url = `${baseURL}/${id}`;
        await axios.patch(url, { ativo })
            .then(function (response) {
                mensagemSucesso(`Livro deletado com sucesso!`);
                setDadosFiltrados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar Livro!`);
            });
    };

    const [dados, setDados] = useState(null);
    const [dadosFiltrados, setDadosFiltrados] = useState(null);

    function procurar(filtro) {
        const resultado = dados.filter((dado) =>
            dado.nome.toLowerCase().startsWith(filtro.toLowerCase())
        );

        setDadosFiltrados(resultado);
    }

    useEffect(() => {
        axios.get(baseURL)
            .then((response) => {
                const filtrar = response.data.filter((dado) => dado.ativo === true);

                setDados(filtrar);
                setDadosFiltrados(filtrar);
            })
            .catch((error) => {
                mensagemErro('Erro ao se conectar ao servidor!');
            });
    }, []);

    return (
        <div>
            <PageHeader
                imagem="/background-gerencia.jpg"
                titulo="Listagem de Livros"
                subtitulo={`${dadosFiltrados ? dadosFiltrados.length : ""} resultados encontrados`}
            />
            <div className="container">
                <Card>
                    <div className='row gy-2 mb-4'>
                        <form className='col-lg-4' role='search'>
                            <input
                                className='form-control me-2 curvatura shadow-sm'
                                type='search'
                                placeholder='Busque por um dado'
                                aria-label='Procurar'
                                onChange={(e) => procurar(e.target.value)}
                            />
                        </form>
                        <BtnCadastrar btnText={"Novo Livro"} />
                        <div className='col-lg-2 col-6 ms-lg-auto'>
                            <Link
                                className='w-100 h-100 btn btn-outline d-flex justify-content-center align-items-center gap-2'
                                to="/recomendados"
                            > <StarIcon />
                                <span className='d-none d-lg-inline'>Recomendado</span></Link>
                        </div>
                    </div>
                    <SubCard>
                        <div className="row table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Autor</th>
                                        <th scope="col">Editora</th>
                                        <th scope="col">ISBN</th>
                                        <th scope="col">Genero</th>
                                        <th scope="col">Ano</th>
                                        <th scope="col">Pág.</th>
                                        <th scope="col">Rec.</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dadosFiltrados && dadosFiltrados.length > 0 ?
                                        dadosFiltrados.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.nome}</td>
                                                <td>{item.idAutores.length > 1 ? `${item.idAutores[0]} + ${item.idAutores.length - 1}` : item.idAutores}</td>
                                                <td>{item.idEditoras}</td>
                                                <td>{item.isbn}</td>
                                                <td>{item.idGeneros}</td>
                                                <td>{item.dtPublicacao}</td>
                                                <td>{item.numPaginas}</td>
                                                <td>{item.recomendado ? <True /> : <False />}</td>
                                                <td>
                                                    <Stack spacing={1} padding={0} direction='row'>
                                                        <IconButton
                                                            aria-label='edit'
                                                            onClick={() => navigate(`cadastrar/${item.id}`)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label='delete'
                                                            onClick={() => deletar(item.id)}
                                                        >
                                                            <DeleteIcon
                                                                style={
                                                                    { fill: "var(--bs-danger)" }}
                                                            />
                                                        </IconButton>
                                                    </Stack>
                                                </td>
                                            </tr>
                                        )) :
                                        (
                                            <tr>
                                                <td colSpan='9'>
                                                    Nenhum dado foi encontrado.
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </SubCard>
                </Card>
            </div>
        </div>
    );
}

export default ListagemLivro;