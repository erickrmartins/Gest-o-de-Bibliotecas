import axios from "axios";
import { urlExemplares, urlReservas } from "../../config/axios";
import { urlLivros } from "../../config/axios";
import { mensagemAlert, mensagemErro, mensagemServidorFalhou, mensagemSucesso } from "../../components/toastr"

const liberarExemplar = async (livro, exemplar) => {
    try {
        const reservas = await axios.get(urlReservas).then((response) => {
            const reservas = response.data;
            return reservas.filter((reserva) => exemplar.idLivros === livro.nome);
        });

        if (reservas.length === 0) {
            const disponibilizar = await axios.patch(`${urlExemplares}/${exemplar.id}`, { status: "Disponível" });
            mensagemSucesso("Livro disponibilizado para reserva.");
            return true;
        }

        const primeiro = reservas.find((reserva) => Number(reserva.posicao) === 1);

        const dtDisponibilizado = new Date().toLocaleDateString("en-CA");
        await axios.patch(`${urlReservas}/${primeiro.id}`, { status: "Aguardando retirada", dtDisponibilizado });
        await axios.patch(`${urlExemplares}/${exemplar.id}`, { status: "Reservado" });
        mensagemSucesso("Exemplar reservado para o primeiro da fila");
        return true;
    }
    catch (error) {
        mensagemServidorFalhou();
        return false;
    };
}

export const handleDevolucao = async (livro, exemplar) => {

    const liberar = await liberarExemplar(livro, exemplar);
    return liberar

}