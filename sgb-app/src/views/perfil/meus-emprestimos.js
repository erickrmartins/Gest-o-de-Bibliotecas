import { useEffect, useState } from "react";
import ImagemTopo from "../../components/topo-imagem";

import axios from 'axios';
import { BASE_URL } from '../../config/axios';
import EmprestimoCarrossel from '../../components/layout/carrossel/emprestimo/emprestimo-carrossel'

const urlEmprestimos = `${BASE_URL}/emprestimos`;
const urlExemplares = `${BASE_URL}/exemplares`;
const urlLivros = `${BASE_URL}/livros`;

function MeusEmprestimos({ profile }) {
    const [emprestimos, setEmprestimos] = useState([]);
    const [exemplares, setExemplares] = useState([]);
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        if (profile) {
            axios.get(urlEmprestimos).then((response) => {
                const filtroPorPerfil = response.data.filter((emprestimo) => emprestimo.idPerfis === profile.nome.split(" ")[0]);
                const filtroPorStatus = filtroPorPerfil.filter((emprestimo) => emprestimo.status !== "Devolvido");
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
                {emprestimos.length > 0 ? 
                (
                    <EmprestimoCarrossel livros={livros} emprestimos={emprestimos} exemplares={exemplares} />
                ) : (
                    <span>Você não possui nenhum empréstimo ativo.</span>
                )

                }
            </div>
        </div>
    )
}

export default MeusEmprestimos;