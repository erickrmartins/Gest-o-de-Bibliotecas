import React, { useEffect, useState } from 'react';
import NavbarItem from './navbarItem';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NavbarProfile from './navbarProfile';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';

const baseUrl = `${BASE_URL}/leitores/1`


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
    const [profile, setProfile] = useState('');

    useEffect(() => {
        axios.get(baseUrl).then((response) => setProfile(response.data))
    }, []);

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
                    <ul className="d-flex align-items-center justify-content-center gap-3 list-unstyled m-0 p-0">
                        <NavbarItem
                            destino="/"
                            label="Acervo"
                            render={true}
                        />

                        <NavbarItem
                            destino="/gerenciar"
                            label="Gerenciar"
                            render={true}
                        />

                        <NavbarItem
                            destino="/registrar"
                            label="Registrar"
                            render={true}
                        />
                    </ul>
                    <NavbarProfile profile={profile} />
                </div>
            </nav>
        </div>
    );
}

export default Navbar;