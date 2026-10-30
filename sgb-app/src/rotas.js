import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import ListagemAutor from './views/listagem/listagem-autor';
import ListagemEditora from './views/listagem/listagem-editora';
import ListagemLivro from './views/listagem/listagem-livro';
import ListagemExemplar from './views/listagem/listagem-exemplar';
import ListagemReserva from './views/listagem/listagem-reserva';
import ListagemEmprestimo from './views/listagem/listagem-emprestimo';
import ListagemLeitor from './views/listagem/listagem-leitor';
import ListagemFuncionario from './views/listagem/listagem-funcionario';
import ListagemParametro from './views/listagem/listagem-parametro';

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

function Rotas(props) {
    return (
        <Routes>
            <Route path='/' element={<Acervo />} />
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