import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
    return (
        <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
            <div className='container'>
                <a href='/' className='navbar-brand'>
                    SGB
                </a>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarResponsive'
                    aria-controls='navbarResponsive'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarResponsive'>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-autores'
                            label='Autores'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-editoras'
                            label='Editoras'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-livros'
                            label='Livros'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-exemplares'
                            label='Exemplares'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-reservas'
                            label='Reservas'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-emprestimos'
                            label='Empréstimos'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-leitores'
                            label='Leitores'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-funcionarios'
                            label='Funcionários'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-parametros'
                            label='Parâmetros'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;