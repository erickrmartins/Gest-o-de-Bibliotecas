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

function ListagemParametro() {
    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/parametros`;

    const cadastrar = () => {
        navigate(`/cadastro-parametros`);
    };

    const editar = (id) => {
        navigate(`/cadastro-parametros/${id}`);
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
                mensagemSucesso(`Parâmetro deletado com sucesso!`);
                setDados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar Parâmetro!`);
            });
    };

    const [dados, setDados] = React.useState(null);

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
            <Card title={`Listagem de Parâmetros`}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Prazo Empréstimo</th>
                                        <th scope="col">Limite Empréstimo</th>
                                        <th scope="col">Permitir Renovação</th>
                                        <th scope="col">Renovação com Fila</th>
                                        <th scope="col">Dias Renovação</th>
                                        <th scope="col">Prazo Retirada</th>
                                        <th scope="col">Recomendados</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dados && dados.map((item) => (
                                        <tr >
                                            <td>{item.prazoEmprestimo}</td>
                                            <td>{item.limiteEmprestimo}</td>
                                            <td>{item.permitirRenovacao ? <True/> : <False/>}</td>
                                            <td>{item.renovacaoComFila ? <True/> : <False/>}</td>
                                            <td>{item.diasRenovacao}</td>
                                            <td>{item.prazoRetirada}</td>
                                            <td>{item.recomendados}</td>
                                            <td>
                                                <Stack spacing={1} padding={0} direction='row'>
                                                    <IconButton
                                                        aria-label='edit'
                                                        onClick={() => editar(item.id)}
                                                    >
                                                        <EditIcon />
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

export default ListagemParametro;