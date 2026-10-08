import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Listagem from './views/listagem';

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
                <Route path="/listagem-autores" element={<Listagem pagina="autores" />} />
                <Route path="/listagem-livros" element={<Listagem pagina="livros" />} />
                <Route path="/listagem-editoras" element={<Listagem pagina="editoras" />} />
                <Route path="/listagem-exemplares" element={<Listagem pagina="exemplares" />} />
                <Route path="/listagem-reservas" element={<Listagem pagina="reservas" />} />
                <Route path="/listagem-emprestimos" element={<Listagem pagina="emprestimos" />} />
                <Route path="/listagem-leitores" element={<Listagem pagina="leitores" />} />
                <Route path="/listagem-funcionarios" element={<Listagem pagina="funcionarios" />} />
                <Route path="/listagem-parametros" element={<Listagem pagina="parametros" />} />

                <Route path="/cadastro-autores" element={<CadastroAutor />} />
                <Route path="/cadastro-livros" element={<CadastroLivro />} />
                <Route path="/cadastro-editoras" element={<CadastroEditora />} />
                <Route path="/cadastro-exemplares" element={<CadastroExemplar />} />
                <Route path="/cadastro-reservas" element={<CadastroReserva />} />
                <Route path="/cadastro-emprestimos" element={<CadastroEmprestimo />} />
                <Route path="/cadastro-leitores" element={<CadastroLeitor />} />
                <Route path="/cadastro-bibliotecarios" element={<CadastroBibliotecario />} />
                <Route path="/cadastro-administradores" element={<CadastroAdministrador />} />
                <Route path="/cadastro-parametros" element={<CadastroParametro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;