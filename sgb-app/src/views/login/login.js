import styles from './login.module.css';
import { Link } from 'react-router-dom';
import FormGroup from '../../components/form-group';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';
import { mensagemErro } from '../../components/toastr.js';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState('leitores');
    const [tentouLogin, setTentouLogin] = useState(false);

    async function handleLogin(e) {
        setTentouLogin(true);
        e.preventDefault();

        await axios.get(`${BASE_URL}/${role}`).then((response) => {
            const user = response.data.find((user) => user.email === email && user.senha === senha);
            if (user) {
                navigate('/');
            }
            else {
                mensagemErro('Usuário não encontrado. Tente novamente ou cadastre-se.');
            }
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
                            <h1 className="fw-bold ">Entrar</h1>
                            <span className={styles.subtitle}>Use seu e-mail ou CPF e senha.</span>
                        </div>
                        <div className={styles.roles}>
                            <span className={role === 'leitores' ? styles.active : ''} onClick={() => setRole('leitores')}>
                                Leitor
                            </span>
                            <span className={role === 'funcionarios' ? styles.active : ''} onClick={() => setRole('funcionarios')}>
                                Funcionário
                            </span>
                        </div>
                        <form className={styles.form} onSubmit={handleLogin}>
                            <FormGroup label='E-mail ou CPF:' htmlFor='loginEmail'>
                                <input
                                    type='text'
                                    id='loginEmail'
                                    className='form-control'
                                    placeholder='Digite seu e-mail ou CPF'
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Senha:' htmlFor='loginSenha'>
                                <input
                                    type='password'
                                    id='loginSenha'
                                    className='form-control'
                                    placeholder='Digite sua senha'
                                    name='senha'
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </FormGroup>
                            <button type="submit" className="btn btn-primary">
                                Entrar
                            </button>
                        </form>
                        <div className={styles.register}>
                            <span>Ainda não possui uma conta?</span>
                            <Link to="/cadastrar">Criar conta</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;