import SubCard from "../cards/sub-card";
import BookCard from "./book-card";
import { useState } from "react";

function GenreCarousel({ genero, livros, maximizar }) {
    const [ index, setIndex ] = useState(0);
    const maxIndex = livros.length - 3;

    function alterar({botao}) {
        if (botao === -1) {
            if (index > 0) {
                setIndex(index - 1);
            }
        }
        else {
            if (index < maxIndex) {
                setIndex(index + 1);
            }
        }
    }

    return !(livros.length > 0) ? null : (
        <div className="mb-4">
            <SubCard>
                <a className="icon-link icon-link-hover a-main">
                    <h2>{genero}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" class="bi" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                </a >
                <div className="row">
                    {maximizar ? livros.map((livro) => (
                        <div className="col-lg-2 col-md-4 col-sm-6 col-6">
                            <BookCard livro={livro} />
                        </div>
                    )) : livros.slice(index, index + 3).map((livro) => (
                        <div className="col-lg-4 col-4">
                            <BookCard livro={livro} />
                        </div>
                    ))}
                </div>
                {maximizar ? null : (
                    <div className="d-flex justify-content-center align-items-center mt-2" style={{ gap: "1rem" }}>
                        <a className="bg-white p-2 curvatura generoSelect text-center" onClick={() => alterar({ botao: -1 })}>&lt;</a>
                        <span>{index + 1}</span>
                        <a className="bg-white p-2 curvatura generoSelect text-center" onClick={() => alterar({ botao: 1 })}>&gt;</a>
                    </div>
                )}
            </SubCard >
        </div >
    )
}


export default GenreCarousel;