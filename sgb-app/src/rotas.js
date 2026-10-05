import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import ListagemAutor from './views/listagem-autor';
import ListagemLivro from './views/listagem-livro';
import ListagemEditora from './views/listagem-editora';
import ListagemExemplar from './views/listagem-exemplar';
import ListagemReserva from './views/listagem-reserva';
import ListagemEmprestimo from './views/listagem-emprestimo';
import ListagemLeitor from './views/listagem-leitor';
import ListagemBibliotecario from './views/listagem-bibliotecario';
import ListagemAdministrador from './views/listagem-administrador';
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
                <Route path="/listagem-autor" element={<ListagemAutor />} />
                <Route path="/listagem-livro" element={<ListagemLivro />} />
                <Route path="/listagem-editora" element={<ListagemEditora />} />
                <Route path="/listagem-exemplar" element={<ListagemExemplar />} />
                <Route path="/listagem-reserva" element={<ListagemReserva />} />
                <Route path="/listagem-emprestimo" element={<ListagemEmprestimo />} />
                <Route path="/listagem-leitor" element={<ListagemLeitor />} />
                <Route path="/listagem-bibliotecario" element={<ListagemBibliotecario />} />
                <Route path="/listagem-administrador" element={<ListagemAdministrador />} />
                <Route path="/listagem-parametro" element={<ListagemParametro />} />

                <Route path="/cadastro-autor" element={<CadastroAutor />} />
                <Route path="/cadastro-livro" element={<CadastroLivro />} />
                <Route path="/cadastro-editora" element={<CadastroEditora />} />
                <Route path="/cadastro-exemplar" element={<CadastroExemplar />} />
                <Route path="/cadastro-reserva" element={<CadastroReserva />} />
                <Route path="/cadastro-emprestimo" element={<CadastroEmprestimo />} />
                <Route path="/cadastro-leitor" element={<CadastroLeitor />} />
                <Route path="/cadastro-bibliotecario" element={<CadastroBibliotecario />} />
                <Route path="/cadastro-administrador" element={<CadastroAdministrador />} />
                <Route path="/cadastro-parametro" element={<CadastroParametro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;