
import axios from "axios"
import { BASE_URL } from "../../config/axios"
import { mensagemAlert, mensagemErro, mensagemSucesso } from "../../components/toastr";

const urlParametros = `${BASE_URL}/parametros/1`;
const urlReservas = `${BASE_URL}/reservas`;
const urlExemplares = `${BASE_URL}/exemplares`
const urlEmprestimos = `${BASE_URL}/emprestimos`

const validarParametros = async (emprestimo, parametros) => {
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
    const parametros = await axios.get(urlParametros)
        .then((response) => response.data);

    const valido = await validarParametros(emprestimo, parametros);

    if (valido) {
        if (emprestimo.renovado) {
            return false;
        } else {
            await renovar(emprestimo, parametros);
            return true;
        }
    } else {
        return false;
    }
}

const renovar = async (emprestimo, parametros) => {
    const renovado = true;
    const calcularEta = () => {
        const data = new Date(emprestimo.dtEta);
        data.setDate(data.getDate() + Number(parametros.diasRenovacao));
        return data.toLocaleDateString('en-CA');
    }
    const dtEta = calcularEta();

    await axios.patch(`${urlEmprestimos}/${emprestimo.id}`, { renovado, dtEta })
        .then((response) => mensagemSucesso("Empréstimo renovado com sucesso."))
        .catch(() => mensagemAlert("Não foi possível renovar o empréstimo, tente novamente mais tarde."))
}