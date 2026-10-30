import Card from "../components/cards/card";
import GenreCarousel from "../components/main/genre-carousel";


import axios from "axios";
import { BASE_URL } from "../config/axios";
import { useEffect, useState } from "react";


function Acervo() {
    const [livros, setLivros] = useState([]);
    const [generos, setGeneros] = useState([]);

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
                {generos.map((genero) => (
                    <GenreCarousel genero={genero.nome} livros={getLivrosByGenero(genero)}/>
                ))}
            </Card>
        </div>
    )
}

export default Acervo;