import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import ListagemAutor from './views/listagem-autor';
import ListagemEditora from './views/listagem-editora';
import ListagemLivro from './views/listagem-livro';
import ListagemExemplar from './views/listagem-exemplar';
import ListagemReserva from './views/listagem-reserva';
import ListagemEmprestimo from './views/listagem-emprestimo';
import ListagemLeitor from './views/listagem-leitor';
import ListagemFuncionario from './views/listagem-funcionario';
import ListagemParametro from './views/listagem-parametro';

import CadastroAutor from './views/cadastro-autor';
import CadastroLivro from './views/cadastro-livro';
import CadastroEditora from './views/cadastro-editora';
import CadastroExemplar from './views/cadastro-exemplar';
import CadastroReserva from './views/cadastro-reserva';
import CadastroEmprestimo from './views/cadastro-emprestimo';
import CadastroLeitor from './views/cadastro-leitor';
import CadastroBibliotecario from './views/cadastro-bibliotecario';
import CadastroAdministrador from './views/cadastro-administrador';
import CadastroParametro from './views/cadastro-parametro';

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/listagem-autores" element={<ListagemAutor />} />
                <Route path="/listagem-livros" element={<ListagemLivro />} />
                <Route path="/listagem-editoras" element={<ListagemEditora />} />
                <Route path="/listagem-exemplares" element={<ListagemExemplar />} />
                <Route path="/listagem-reservas" element={<ListagemReserva />} />
                <Route path="/listagem-emprestimos" element={<ListagemEmprestimo />} />
                <Route path="/listagem-leitores" element={<ListagemLeitor />} />
                <Route path="/listagem-funcionarios" element={<ListagemFuncionario />} />
                <Route path="/listagem-parametros" element={<ListagemParametro />} />

                <Route path="/cadastro-autores/:idParam?" element={<CadastroAutor />} />
                <Route path="/cadastro-livros/:idParam?" element={<CadastroLivro />} />
                <Route path="/cadastro-editoras/:idParam?" element={<CadastroEditora />} />
                <Route path="/cadastro-exemplares/:idParam?" element={<CadastroExemplar />} />
                <Route path="/cadastro-reservas/:idParam?" element={<CadastroReserva />} />
                <Route path="/cadastro-emprestimos/:idParam?" element={<CadastroEmprestimo />} />
                <Route path="/cadastro-leitores/:idParam?" element={<CadastroLeitor />} />
                <Route path="/cadastro-bibliotecarios/:idParam?" element={<CadastroBibliotecario />} />
                <Route path="/cadastro-administradores/:idParam?" element={<CadastroAdministrador />} />
                <Route path="/cadastro-parametros/:idParam?" element={<CadastroParametro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;