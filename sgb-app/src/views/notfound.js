import React from 'react';
import Card from '../components/cards';
import '../custom.css';
import SubCard from '../components/sub-card';


function NotFound() {
    return (
        <div className='container'>
            <Card title="Página não encontrada">
                <SubCard className='col'>
                    <span className='row'>A página que está tentando acessar não foi encontrada</span>
                    <button href='/' className='btn btn-primary row'>Página Inicial</button>
                </SubCard>
            </Card>
        </div>
    )

}

export default NotFound;