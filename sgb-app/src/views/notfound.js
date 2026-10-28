import React from 'react';
import Card from '../components/cards/card.js';
import SubCard from '../components/cards/sub-card.js';
import '../custom.css';

function NotFound() {
    return (
        <div className='container'>
            <Card title="Página não encontrada" subtitle="">
                <SubCard className="mb-4">
                    <div className='d-flex gap-3 flex-column justify-content-center align-items-center'>
                        <img src='/assets/notfound.png' alt='Página não encontrada' className='object-fit-contain'/>
                        <span className='row'>A página que está tentando acessar não foi encontrada</span>
                        <a href='/' className='btn btn-primary row'>Página Inicial</a>
                    </div>
                </SubCard>
            </Card>
        </div>
    )

}

export default NotFound;