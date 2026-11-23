import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/ui/card.js';
import SubCard from '../../components/ui/sub-card.js';
import FormGroup from '../../components/ui/form-group.js';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import axios from 'axios';
import { urlGeneros } from '../../config/axios.js';

import ChecarAsterisco from '../../utils/checar-asterisco.js';
import ImagemTopo from '../../components/topo-imagem.js';

function CadastroGenero() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [label, setLabel] = useState('');

    const [dados, setDados] = useState([]);

    const [tentouSalvar, setTentouSalvar] = useState(false);

    function inicializar() {
        if (idParam == null) {
            setNome('');
            setLabel('');
        } else {
            setNome(dados.nome);
            setLabel(dados.label);
        }
    }

    async function salvar() {
        setTentouSalvar(true);

        if (!nome || !label) {
            return;
        }

        let data = {
            nome,   
            label,
            ativo: true
        };

        data = JSON.stringify(data);

        if (idParam == null) {
            await axios.post(urlGeneros, data)
                .then(function (response) {
                    mensagemSucesso(`Genero ${nome} cadastrado com sucesso!`);
                    navigate(`/generos`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        } else {
            await axios.patch(`${urlGeneros}/${idParam}`, data)
                .then(function (response) {
                    mensagemSucesso(`Genero ${nome} alterado com sucesso!`);
                    navigate(`/generos`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        }
    }

    async function buscar() {
        await axios.get(`${urlGeneros}/${idParam}`).then((response) => {
            setDados(response.data);
            setNome(response.data.nome);
            setLabel(response.data.label);
        });
    }

    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [idParam]);

    if (!dados) return null;

    return (
        <div>
            <ImagemTopo
                imagem="/background-gerencia.jpg"
                titulo="Cadastro de Gênero"
                subtitulo="Campos com * são obrigatórios."
            />
            <div className="container">
                <Card>
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
                                    <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={nome} />
                                </FormGroup>
                                <FormGroup label='Label: *' htmlFor='inputLabel'>
                                    <input
                                        type='text'
                                        id='inputLabel'
                                        value={label}
                                        className='form-control'
                                        name='label'
                                        onChange={(e) => setLabel(e.target.value)}
                                    />
                                    <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={label} />
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
                                    Salvar
                                </button>
                            </Stack>
                        </div>
                    </SubCard>
                </Card>
            </div>
        </div>
    );
}

export default CadastroGenero;
