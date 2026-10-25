import React from 'react';
import Card from '../components/cards';
import SubCard from '../components/sub-card.js';
import BtnNewRow from '../components/btnNewRow.js';
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

function ListagemAutor() {
    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/autores`;

    const cadastrar = () => {
        navigate(`/cadastro-autores`);
    };

    const editar = (id) => {
        navigate(`/cadastro-autores/${id}`);
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
                mensagemSucesso(`Autor deletado com sucesso!`);
                setDados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar Autor!`);
            });
    };

    const [dados, setDados] = React.useState(null);
    const [dadosFiltrados, setDadosFiltrados] = React.useState(null);

    function procurar(filtro) {
        const resultado = dados.filter((dado) =>
            dado.nome.toLowerCase().startsWith(filtro.toLowerCase())
        );

        setDadosFiltrados(resultado);
    }

    React.useEffect(() => {
        axios.get(baseURL)
            .then((response) => {
                setDados(response.data);
                setDadosFiltrados(response.data)
            })
            .catch((error) => {
                mensagemErro('Erro ao se conectar ao servidor!');
            });
    }, []);

    return (
        <div className="container">
            <Card title={`Listagem de Autores`} subtitle={`${dadosFiltrados ? dadosFiltrados.length : ""} resultados encontrados`}>
                <div className='d-flex mb-4 w-100'>
                    <div className='d-flex w-100'>
                        <form className='d-flex w-25' role='search'>
                            <input
                                className='form-control me-2 curvatura shadow-sm ps-4'
                                type='search'
                                placeholder='Busque por um dado'
                                aria-label='Procurar'
                                onChange={(e) => procurar(e.target.value)}
                            />
                        </form>
                        <BtnNewRow search={() => procurar()} btnText="Novo Autor" btnAoClicar={() => cadastrar()} />
                    </div>
                </div>
                <SubCard className="row">
                    <div className="col-lg-12">

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Citação</th>
                                    <th scope="col">Nacionalidade</th>
                                    <th scope="col">AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosFiltrados && dadosFiltrados.length > 0 ?
                                    dadosFiltrados.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.nome}</td>
                                            <td>{item.citacao}</td>
                                            <td>{item.nacionalidade}</td>
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
                                    )) :
                                    (
                                        <tr>
                                            <td>
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
    );
}

export default ListagemAutor;