import React from 'react';
import Card from '../../components/ui/card.js';
import SubCard from '../../components/ui/sub-card.js';

import '../../custom.css';
import { useNavigate } from 'react-router-dom';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';
import BtnCadastrar from '../../components/btnForm/btnCadastrar.js';
import ImagemTopo from '../../components/topo-imagem.js';
import BtnRelatorio from '../../components/btnRelatorio.js';

function ListagemEmprestimo() {
    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/emprestimos`;

    async function deletar(id) {
        const ativo = false;
        let url = `${baseURL}/${id}`;
        await axios.patch(url, { ativo })
            .then(function (response) {
                mensagemSucesso(`Emprestimo deletado com sucesso!`);
                setDadosFiltrados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar Emprestimo!`);
            });
    };

    const [dados, setDados] = React.useState(null);
    const [dadosFiltrados, setDadosFiltrados] = React.useState(null);

    function procurar(filtro) {
        const resultado = dados.filter((dado) =>
            dado.idExemplares.toLowerCase().startsWith(filtro.toLowerCase())
        );

        setDadosFiltrados(resultado);
    }

    React.useEffect(() => {
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
            <ImagemTopo
                imagem="/background-gerencia.jpg"
                titulo="Listagem de Empréstimos"
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
                        <BtnCadastrar btnText={"Novo Empréstimo"} />
                        <BtnRelatorio tipo="emprestimo" />
                    </div>
                    <SubCard className="row">
                        <div className="row table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Exemplar</th>
                                        <th scope="col">Perfil</th>
                                        <th scope="col">Empréstimo</th>
                                        <th scope="col">ETA</th>
                                        <th scope="col">Devolução</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dadosFiltrados && dadosFiltrados.length > 0 ?
                                        dadosFiltrados.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.idExemplares}</td>
                                                <td>{item.idPerfis}</td>
                                                <td>{item.dtEmprestimo}</td>
                                                <td>{item.dtEta}</td>
                                                <td>{item.dtDevolucao}</td>
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
                </Card >
            </div >
        </div>
    );
}

export default ListagemEmprestimo;