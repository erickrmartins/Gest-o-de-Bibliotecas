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
                className={`curvatura ${styles.cardImg}`}
            />

            <div className={`d-flex flex-column align-items-start mt-2 ${styles.cardText}`}>
                <h5 className="ms-0 fs-6 text-truncate w-100">{livro.nome}</h5>
                <p className="ms-0 text-muted fs-7 text-truncate w-100">{livro.idAutores[0]}</p>
            </div>
        </div>
    )
}

export default BookCard;