
import axios from "axios";
import { BASE_URL, urlReservas } from "../../config/axios";
import { mensagemErro } from "../../components/Toastr";
const urlParametros = `${BASE_URL}/parametros/1`
const urlEmprestimos = `${BASE_URL}/emprestimos`

const encontrarAtraso = (emprestimos) => emprestimos.find((emprestimo) => emprestimo.status === "Atrasado");

const validarPerfil = async (perfil) => {
    const limiteEmprestimo = await axios.get(urlParametros)
        .then((response) => response.data.limiteEmprestimo).catch(() => {
            mensagemErro("Erro ao se conectar ao servidor");
            return false;
        });

    const emprestimos = await axios.get(urlEmprestimos)
        .then((response) => response.data.filter((emprestimo) => emprestimo.idPerfis === perfil.nome && emprestimo.ativo === true));

    if (!perfil.ativo) {
        mensagemErro("O perfil selecionado não está ativo");
        return false;
    } else {
        if (encontrarAtraso(emprestimos)) {
            mensagemErro("O perfil selecionado possui um ou mais empréstimos atrasados.");
            return false;
        } else {
            if (emprestimos.length >= Number(limiteEmprestimo)) {
                mensagemErro("O perfil selecionado atingiu o limite de empréstimos simultâneos.");
                return false;
            } else {
                return true;
            }
        }
    }
}

const validarExemplar = async (exemplar) => {
    if (!exemplar.ativo) {
        mensagemErro("O exemplar selecionado não está ativo.");
        return false;
    } else {
        if (exemplar.status != "Disponível") {
            if (exemplar.status === "Reservado") {
                const reserva = await axios.get(urlReservas).then((response) => {
                    const reservas = response.data;
                    const filtrarPorLivro = reservas.filter((reserva) => reserva.idLivros === exemplar.idLivros);
                    return filtrarPorLivro.find((reserva) => Number(reserva.posicao) === 1);
                })
                return reserva.idPerfis;
            } else {
                mensagemErro("O exemplar selecionado não está disponível");
                return false;
            }
        }
        return true;
    }
}

export const handleEmprestimo = async (perfil, exemplar) => {
    const perfilValido = await validarPerfil(perfil);
    if (!perfilValido) {
        return false;
    }

    const exemplarValido = await validarExemplar(exemplar);
    if (!exemplarValido) {
        return false;
    }

    if (exemplarValido === true) {
        return true;
    }

    if (!(exemplarValido === perfil.nome)) {
        return false;
    }

    return true;
}