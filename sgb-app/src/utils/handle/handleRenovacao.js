
import axios from "axios"
import { BASE_URL } from "../../config/axios"
import { mensagemErro } from "../../components/toastr";

const urlParametros = `${BASE_URL}/parametros`;
const urlReservas = `${BASE_URL}/reservas`;
const urlExemplares = `${BASE_URL}/exemplares`

const validarParametros = async (emprestimo) => {
    const parametros = await axios.get(urlParametros)
        .then((response) => response.data);

    const exemplar = await axios.get(urlExemplares)
        .then((response) => response.data.find((exemplar) => exemplar.identificacao === emprestimo.idExemplares));

    const reservado = await axios.get(urlReservas)
        .then((response) => response.data.find((reserva) => reserva.idLivros === exemplar.idLivros));

    if (parametros.permitirRenovacao) {
        if (reservado) {
            if (parametros.renovacaoComFila) {
                return true;
            } else {
                mensagemErro("O livro possui fila de espera, não é possível renovar.")
                return false;
            }
        } else {
            return true;
        }
    } else {
        mensagemErro("O sistema não permite a renovação de empréstimos.")
        return false;
    }
}

export const handleRenovacao = async (emprestimo) => {
    const valido = await validarParametros(emprestimo);

    if (valido) {
        return !emprestimo.renovado;
    } else {
        return false;
    }
}