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
                            href='/listagem-autor'
                            label='Autores'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-editora'
                            label='Editoras'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-livro'
                            label='Livros'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-exemplar'
                            label='Exemplares'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-reserva'
                            label='Reservas'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-emprestimo'
                            label='Empréstimos'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-leitor'
                            label='Leitores'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-bibliotecario'
                            label='Bibliotecários'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-administrador'
                            label='Administradores'
                        />
                    </ul>
                    <ul className='navbar-nav'>
                        <NavbarItem
                            render='true'
                            href='/listagem-parametro'
                            label='Parâmetros'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;