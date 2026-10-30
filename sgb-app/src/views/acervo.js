import Card from "../components/cards/card";
import GenreCarousel from "../components/main/genre-carousel";


import axios from "axios";
import { BASE_URL } from "../config/axios";
import { useEffect, useState } from "react";


function Acervo() {
    const [livros, setLivros] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [generoSelec, setGeneroSelec] = useState('');

    function getLivrosByGenero(genero) {
        return livros.filter((livro) => livro.idGeneros === genero.nome);
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/livros`).then((response) => setLivros(response.data));
        axios.get(`${BASE_URL}/generos`).then((response) => setGeneros(response.data));
    }, []);

    return (
        <div className="container">
            <Card title="Acervo" subtitle="Esses são os livros disponíveis em nosso acervo">
                <div className="row mb-4">
                    {!generoSelec ? null :
                        <a className={`bg-white m-auto p-2 curvatura generoSelected text-center col-xl-1 col-md-2 col-sm-4 col-5`}
                            onClick={() => { setGeneroSelec('') }}
                        >
                            Limpar
                        </a>
                    }
                    {generos.map((genero) => (
                        <a
                            className={`bg-white m-auto p-2 curvatura generoSelect text-center col-xl-1 col-md-2 col-sm-4 col-5 ${getLivrosByGenero(genero).length > 0 ? "" : "d-none"}`}
                            onClick={() => { setGeneroSelec(genero) }}
                        >
                            {genero.nome}
                        </a>
                    ))}
                </div>
                <div className="row">
                    {
                        generoSelec ?
                            (
                                <GenreCarousel genero={generoSelec.nome} livros={getLivrosByGenero(generoSelec)} maximizar={true} />
                            )
                            :
                            generos.map((genero) => (
                                <div className={`col-lg-6 ${getLivrosByGenero(genero).length > 0 ? "" : "d-none"}`}>
                                    <GenreCarousel genero={genero.nome} livros={getLivrosByGenero(genero)} />
                                </div>
                            ))
                    }
                </div>
            </Card >
        </div >
    )
}

export default Acervo;