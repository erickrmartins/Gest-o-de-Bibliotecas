import { useEffect, useState } from "react";
import ImagemTopo from "../../components/topo-imagem";

import axios from 'axios';
import { BASE_URL } from '../../config/axios';
import SubCard from "../../components/ui/sub-card";
import { mensagemAlert, mensagemErro, mensagemSucesso } from "../../components/toastr";

const urlEmprestimos = `${BASE_URL}/emprestimos`;
const urlExemplares = `${BASE_URL}/exemplares`;
const urlLivros = `${BASE_URL}/livros`;
const urlReservas = `${BASE_URL}/reservas`;

function MeuHistorico({ profile }) {
    const [emprestimos, setEmprestimos] = useState([]);
    const [exemplares, setExemplares] = useState([]);
    const [livros, setLivros] = useState([]);

    function getLivroNome(emprestimo) {
        const exemplar = exemplares.find((exemplar) => emprestimo.idExemplares === exemplar.identificacao);
        const livro = livros.find((livro) => livro.nome === exemplar.idLivros);

        return livro.nome;
    }

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

    async function reservar(livro) {
        const data = new Date();
        const dtReserva = data.toLocaleDateString("en-CA")
        const idPerfis = profile.nome.split(" ")[0];
        const idLivros = livro;

        const jaReservou = await axios.get(urlReservas).then((response) => {
            const resposta = response.data;
            const filtrar = resposta.find((reserva) => idPerfis === reserva.idPerfis && idLivros === reserva.idLivros);
            if (filtrar) {
                return true;
            } else {
                return false;
            }
        })

        if (!jaReservou) {
            axios.post(urlReservas, { dtReserva, idLivros, idPerfis })
                .then((response) => mensagemSucesso("Reserva realizada com sucesso."))
                .catch(() => mensagemErro("Não foi possível realizar a reserva."));

        } else {
            mensagemAlert("Você já reservou esse livro");
        }

    }

    useEffect(() => {
        if (profile) {
            axios.get(urlEmprestimos).then((response) => {
                const filtroPorPerfil = response.data.filter((emprestimo) => emprestimo.idPerfis === profile.nome);
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
                titulo="Meus Histórico"
                subtitulo="Todo o seu histórico de empréstimo na nossa biblioteca."
            />
            <div className="container">
                <SubCard>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
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
                                        <tr key={emprestimo.id}>
                                            <td>{getLivro(emprestimo)}</td>
                                            <td>{emprestimo.dtDevolucao}</td>
                                            <td className="text-end"><button className="btn btn-primary" onClick={() => reservar(getLivroNome(emprestimo))}>Reservar</button></td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan='3'>Você ainda não possui nenhuma reserva</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </SubCard>
            </div>
        </div>
    )
}

export default MeuHistorico;