import { useState } from 'react';
import styles from './book-card.module.css';
import { useNavigate } from 'react-router-dom';

function BookCard({ livro }) {
    const navigate = useNavigate();

    return (
        <div 
        className={styles.card}
        onClick={() => navigate(`/livros/${livro.id}`)}
        >
            <img
                src={`/covers/${livro.isbn}.jpg`}
                alt={`Capa de ${livro.nome}`}
                className={styles.cardImg}
                />
        </div>
    )
}

export default BookCard;