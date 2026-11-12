import { useEffect } from "react";
import styles from "./recommended.module.css"
import { Link } from "react-router-dom";
import Estrela from '@mui/icons-material/StarBorderOutlined';
import Livro from '@mui/icons-material/AutoStoriesOutlined';

function Recommended({ livro }) {
    const pathImage = `/backgroundGenre/${livro.idGeneros.toLowerCase()}.jpg`

    return (
        <div 
        className={`row ${styles.container}`}
        style={{'--image-genre': `url(${pathImage})`}}
        >
            <div className="col-lg-4 col-md-6 col-10">
                <span className="d-inline-flex color-accent fw-semibold gap-1 justify-self-center align-items-center"><Estrela />Recomendado</span>
                <div>
                    <h4 className="my-3 fs-1 fw-bold l-spacing-1">{livro.nome}</h4>
                    <h5 className="fs-6 my-3 color-secundary fw-light">{livro.idGeneros} / {livro.dtPublicacao} / {livro.numPaginas} páginas</h5>
                    <p className="fs-6">{livro.sinopsis}</p>
                </div>
                <Link to={`/{livro.isbn}`} className="w-50 btn btn-primary gap-1 d-flex justify-content-center align-items-center"><Livro />Saiba mais</Link>
            </div>
        </div>
    )
}

export default Recommended;