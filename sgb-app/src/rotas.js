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
import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroParametro from './views/cadastro-parametro';

import NotFound from './views/notfound';
import Gerenciar from './views/gerenciar';
import Registrar from './views/registrar';

function Rotas(props) {
    return (
        <Routes>
            <Route path='/' element={<Gerenciar />} />
            <Route path='/gerenciar' element={<Gerenciar />} />
            <Route path='/registrar' element={<Registrar />} />

            <Route path="/autores" element={<ListagemAutor />} />
            <Route path="/livros" element={<ListagemLivro />} />
            <Route path="/editoras" element={<ListagemEditora />} />
            <Route path="/exemplares" element={<ListagemExemplar />} />
            <Route path="/reservas" element={<ListagemReserva />} />
            <Route path="/emprestimos" element={<ListagemEmprestimo />} />
            <Route path="/leitores" element={<ListagemLeitor />} />
            <Route path="/funcionarios" element={<ListagemFuncionario />} />
            <Route path="/parametros" element={<ListagemParametro />} />

            <Route path="/autores/cadastrar/:idParam?" element={<CadastroAutor />} />
            <Route path="/livros/cadastrar/:idParam?" element={<CadastroLivro />} />
            <Route path="/editoras/cadastrar/:idParam?" element={<CadastroEditora />} />
            <Route path="/exemplares/cadastrar/:idParam?" element={<CadastroExemplar />} />
            <Route path="/reservas/cadastrar/:idParam?" element={<CadastroReserva />} />
            <Route path="/emprestimos/cadastrar/:idParam?" element={<CadastroEmprestimo />} />
            <Route path="/leitores/cadastrar/:idParam?" element={<CadastroLeitor />} />
            <Route path='/funcionarios/cadastrar/:idParam?' element={<CadastroFuncionario />} />
            <Route path="/parametros/cadastrar/:idParam" element={<CadastroParametro />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Rotas;