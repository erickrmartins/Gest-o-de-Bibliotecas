import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';

import ListagemAutor from './views/listagem/listagem-autor';
import ListagemEditora from './views/listagem/listagem-editora';
import ListagemLivro from './views/listagem/listagem-livro';
import ListagemExemplar from './views/listagem/listagem-exemplar';
import ListagemReserva from './views/listagem/listagem-reserva';
import ListagemEmprestimo from './views/listagem/listagem-emprestimo';
import ListagemLeitor from './views/listagem/listagem-leitor';
import ListagemFuncionario from './views/listagem/listagem-funcionario';
import ListagemParametro from './views/listagem/listagem-parametro';
import ListagemRecomendados from './views/listagem/listagem-recomendados.js';

import CadastroAutor from './views/cadastro/cadastro-autor';
import CadastroLivro from './views/cadastro/cadastro-livro';
import CadastroEditora from './views/cadastro/cadastro-editora';
import CadastroExemplar from './views/cadastro/cadastro-exemplar';
import CadastroReserva from './views/cadastro/cadastro-reserva';
import CadastroEmprestimo from './views/cadastro/cadastro-emprestimo';
import CadastroLeitor from './views/cadastro/cadastro-leitor';
import CadastroFuncionario from './views/cadastro/cadastro-funcionario';
import CadastroParametro from './views/cadastro/cadastro-parametro';

import NotFound from './views/notfound';
import Gerenciar from './views/dashboard/gerenciar';
import Registrar from './views/dashboard/registrar';
import Acervo from './views/acervo';

import Login from './views/login/login';
import Cadastro from './views/login/cadastro';
import BookPage from './views/book-page';
import Perfil from './views/perfil/perfil';

import MeusEmprestimos from './views/perfil/meus-emprestimos.js'
import MeusReservas from './views/perfil/meus-reservas.js';
import MeuHistorico from './views/perfil/meu-historico.js';

import Relatorio from './views/relatorio/relatorio.js';

import { getLogin } from './utils/login';

import { mensagemErro, mensagemAlert } from './components/toastr';

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
            <Route path="/livros/:idParam" element={<BookPage profile={profile} />} />

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
                <Route path="/recomendados" element={<ListagemRecomendados />} />

                <Route path="/autores/cadastrar/:idParam?" element={<CadastroAutor />} />
                <Route path="/livros/cadastrar/:idParam?" element={<CadastroLivro />} />
                <Route path="/editoras/cadastrar/:idParam?" element={<CadastroEditora />} />
                <Route path="/exemplares/cadastrar/:idParam?" element={<CadastroExemplar />} />
                <Route path="/reservas/cadastrar/:idParam?" element={<CadastroReserva />} />
                <Route path="/emprestimos/cadastrar/:idParam?" element={<CadastroEmprestimo />} />

                <Route path="/relatorio/:idParam?" element={<Relatorio profile={profile}/>}/>

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