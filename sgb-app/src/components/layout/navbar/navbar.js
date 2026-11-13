import React, { useEffect, useState } from 'react';
import NavbarItem from './navbarItem';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarProfile from './navbarProfile';

import { getLogin } from '../../../utils/login';

function Navbar({}) {
    const location = useLocation();
    const path = location.pathname;
    const show = path === '/login' || path === '/cadastrar';

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getLogin().then((dados) => setProfile(dados));
    }, []);


    return show ? null : (
        <nav className='mx-auto navbar bg-white navbar-expand-lg sticky-top shadow curvatura border-bottom'>
            <div className='container'>
                <div className='container-fluid d-flex flex-wrap align-items-center px-3 gap-3'>
                    <a href='/' className='navbar-brand btn-primary d-flex justify-content-center align-items-center px-2 m-0 curvatura order-0'>SGB</a>

                    <div className='ms-auto ms-lg-0 order-1 order-lg-2'>
                        <NavbarProfile profile={profile} />
                    </div>

                    <button
                        className='navbar-toggler order-2 order-lg-3'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarResponsive'
                        aria-controls='navbarResponsive'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div
                        className='collapse navbar-collapse justify-content-lg-center order-3 order-lg-1'
                        id='navbarResponsive'
                    >
                        <ul className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 list-unstyled m-0 p-0">
                            <NavbarItem destino="/" label="Acervo" render={true} />
                            <NavbarItem destino="/gerenciar" label="Gerenciar" render={true} />
                            <NavbarItem destino="/registrar" label="Registrar" render={true} />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;