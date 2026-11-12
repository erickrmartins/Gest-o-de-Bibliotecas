import Card from "../components/cards/card";
import GenreCarousel from "../components/main/genre-carousel";
import Recommended from "../components/recommended/recommended";


import axios from "axios";
import { BASE_URL } from "../config/axios";
import { useEffect, useState } from "react";

import { search } from "../utills/search";

import SearchIcon from '@mui/icons-material/Search';

function Acervo() {
    const [livros, setLivros] = useState([]);

    const [generos, setGeneros] = useState([]);
    const [generoSelec, setGeneroSelec] = useState('');

    const [pesquisa, setPesquisa] = useState('');
    const [pesquisaAtiva, setPesquisaAtiva] = useState(false);
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
    const [recomendados, setRecomendados] = useState([]);

    function getLivrosByGenero(genero) {
        return livros.filter((livro) => livro.idGeneros === genero);
    }

    function filtrarLivros() {
        setPesquisaAtiva(true);

        setResultadosPesquisa(search(pesquisa, livros));
    }

    const filtroAtivo = pesquisaAtiva || generoSelec;

    function limparFiltros() {
        setPesquisaAtiva(false);
        setGeneroSelec('');
        setPesquisa('');
    }

    function mostrarLivros() {
        let titulo;
        let livrosFiltrados;

        if (pesquisaAtiva) {
            titulo = "Resultados da pesquisa";
            livrosFiltrados = resultadosPesquisa;
        } else if (generoSelec) {
            titulo = generoSelec;
            livrosFiltrados = getLivrosByGenero(generoSelec);
        } else {
            return (generos.map((genero) => <GenreCarousel titulo={genero.label} livros={getLivrosByGenero(genero.nome)} />));
        }

        return (
            <GenreCarousel titulo={titulo} livros={livrosFiltrados} maximizar={true} />
        );
    }

    useEffect(() => {   
        axios.get(`${BASE_URL}/livros`).then((response) => {
            setLivros(response.data);
            setRecomendados(response.data.filter((livro) => livro.recomendado));
        });
        axios.get(`${BASE_URL}/generos`).then((response) => setGeneros(response.data));
    }, []);

    return (
        <div className="container">
            {recomendados.length > 0 && (
                <Recommended livro={recomendados[Math.floor(Math.random() * recomendados.length)]} />
            )}
            <Card title="Acervo" subtitle="Esses são os livros disponíveis em nosso acervo">
                <div className="row g-2 mb-4 align-items-center">
                    <div className="col-12 col-lg-6">
                        <form className="input-group" onSubmit={(e) => {
                            e.preventDefault();
                            filtrarLivros();
                        }}>
                            <span className="col-1 input-group-text bg-white border-end-0">
                                <SearchIcon style={{ fill: "var(--bs-secondary-color)" }} />
                            </span>
                            <input
                                className='col-11 col-lg-6 form-control border-start-0 ps-0'
                                value={pesquisa}
                                type="text"
                                placeholder="Pesquise..."
                                onChange={(e) => setPesquisa(e.target.value)}
                            />
                            <button type="submit" className="d-none"></button>
                        </form>
                    </div>

                    <div className="col-12 col-md-6 col-lg-2">
                        <select
                            className="form-select"
                            value={generoSelec}
                            onChange={(e) => setGeneroSelec(e.target.value)}
                        >
                            <option value="">Selecione um gênero</option>
                            {generos.map((genero) => (
                                <option key={genero.id} value={genero.nome}>
                                    {genero.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    {!filtroAtivo ? null : (
                        <div className="col-12 col-md-6 col-lg-2">
                            <button className="btn btn-danger w-100" onClick={() => limparFiltros()}>
                                Limpar
                            </button>
                        </div>
                    )}
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <GenreCarousel titulo="Recomendados pela biblioteca" livros={recomendados}/>
                        {mostrarLivros()}
                    </div>
                </div>
            </Card >
        </div >
    )
}

export default Acervo;