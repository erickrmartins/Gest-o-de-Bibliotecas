import React from 'react';
import Card from '../../components/cards/card.js';
import SubCard from '../../components/cards/sub-card.js';

import '../../custom.css';
import { useNavigate } from 'react-router-dom';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import True from '@mui/icons-material/CheckCircleOutlineOutlined';
import False from '@mui/icons-material/RadioButtonUncheckedOutlined';

import axios from 'axios';
import { BASE_URL } from '../../config/axios.js';
import BtnCadastrar from '../../components/btnForm/btnCadastrar.js';

function ListagemFuncionario() {
    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/funcionarios`;

    async function deletar(id) {
        let data = JSON.stringify({ id });
        let url = `${baseURL}/${id}`;
        console.log(url);
        await axios
            .delete(url, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Funcionário deletado com sucesso!`);
                setDadosFiltrados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar Funcionário!`);
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
                setDadosFiltrados(response.data);
            })
            .catch((error) => {
                mensagemErro('Erro ao se conectar ao servidor!');
            });
    }, []);

    return (
        <div className="container">
            <Card title={`Listagem de Funcionários`} subtitle={`${dadosFiltrados ? dadosFiltrados.length : ""} resultados encontrados`}>
                <div className='d-flex mb-4'>
                    <form className='d-flex w-25' role='search'>
                        <input
                            className='form-control me-2 curvatura shadow-sm'
                            type='search'
                            placeholder='Busque por um dado'
                            aria-label='Procurar'
                            onChange={(e) => procurar(e.target.value)}
                        />
                    </form>
                    <BtnCadastrar btnText={"Novo Funcionário"} />
                </div>
                <SubCard className="row">

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Senha</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Nascimento</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Administrador?</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosFiltrados && dadosFiltrados.length > 0 ?
                                dadosFiltrados.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nome}</td>
                                        <td>{item.email}</td>
                                        <td>{item.senha}</td>
                                        <td>{item.telefone}</td>
                                        <td>{item.dtNasc}</td>
                                        <td>{item.cpf}</td>
                                        <td>{item.isAdmin ? <True /> : <False />}</td>
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
                </SubCard>
            </Card>
        </div>
    );
}

export default ListagemFuncionario;