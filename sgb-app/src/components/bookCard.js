import { useNavigate } from "react-router-dom";

function BookCard({ imagem, titulo, descricao, btnTexto, btnUrl }) {
    const navigate = useNavigate();

    return (
        <div class="card w-18 d-flex justify-content-center align-items-center border p-4" onClick={() => navigate(btnUrl)}>
            {imagem}
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">{titulo}</h5>
                <p class="card-text">{descricao}</p>
                <a href={btnUrl} class="btn btn-primary">{btnTexto}</a>
            </div>
        </div>
    )
}

export default BookCard;