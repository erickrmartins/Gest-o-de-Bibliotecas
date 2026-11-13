import { useParams } from "react-router-dom";
import SubCard from "../components/ui/sub-card.js";
import { useEffect, useState } from "react";

import axios from "axios";
import { BASE_URL } from "../config/axios";

import { mensagemAlert } from '../components/toastr.js';
import StarFilled from '@mui/icons-material/StarOutlined';
import Card from "../components/ui/card.js";
import GenreCarousel from "../components/main/genre-carousel";

const baseUrlGeral = `${BASE_URL}/livros`

function BookPage({ profile }) {
    const { idParam } = useParams();
    const baseUrl = `${baseUrlGeral}/${idParam}`;
    const [livro, setLivro] = useState('');
    const [maisLivros, setMaisLivros] = useState([]);
    const [exemplaresDisponiveis, setExemplaresDisponiveis] = useState([]);

    const isFuncionario = profile ? "isAdmin" in profile : false;

    async function buscar() {
        let responseGet;

        await axios.get(baseUrl).then((response) => {
            setLivro(response.data);
            responseGet = response.data;
        });
        await axios.get(baseUrlGeral).then((response) => {
            const responseGetGeral = response.data.filter((livros) => livros.id != responseGet.id)
            const responseGetGeralFiltrado = responseGetGeral.filter((livros) => (livros.idGeneros === responseGet.idGeneros))
            setMaisLivros(responseGetGeralFiltrado.length > 0 ? responseGetGeralFiltrado : responseGetGeral);
        });
        await axios.get(`${BASE_URL}/exemplares`).then((response) => {
            const exemplares = response.data.filter((exemplar) => exemplar.idLivros === responseGet.nome);
            setExemplaresDisponiveis(exemplares.filter((exemplar) => exemplar.status === "Disponível"));
        })
    }

    useEffect(() => {
        if (idParam) {
            buscar();
        }
    }, [idParam]);

    return (
        <div className="container">
            <Card>
                <div className="container-fluid row">
                    <div className="col-lg-3">
                        <img
                            src={`/covers/${livro.isbn}.jpg`}
                            alt={`Capa de ${livro.nome}`}
                            className={`curvatura img-fluid image-cover`}
                        />
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex gap-2 mb-4">
                            <span className="fs-7 genre-style px-2 px-2 py-1 curvatura d-flex align-items-center justify-content-center gap-1">{livro.idGeneros}</span>
                            {!livro.recomendado ? null : (
                                <span className="fs-7 recommended-style px-2 py-1 curvatura d-flex align-items-center justify-content-center gap-1"><StarFilled fontSize="small" />Recomendado</span>
                            )}
                        </div>
                        <h1>{livro.nome}</h1>
                        <h5 className="fs-6">{livro.idAutores && livro.idAutores.map((autor) => autor)}</h5>
                        <p className="fs-7 my-4">{livro.sinopsis}</p>
                        <hr className="divider" />
                        <div className="row">
                            <div className="col-lg-4 d-flex flex-column mb-2">
                                <label className="fs-8">Editora</label>
                                <span className="fs-6 fw-semibold">{livro.idEditoras}</span>
                            </div>
                            <div className="col-lg-4 d-flex flex-column">
                                <label className="fs-8">Publicação</label>
                                <span className="fs-6 fw-semibold">{livro.dtPublicacao}</span>
                            </div>
                            <div className="col-lg-4 d-flex flex-column">
                                <label className="fs-8">Genero</label>
                                <span className="fs-6 fw-semibold">{livro.idGeneros}</span>
                            </div>
                            <div className="col-lg-4 d-flex flex-column">
                                <label className="fs-8">Páginas</label>
                                <span className="fs-6 fw-semibold">{livro.numPaginas}</span>
                            </div>
                            <div className="col-lg-4 d-flex flex-column">
                                <label className="fs-8">ISBN</label>
                                <span className="fs-6 fw-semibold">{livro.isbn}</span>
                            </div>
                        </div>
                        <hr className="divider" />
                        <div>
                            {isFuncionario ?
                                (
                                    <button className="btn btn-primary" onClick={() => mensagemAlert("Ainda não implementado")}>Recomendar livro</button>
                                )
                                :
                                (
                                    <div className="mt-4 d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="fs-1 m-0 color-success">{exemplaresDisponiveis.length}</h5>
                                            <label>{exemplaresDisponiveis.length != 1 ? `exemplares disponíves` : `exemplar disponível`}</label>
                                        </div>
                                        {exemplaresDisponiveis != 0 ?
                                            <button className="btn btn-primary" onClick={() => mensagemAlert("Ainda não implementado")}>Realizar reserva</button>
                                            :
                                            <button className="btn btn-primary" onClick={() => mensagemAlert("Ainda não implementado")}>Entrar na lista de reserva</button>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <hr />
                        <GenreCarousel titulo={`Mais livros como esse`} livros={maisLivros} />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default BookPage;