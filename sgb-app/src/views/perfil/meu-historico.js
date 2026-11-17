import { useEffect, useState } from "react";
import ImagemTopo from "../../components/topo-imagem";

import axios from 'axios';
import { BASE_URL } from '../../config/axios';
import SubCard from "../../components/ui/sub-card";
import { mensagemAlert } from "../../components/toastr";

const urlEmprestimos = `${BASE_URL}/emprestimos`;
const urlExemplares = `${BASE_URL}/exemplares`;
const urlLivros = `${BASE_URL}/livros`;

function MeuHistorico({ profile }) {
    const [emprestimos, setEmprestimos] = useState([]);
    const [exemplares, setExemplares] = useState([]);
    const [livros, setLivros] = useState([]);

    function getLivro(emprestimo) {
        const exemplar = exemplares.find((exemplar) => emprestimo.idExemplares === exemplar.identificacao);
        const livro = livros.find((livro) => livro.nome === exemplar.idLivros);

        return (
            <div className="d-flex align-items-center gap-4">
                <img
                    className="image-cover"
                    style={{ width: "50px" }}
                    src={`/covers/${livro.isbn}.jpg`}
                    alt={livro.nome} />
                <div>
                    <h4 className="fs-5 m-0">{livro.nome}</h4>
                    <p className="fs-7 m-0 text-muted">{livro.idAutores[0]}</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (profile) {
            axios.get(urlEmprestimos).then((response) => {
                const filtroPorPerfil = response.data.filter((emprestimo) => emprestimo.idPerfis === profile.nome.split(" ")[0]);
                const filtroPorStatus = filtroPorPerfil.filter((emprestimo) => emprestimo.status === "Devolvido");
                setEmprestimos(filtroPorStatus);
            })
        }
    }, [profile])

    useEffect(() => {
        if (emprestimos) {
            axios.get(urlExemplares).then((response) => {
                const dataExemplares = response.data;
                let exemplaresFiltrados = [];

                for (const exemplar of dataExemplares) {
                    for (const emprestimo of emprestimos) {
                        if (exemplar.identificacao === emprestimo.idExemplares) {
                            exemplaresFiltrados.push(exemplar);
                        }
                    }
                }

                setExemplares(exemplaresFiltrados);
            })
        }
    }, [emprestimos])

    useEffect(() => {
        if (exemplares) {
            axios.get(urlLivros).then((response) => {
                const livros = response.data;
                let livrosFiltrados = [];

                for (const exemplar of exemplares) {
                    for (const livro of livros) {
                        if (exemplar.idLivros === livro.nome) {
                            livrosFiltrados.push(livro);
                        }
                    }
                }

                setLivros(livrosFiltrados);
            })
        }

    }, [exemplares])

    return (
        <div>
            <ImagemTopo
                imagem="/background-emprestimos.jpg"
                titulo="Meus Empréstimos"
                subtitulo="Todos os livros que estão com você e as próximas datas de devolução."
            />
            <div className="container">
                <SubCard>
                    <table className="table table-bordered table-hover align-middle">
                        <thead>
                            <tr>
                                <th>LIVRO</th>
                                <th>DEVOLUÇÃO</th>
                                <th className="text-end">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emprestimos.length > 0 && livros.length > 0 ?
                                emprestimos.map((emprestimo) => (
                                    <tr className="" key={emprestimo.id}>
                                        <td>{getLivro(emprestimo)}</td>
                                        <td>{emprestimo.dtDevolucao}</td>
                                        <td className="text-end"><button className="btn btn-primary" onClick={() => mensagemAlert("Ainda não implementado")}>Reservar</button></td>
                                    </tr>
                                )) : "Você ainda não possui nenhuma reserva"}
                        </tbody>
                    </table>
                </SubCard>
            </div>
        </div>
    )
}

export default MeuHistorico;