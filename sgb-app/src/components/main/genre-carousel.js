import BookCard from "./book-card";
import { useState, useEffect } from "react";
import { mensagemAlert } from '../../components/toastr.js';

function calcularVisiveis(largura) {
    if (largura >= 992) return 6; // lg e xl
    if (largura >= 576) return 4; // sm e md
    return 3;                     // xs
}

function GenreCarousel({ titulo, livros, maximizar, limpar }) {
    const [index, setIndex] = useState(0);
    const [visiveis, setVisiveis] = useState(calcularVisiveis(window.innerWidth));
    const maxIndex = Math.max(0, livros.length - visiveis);

    useEffect(() => {
        function aoRedimensionar() {
            setVisiveis(calcularVisiveis(window.innerWidth));
        }
        window.addEventListener("resize", aoRedimensionar);
        return () => window.removeEventListener("resize", aoRedimensionar);
    }, []);

    useEffect(() => {
        if (index > maxIndex) setIndex(maxIndex);
    }, [maxIndex, index]);

    function alterar({ botao }) {
        if (botao === -1) {
            if (index > 0) {
                setIndex(index - 1);
            }
            else {
                setIndex(maxIndex);
            }
        }
        else {
            if (index < maxIndex) {
                setIndex(index + 1);
            }
            else {
                setIndex(0);
            }
        }
    }

    return !(livros.length > 0) ? null : (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="d-flex justify-content-center align-items-center">
                    <h3 className="fw-semibold m-0 fs-4">{titulo}</h3>
                </div>
                <div>
                    {maximizar ?
                        <button className="btn btn-primary fs-7" onClick={limpar}>Limpar Filtros</button>
                        : (
                            <div className="d-flex justify-content-center align-items-center mt-2 mb-3" style={{ gap: "1rem" }}>
                                <a className="fs-5 generoSelect px-3 py-1 curvatura" onClick={() => alterar({ botao: -1 })}>&lt;</a>
                                <a className="fs-5 generoSelect px-3 py-1 curvatura" onClick={() => alterar({ botao: 1 })}>&gt;</a>
                            </div>
                        )}
                </div>
            </div>
            <div className="row">
                {maximizar ? livros.map((livro) => (
                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-4">
                        <BookCard livro={livro} />
                    </div>
                )) : livros.slice(index, index + visiveis).map((livro) => (
                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-4">
                        <BookCard livro={livro} />
                    </div>
                ))}
            </div>
        </div >
    )
}


export default GenreCarousel;