import React, { useState } from 'react';
import NavbarItem from './navbarItem';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const items = [
    {
        "id": 1,
        "label": "Listagens",
        "items": [
            { "id": 1, "href": '/autores', "label": 'Autores', "render": true },
            { "id": 2, "href": '/editoras', "label": 'Editoras', "render": true },
            { "id": 3, "href": '/livros', "label": 'Livros', "render": true },
            { "id": 4, "href": '/exemplares', "label": 'Exemplares', "render": true },
            { "id": 5, "href": '/reservas', "label": 'Reservas', "render": true },
            { "id": 6, "href": '/emprestimos', "label": 'Empréstimos', "render": true },
            { "id": 7, "href": '/leitores', "label": 'Leitores', "render": true },
            { "id": 8, "href": '/funcionarios', "label": 'Funcionários', "render": true },
            { "id": 9, "href": '/parametros', "label": 'Parâmetros', "render": true }
        ]
    },
    {
        "id": 2,
        "label": "Cadastros",
        "items": [
            { "id": 1, "href": '/autores/cadastrar', "label": 'Autores', "render": true },
            { "id": 2, "href": '/editoras/cadastrar', "label": 'Editoras', "render": true },
            { "id": 3, "href": '/livros/cadastrar', "label": 'Livros', "render": true },
            { "id": 4, "href": '/exemplares/cadastrar', "label": 'Exemplares', "render": true },
            { "id": 5, "href": '/reservas/cadastrar', "label": 'Reservas', "render": true },
            { "id": 6, "href": '/emprestimos/cadastrar', "label": 'Empréstimos', "render": true },
            { "id": 7, "href": '/leitores/cadastrar', "label": 'Leitores', "render": true },
            { "id": 8, "href": '/funcionarios/cadastrar', "label": 'Funcionários', "render": true },
        ]
    }
]

function Navbar(props) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    return (
        <div className='container py-3'>
            <nav className='mx-auto navbar navbar-expand-lg bg-white sticky-top shadow curvatura'>
                <div className='container-fluid d-flex px-5 align-items-center justify-content-between'>
                    <a href='/' className='navbar-brand'>SGB</a>

                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarResponsive'
                        aria-controls='navbarResponsive'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse justify-content-between align-items-center w-100' id='navbarResponsive'>
                        <form className='d-flex mx-auto w-75' role='search' onSubmit={() => navigate(`/procurar/${search}`)}>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <SearchIcon style={{ fill: "var(--bs-secondary-color)" }} />
                                </span>
                                <input
                                    className='form-control border-start-0 ps-0'
                                    type='search'
                                    placeholder='Digite o nome de um livro'
                                    aria-label='Procurar'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <button className='d-none' type='submit'>Procurar</button>
                        </form>

                        <ul className='navbar-nav mb-2 mb-lg-0'>
                            {items.map((type) => (
                                <li className='nav-item dropdown' key={type.id}>
                                    <a className='nav-link dropdown-toggle' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {type.label}
                                    </a>
                                    <ul className='dropdown-menu align-items-center justify-content-center'>
                                        {type.items.map((item) => (
                                            <NavbarItem
                                                key={item.id}
                                                render={item.render}
                                                href={item.href}
                                                label={item.label}
                                            />
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;