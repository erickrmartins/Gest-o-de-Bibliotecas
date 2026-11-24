import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";

import axios from 'axios';
import { BASE_URL } from '../../config/axios';
import EmprestimoCarousel from '../../components/layout/carousel/emprestimo/EmprestimoCarousel'

const urlEmprestimos = `${BASE_URL}/emprestimos`;
const urlExemplares = `${BASE_URL}/exemplares`;
const urlLivros = `${BASE_URL}/livros`;

function MeusEmprestimos({ profile }) {
    const [emprestimos, setEmprestimos] = useState([]);
    const [exemplares, setExemplares] = useState([]);
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarDados() {
            if (!profile || !profile.nome) return;

            try {
                setCarregando(true);

                const resEmprestimos = await axios.get(urlEmprestimos);
                const resExemplares = await axios.get(urlExemplares);
                const resLivros = await axios.get(urlLivros);

                const filtroPorPerfil = resEmprestimos.data.filter((emprestimo) => emprestimo.idPerfis === profile.nome);
                const emprestimosAtivos = filtroPorPerfil.filter((emprestimo) => emprestimo.status !== "Devolvido");

                setEmprestimos(emprestimosAtivos);
                setExemplares(resExemplares.data);
                setLivros(resLivros.data);
            } catch (error) {
                console.error("Erro ao carregar dados dos empréstimos:", error);
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, [profile]);

    return carregando ? null : (
        <div>
            <PageHeader
                imagem="/background-emprestimos.jpg"
                titulo="Meus Empréstimos"
                subtitulo="Todos os livros que estão com você e as próximas datas de devolução."
            />
            <div className="container">
                {emprestimos.length > 0 ?
                    (
                        <EmprestimoCarousel livros={livros} emprestimos={emprestimos} exemplares={exemplares} />
                    ) : (
                        <span>Você não possui nenhum empréstimo ativo.</span>
                    )

                }
            </div>
        </div>
    )
}

export default MeusEmprestimos;