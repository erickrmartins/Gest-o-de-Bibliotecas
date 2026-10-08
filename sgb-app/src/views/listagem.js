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

function Listagem({ pagina }) {
    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/${pagina}`;

    const cadastrar = () => {
        navigate(`/cadastro-${pagina}`);
    };

    const editar = (id) => {
        navigate(`/cadastro-${pagina}/${id}`);
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
                mensagemSucesso(`${pagina} deletado com sucesso!`);
                setDados(dados.filter((item) => item.id !== id));
            })
            .catch(function (error) {
                mensagemErro(`Erro ao deletar ${pagina}!`);
            });
    };

    const [dados, setDados] = React.useState(null);
    const [campos, setCampos] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL)
            .then((response) => {
                if (response.data.length === 0) {
                    mensagemErro(`Nenhum ${pagina} encontrado!`);
                }
                setDados(response.data);
                setCampos(Object.keys(response.data[0]));
            })
            .catch((error) => {
                console.error(`Erro ao buscar ${pagina}:`, error);

                mensagemErro('Erro ao se conectar ao servidor!');
            });
    }, []);

    return (
        <div className="container">
            <Card title={`Listagem de ${pagina}`}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => cadastrar()}
                            >
                                Cadastrar {pagina}
                            </button>

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        {campos && campos.map((campo, index) => (
                                            <th scope="col" key={index}>{campo.toUpperCase()}</th>
                                        ))}
                                        <th scope="col">AÇÕES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dados && dados.map((item) => (
                                        <tr key={item.id}>
                                            {campos && campos.map((campo, index) => (
                                                <td key={index}>
                                                    {typeof item[campo] === 'boolean' ? 
                                                        (item[campo] ? <True /> : <False />)
                                                        : item[campo]
                                                    }
                                                </td>
                                            ))}
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

export default Listagem;