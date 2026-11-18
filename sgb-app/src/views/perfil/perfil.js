import { useEffect, useState } from "react";
import Card from "../../components/ui/card.js"
import FormGroup from "../../components/ui/form-group.js";
import SubCard from "../../components/ui/sub-card.js"
import ChecarAsterisco from "../../utils/checar-asterisco.js";

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import { mensagemAlert, mensagemErro, mensagemSucesso } from "../../components/toastr.js"
import { getRole } from "../../utils/login.js";

import MenuBookIcon from '@mui/icons-material/MenuBook';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import axios from "axios";
import { BASE_URL } from "../../config/axios.js";
import { isFuncionario } from "../../utils/login.js";

function Perfil({ profile }) {
    const [id, setId] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [confSenha, setConfSenha] = useState('');
    const [tentouSalvar, setTentouSalvar] = useState(false);
    const [confirmar, setConfirmar] = useState(false);
    const [confirmarDesativar, setConfirmarDesativar] = useState(false);
    const role = isFuncionario(profile) ? "funcionarios" : "leitores";

    function handleSubmit(e) {
        e.preventDefault();
        setTentouSalvar(true);
        setConfirmar(true);
        setSenhaAntiga('');
    }

    function salvar() {
        if (senhaAntiga === confSenha) {
            axios.patch(`${BASE_URL}/${role}/${id}`, { telefone, email, senha })
                .then((response) => {
                    mensagemSucesso("Alteração realizada com sucesso");
                    carregarDados();
                })
                .catch(() => mensagemAlert("Não foi possível alterar. Tente novamente mais tarde."));
        } else {
            mensagemErro("A senha digitada não é a mesma cadastrada.")
        }

        setConfirmar(false);
    }

    function desativar() {
        if (senhaAntiga === confSenha) {

            axios.patch(`${BASE_URL}/${role}/${id}`, { "ativo": false })
                .then((response) => {
                    mensagemSucesso("Conta desativada com sucesso");
                    carregarDados();
                })
                .catch(() => mensagemAlert("Não foi possível alterar. Tente novamente mais tarde."));
        } else {
            mensagemErro("A senha digitada não é a mesma cadastrada.")
        }

        setConfirmarDesativar(false);
    }
    async function carregarDados() {
        await axios.get(`${BASE_URL}/${role}/${id}`).then((response) => { setTelefone(response.data.telefone); setEmail(response.data.email); setConfSenha(response.data.senha);})
    }

    useEffect(() => {
        if (profile) {
            setId(profile.id);
            setTelefone(profile.telefone);
            setEmail(profile.email);
            setConfSenha(profile.senha);
        }
    }, [profile])


    return !profile ? null : (
        <div >
            <Dialog open={confirmar} onClose={() => setConfirmar(false)}>
                <div className="p-3 curvatura d-flex flex-column justify-content-center align-items-center">
                    <DialogTitle>Deseja realmente fazer isso?</DialogTitle>
                    <DialogContent>Seus dados de contato serão atualizados.</DialogContent>
                    <DialogActions className="d-flex flex-column gap-2">
                        <div>
                            <FormGroup label='Confirme sua senha: ' htmlFor='inputSenhaAntiga'>
                                <input
                                    type='password'
                                    id='inputSenhaAntiga'
                                    value={senhaAntiga}
                                    className='form-control'
                                    name='senhaAntiga'
                                    onChange={(e) => setSenhaAntiga(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-danger" onClick={() => setConfirmar(false)}>Cancelar</button>
                            <button className="btn btn-primary" onClick={() => salvar()}>Confirmar</button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
            <Dialog open={confirmarDesativar} onClose={() => setConfirmarDesativar(false)}>
                <div className="p-3 curvatura d-flex flex-column justify-content-center align-items-center">
                    <DialogTitle>Deseja realmente fazer isso?</DialogTitle>
                    <DialogContent>Você não poderá ativar sua conta sem a ajuda de um administrador.</DialogContent>
                    <DialogActions className="d-flex flex-column gap-2">
                        <div>
                            <FormGroup label='Confirme sua senha: ' htmlFor='inputSenhaAntiga'>
                                <input
                                    type='password'
                                    id='inputSenhaAntiga'
                                    value={senhaAntiga}
                                    className='form-control'
                                    name='senhaAntiga'
                                    onChange={(e) => setSenhaAntiga(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-danger" onClick={() => setConfirmarDesativar(false)}>Cancelar</button>
                            <button className="btn btn-primary" onClick={() => desativar()}>Confirmar</button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
            <div className="col-lg-12">
                <div className="image-perfil d-flex align-items-end no-border">
                    <div className="container d-flex flex-row justify-content-start align-items-end gap-4">
                        <img className="object-fit-cover shadow curvatura" style={{ width: "200px", height: "200px" }} src={`/profilePictures/${profile.cpf}.jpg`} alt="Foto de Perfil" />
                        <div>
                            <span className="btn btn-primary p-0 px-1 fs-7">{getRole(profile)}</span>
                            <h4 className="fs-1 fw-bold">{profile.nome}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <Card >
                    <div className="row">
                        <div className="col-lg-8">
                            <SubCard>
                                <h4 className="fs-5 d-flex gap-2 align-items-center"><MenuBookIcon />Dados de contato e acesso</h4>
                                <hr />
                                <form className="row" onSubmit={(e) => handleSubmit(e)}>
                                    <div className="col-lg-6">
                                        <FormGroup label='Nome Completo: ' htmlFor='inputNome'>
                                            <input
                                                type='text'
                                                id='inputNome'
                                                value={profile.nome}
                                                className='form-control'
                                                name='nome'
                                                disabled
                                            />
                                            <ChecarAsterisco />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup label='CPF: ' htmlFor='inputCpf'>
                                            <input
                                                type='text'
                                                id='inputCpf'
                                                value={profile.cpf}
                                                className='form-control'
                                                name='cpf'
                                                disabled
                                            />
                                            <ChecarAsterisco />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup label='Telefone: ' htmlFor='inputTelefone'>
                                            <input
                                                type='text'
                                                id='inputTelefone'
                                                value={telefone}
                                                className='form-control'
                                                name='telefone'
                                                onChange={(e) => setTelefone(e.target.value)}
                                            />
                                            <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={telefone} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup label='Email: ' htmlFor='inputEmail'>
                                            <input
                                                type='text'
                                                id='inputEmail'
                                                value={email}
                                                className='form-control'
                                                name='email'
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={email} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup label='Nova senha: ' htmlFor='inputSenha'>
                                            <input
                                                type='passwtord'
                                                id='inputSenha'
                                                value={senha}
                                                className='form-control'
                                                name='senha'
                                                onChange={(e) => setSenha(e.target.value)}
                                            />
                                            <span className="fs-8 text-muted">Caso não deseje alterar a senha, deixe esse campo vazio.</span>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-12">
                                        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                                    </div>

                                </form>
                            </SubCard>
                        </div>
                        <div className="col-lg-4">
                            <SubCard>
                                <h4 className="fs-5 d-flex gap-2 align-items-center"><WarningAmberIcon />Desativar conta</h4>
                                <hr />
                                <p>A conta não pode ser desativada enquanto houver empréstimos ativos. Suas reservas na fila de espera serão canceladas.</p>
                                <button className="btn btn-outline-danger" onClick={() => {setSenhaAntiga(''); setConfirmarDesativar(true);}}>Desativar minha conta</button>
                            </SubCard>
                        </div>
                    </div>
                </Card >
            </div >
        </div >
    )

}

export default Perfil;