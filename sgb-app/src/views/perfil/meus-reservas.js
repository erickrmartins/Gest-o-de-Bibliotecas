import { useEffect, useState } from "react";
import ImagemTopo from "../../components/topo-imagem";

import axios from 'axios';
import { BASE_URL } from '../../config/axios';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SubCard from "../../components/ui/sub-card";

const urlReservas = `${BASE_URL}/reservas`;
const urlLivros = `${BASE_URL}/livros`;

function MeusReservas({ profile }) {
    const [reservas, setReservas] = useState([]);
    const [livros, setLivros] = useState([]);

    function getLivro(reserva) {
        const livro = livros.find((livro) => livro.nome === reserva.idLivros);

        if (livro) {
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
            );
        }

    }
    useEffect(() => {
        if (profile) {
            axios.get(urlReservas).then((response) => {
                const filtrado = response.data.filter((reserva) => reserva.idPerfis === profile.nome.split(" ")[0]);
                setReservas(filtrado);
            })
        }
    }, [profile])

    useEffect(() => {
        if (reservas) {
            axios.get(urlLivros).then((response) => {
                const livros = response.data;
                let livrosFiltrados = [];

                for (const reserva of reservas) {
                    for (const livro of livros) {
                        if (reserva.idLivros === livro.nome) {
                            livrosFiltrados.push(livro);
                        }
                    }
                }

                setLivros(livrosFiltrados);
            })
        }

    }, [reservas])

    return (
        <div>
            <ImagemTopo
                imagem="/background-emprestimos.jpg"
                titulo="Minhas reservas"
                subtitulo="Aguarde a sua vez para realizar a coleta."
            />
            <div className="container">
                <SubCard>
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>LIVRO</th>
                                <th>RESERVADO EM</th>
                                <th>SITUAÇÃO</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.length > 0 && livros.length > 0 ?
                                reservas.map((reserva) => (
                                    <tr className="" key={reserva.id}>
                                        <td>{getLivro(reserva)}</td>
                                        <td>{reserva.dtReserva}</td>
                                        <td>{reserva.primeiro ? "Próximo da fila" : "Na fila de espera"}</td>
                                        <td><button className="btn color-danger"><RemoveCircleIcon fontSize="small" /></button></td>
                                    </tr>
                                )) : "Você ainda não possui nenhuma reserva"}
                        </tbody>
                    </table>
                </SubCard>
            </div>
        </div>
    )
}

export default MeusReservas;