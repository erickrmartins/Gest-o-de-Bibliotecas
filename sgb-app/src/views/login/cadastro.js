import styles from './login.module.css';
import { Link } from 'react-router-dom';
import FormGroup from '../../components/form-group';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChecarAsterisco from '../../utills/checar-asterisco.js';

import { mensagemSucesso, mensagemErro } from '../../components/toastr.js';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';

function Cadastro() {
    const baseURL = `${BASE_URL}/leitores`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dtNasc, setDtNasc] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const [tentouSalvar, setTentouSalvar] = useState(false);

    async function salvar() {
        setTentouSalvar(true);

        if (!nome || !cpf || !dtNasc || !telefone || !email || !senha) {
            return;
        }

        let data = {
            id,
            nome,
            dtNasc,
            cpf,
            telefone,
            email,
            senha
        };
        data = JSON.stringify(data);
        await axios
            .post(baseURL, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                mensagemSucesso(`Cadastro realizado com sucesso!`);
                navigate(`/login`);
            })
            .catch(function (error) {
                mensagemErro(error.response.data);
            });
    }


    return (
        <div className={styles.container}>
            <div className={styles.containerLogin}>
                <div className={styles.left}>
                    <h1 className={styles.title}>Cada livro, no lugar certo.</h1>
                    <span className={styles.subtitle}>Catálogo, reservas, empréstimos e devoluções da biblioteca em um só lugar.</span>
                </div>
                <div className={styles.right}>
                    <div className={styles.formContainer}>
                        <div className={styles.formHeader}>
                            <h1 className="fw-bold ">Cadastrar</h1>
                            <span className={styles.subtitle}>Preencha os campos abaixo para criar sua conta.</span>
                        </div>
                        <form className={styles.form}>
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
                            <FormGroup label='CPF: *' htmlFor='inputCpf'>
                                <input
                                    type='text'
                                    id='inputCpf'
                                    maxLength='11'
                                    value={cpf}
                                    className='form-control'
                                    name='cpf'
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={cpf} />
                            </FormGroup>
                            <FormGroup label='Data de Nascimento: *' htmlFor='inputDtNasc'>
                                <input
                                    type='date'
                                    id='inputDtNasc'
                                    value={dtNasc}
                                    className='form-control'
                                    name='dtNasc'
                                    onChange={(e) => setDtNasc(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={dtNasc} />
                            </FormGroup>
                            <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
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
                            <FormGroup label='E-mail: *' htmlFor='inputEmail'>
                                <input
                                    type='email'
                                    id='inputEmail'
                                    value={email}
                                    className='form-control'
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={email} />
                            </FormGroup>
                            <FormGroup label='Senha: *' htmlFor='inputSenha'>
                                <input
                                    type='password'
                                    id='inputSenha'
                                    value={senha}
                                    className='form-control'
                                    name='senha'
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <ChecarAsterisco tentouSalvar={tentouSalvar} variavel={senha} />
                            </FormGroup>
                            <button type="submit" className="btn btn-primary" onClick={(e) => {
                                e.preventDefault();
                                salvar();
                            }}>
                                Cadastrar
                            </button>
                        </form>
                        <div className={styles.register}>
                            <span>Já possui uma conta?</span>
                            <Link to="/login">Entrar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cadastro;