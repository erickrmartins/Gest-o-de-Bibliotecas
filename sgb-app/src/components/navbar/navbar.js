import React, { useEffect, useState } from 'react';
import NavbarItem from './navbarItem';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NavbarProfile from './navbarProfile';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';

const baseUrl = `${BASE_URL}/leitores/1`

function Navbar(props) {
    const [profile, setProfile] = useState('');
    const location = useLocation();
    const path = location.pathname;
    const show = path === '/login' || path === '/cadastrar';

    useEffect(() => {
        axios.get(baseUrl).then((response) => setProfile(response.data))
    }, []);


    return show ? null : (
        <nav className='mx-auto navbar bg-white navbar-expand-lg sticky-top shadow curvatura border-bottom'
        >
            <div className='container'>
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
            </div>
        </nav>
    );
}

export default Navbar;