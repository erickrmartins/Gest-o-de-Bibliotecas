import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';

import ListagemAutor from './views/listagem/ListagemAutor';
import ListagemEditora from './views/listagem/ListagemEditora';
import ListagemLivro from './views/listagem/ListagemLivro';
import ListagemExemplar from './views/listagem/ListagemExemplar';
import ListagemReserva from './views/listagem/ListagemReserva';
import ListagemEmprestimo from './views/listagem/ListagemEmprestimo';
import ListagemLeitor from './views/listagem/ListagemLeitor';
import ListagemFuncionario from './views/listagem/ListagemFuncionario';
import ListagemParametro from './views/listagem/ListagemParametro';
import ListagemRecomendados from './views/listagem/ListagemRecomendados';
import ListagemGenero from './views/listagem/ListagemGenero';

import CadastroAutor from './views/cadastro/CadastroAutor';
import CadastroLivro from './views/cadastro/CadastroLivro';
import CadastroEditora from './views/cadastro/CadastroEditora';
import CadastroExemplar from './views/cadastro/CadastroExemplar';
import CadastroReserva from './views/cadastro/CadastroReserva';
import CadastroEmprestimo from './views/cadastro/CadastroEmprestimo';
import CadastroLeitor from './views/cadastro/CadastroLeitor';
import CadastroFuncionario from './views/cadastro/CadastroFuncionario';
import CadastroParametro from './views/cadastro/CadastroParametro';
import CadastroGenero from './views/cadastro/CadastroGenero';

import NotFound from './views/notfound';
import Gerenciar from './views/dashboard/Gerenciar';
import Registrar from './views/dashboard/Registrar';
import Acervo from './views/acervo/Acervo';

import Login from './views/auth/Login';
import Cadastro from './views/auth/Cadastro';
import LivroDetalhes from './views/acervo/LivroDetalhes';
import Perfil from './views/perfil/Perfil';

import MeusEmprestimos from './views/perfil/MeusEmprestimos.js'
import MeusReservas from './views/perfil/MeusReservas.js';
import MeuHistorico from './views/perfil/MeuHistorico.js';

import Relatorio from './views/relatorio/Relatorio.js';

import { getLogin } from './utils/auth/Login';

import { mensagemErro, mensagemAlert } from './components/Toastr';

function VerificarPerfil({ profile, status, permitidos }) {
    if (status === 'error') {
        return mensagemErro('Não foi possível verificar sua seção. Tente novamente mais tarde.')
    };

    if (status === 'notReady') {
        return null;
    };

    if (!profile) {
        mensagemAlert("Você precisa estar autenticado para realizar essa ação.");
        return < Navigate to="/login" />;
    };

    const role = !("isAdmin" in profile) ? "leitor" : profile.isAdmin ? "administrador" : "bibliotecario";

    if (!permitidos.includes(role)) {
        mensagemAlert("Você não possui permissão para visualizar essa página.")
        return <Navigate to="/" />
    }

    return <Outlet />
}

function Rotas(props) {
    const [profile, setProfile] = useState(null);
    const [status, setStatus] = useState('notReady');

    useEffect(() => {
        getLogin()
            .then((dados) => {
                setProfile(dados);
                setStatus('ready')
            }).catch(() => {
                setStatus('error');
            })
    }, []);

    const usuarios = ["leitor", "bibliotecario", "administrador"];
    const funcionarios = ["bibliotecario", "administrador"];
    const administrador = ["administrador"];

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path='/' element={<Acervo />} />
            <Route path="/livros/:idParam" element={<LivroDetalhes profile={profile} />} />

            <Route element={<VerificarPerfil profile={profile} status={status} permitidos={usuarios} />}>
                <Route path="/perfil" element={<Perfil profile={profile} />} />
                <Route path="/perfil/emprestimos" element={<MeusEmprestimos profile={profile} />} />
                <Route path="/perfil/reservas" element={<MeusReservas profile={profile} />} />
                <Route path='/perfil/historico' element={<MeuHistorico profile={profile} />} />
            </Route>

            <Route element={<VerificarPerfil profile={profile} status={status} permitidos={funcionarios} />}>
                <Route path='/gerenciar' element={<Gerenciar profile={profile} />} />
                <Route path='/registrar' element={<Registrar profile={profile} />} />

                <Route path="/autores" element={<ListagemAutor />} />
                <Route path="/livros" element={<ListagemLivro />} />
                <Route path="/editoras" element={<ListagemEditora />} />
                <Route path="/exemplares" element={<ListagemExemplar />} />
                <Route path="/reservas" element={<ListagemReserva />} />
                <Route path="/emprestimos" element={<ListagemEmprestimo />} />
                <Route path="/generos" element={<ListagemGenero />} />
                <Route path="/recomendados" element={<ListagemRecomendados />} />

                <Route path="/autores/cadastrar/:idParam?" element={<CadastroAutor />} />
                <Route path="/livros/cadastrar/:idParam?" element={<CadastroLivro />} />
                <Route path="/editoras/cadastrar/:idParam?" element={<CadastroEditora />} />
                <Route path="/exemplares/cadastrar/:idParam?" element={<CadastroExemplar />} />
                <Route path="/reservas/cadastrar/:idParam?" element={<CadastroReserva />} />
                <Route path="/emprestimos/cadastrar/:idParam?" element={<CadastroEmprestimo />} />
                <Route path="/generos/cadastrar/:idParam?" element={<CadastroGenero />} />

                <Route path="/relatorio/:idParam?" element={<Relatorio profile={profile} />} />
            </Route>

            <Route element={<VerificarPerfil profile={profile} status={status} permitidos={administrador} />}>

                <Route path="/leitores" element={<ListagemLeitor />} />
                <Route path="/funcionarios" element={<ListagemFuncionario />} />
                <Route path="/parametros" element={<ListagemParametro />} />

                <Route path="/leitores/cadastrar/:idParam?" element={<CadastroLeitor />} />
                <Route path='/funcionarios/cadastrar/:idParam?' element={<CadastroFuncionario />} />
                <Route path="/parametros/cadastrar/:idParam" element={<CadastroParametro />} />

            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}

export default Rotas;