import React from 'react';
import NavbarItem from './navbarItem';
import '../custom.css'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const items = [
    {
        "id": 1,
        "label": "Listagens",
        "items": [
            { "id": 1, "href": '/listagem-autores', "label": 'Autores', "render": true },
            { "id": 2, "href": '/listagem-editoras', "label": 'Editoras', "render": true },
            { "id": 3, "href": '/listagem-livros', "label": 'Livros', "render": true },
            { "id": 4, "href": '/listagem-exemplares', "label": 'Exemplares', "render": true },
            { "id": 5, "href": '/listagem-reservas', "label": 'Reservas', "render": true },
            { "id": 6, "href": '/listagem-emprestimos', "label": 'Empréstimos', "render": true },
            { "id": 7, "href": '/listagem-leitores', "label": 'Leitores', "render": true },
            { "id": 8, "href": '/listagem-funcionarios', "label": 'Funcionários', "render": true },
            { "id": 9, "href": '/listagem-parametros', "label": 'Parâmetros', "render": true }
        ]
    },
    {
        "id": 2,
        "label": "Cadastros",
        "items": [
            { "id": 1, "href": '/cadastro-autores', "label": 'Autores', "render": true },
            { "id": 2, "href": '/cadastro-editoras', "label": 'Editoras', "render": true },
            { "id": 3, "href": '/cadastro-livros', "label": 'Livros', "render": true },
            { "id": 4, "href": '/cadastro-exemplares', "label": 'Exemplares', "render": true },
            { "id": 5, "href": '/cadastro-reservas', "label": 'Reservas', "render": true },
            { "id": 6, "href": '/cadastro-emprestimos', "label": 'Empréstimos', "render": true },
            { "id": 7, "href": '/cadastro-leitores', "label": 'Leitores', "render": true },
            { "id": 8, "href": '/cadastro-funcionarios', "label": 'Funcionários', "render": true },
        ]
    }
]

function Navbar(props) {
    const navigate = useNavigate();

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
                        <form className='d-flex mx-auto w-75' role='search' onSubmit={() => navigate('/listagem-livros')}>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <SearchIcon style={{fill: "var(--bs-secondary-color)"}}/>
                                </span>
                                <input
                                    className='form-control border-start-0 ps-0'
                                    type='search'
                                    placeholder='Digite o nome de um livro'
                                    aria-label='Procurar'
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
                                            <li key={item.id}>
                                                <NavbarItem
                                                    render={item.render}
                                                    href={item.href}
                                                    label={item.label}
                                                />
                                            </li>
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