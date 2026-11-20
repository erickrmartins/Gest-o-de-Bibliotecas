import axios from "axios";
import { urlReservas } from "../../config/axios";

export const ordenarReservas = async (livro) => {
    const reservas = await axios.get(urlReservas).then((response) => response.data);
    const reservasFiltradas = reservas.filter((reserva) => reserva.idLivros === livro.nome);

    const dataReservas = reservasFiltradas.map((reserva) => reserva.dtReserva);

    const reservasOrdenadas = dataReservas.sort((a, b) => a.localeCompare(b));

    const idsAtualizados = new Set();

    for (let i = 0; i < reservasOrdenadas.length; i++) {
        for (const reserva of reservasFiltradas) {
            if (reservasOrdenadas[i] === reserva.dtReserva && !idsAtualizados.has(reserva.id)) {
                await axios.patch(`${urlReservas}/${reserva.id}`, {posicao: i + 1});
                idsAtualizados.add(reserva.id);
                break;
            }
        }
    }
}