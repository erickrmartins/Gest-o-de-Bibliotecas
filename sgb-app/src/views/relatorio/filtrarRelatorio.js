import axios from "axios";
import { urlEmprestimos, urlExemplares, urlLivros, urlReservas } from "../../config/axios";

import { mensagemAlert, mensagemErro, mensagemServidorFalhou, mensagemSucesso } from "../../components/toastr"

const filtroEmprestimo = async (status, inicio, fim) => {
    try {
        const response = await axios.get(urlEmprestimos);
        let dados = response.data;

        if (status) {
            dados = dados.filter((dado) => dado.status.toLowerCase() === status.toLowerCase());
        }

        if (inicio) {
            dados = dados.filter((dado) => dado.dtEmprestimo >= inicio);
        }

        if (fim) {
            dados = dados.filter((dado) => dado.dtEmprestimo <= fim);
        }
        return dados;
    } catch (error) {
        mensagemErro("Não foi possível filtrar dado");
        return [];
    }
}

const filtroExemplar = async (status, livro) => {
    try {
        const response = await axios.get(urlExemplares);
        let dados = response.data;

        if (status) {
            dados = dados.filter((dado) => dado.status === status);
        }

        if (livro) {
            dados = dados.filter((dado) => dado.idLivros.toLowerCase() === livro.toLowerCase());
        }
        return dados;
    } catch (error) {
        mensagemErro("Não foi possível filtrar dado");
        return [];
    }
}

const filtroReserva = async (status, inicio, fim) => {
    try {
        const response = await axios.get(urlReservas);
        let dados = response.data;

        if (status) {
            dados = dados.filter((dado) => dado.status.toLowerCase() === status.toLowerCase());
        }

        if (inicio) {
            dados = dados.filter((dado) => dado.dtReserva >= inicio);
        }

        if (fim) {
            dados = dados.filter((dado) => dado.dtReserva <= fim);
        }
        return dados;
    } catch (error) {
        mensagemErro("Não foi possível filtrar dado");
        return [];
    }
}

const filtroLivro = async (recomendado) => {
    try {
        const response = await axios.get(urlLivros);
        let dados = response.data;

        if (recomendado) {
            dados = dados.filter((dado) => dado.recomendado);
        }
        return dados;
    } catch (error) {
        mensagemErro("Não foi possível filtrar dado");
        return [];
    }
}

export const filtrarRelatorio = async (tipo, status, inicio, fim, recomendado, livro) => {
    let dados;

    switch (tipo) {
        case "emprestimo":
            dados = await filtroEmprestimo(status, inicio, fim);
            break;
        case "reserva":
            dados = await filtroReserva(status, inicio, fim);
            break;
        case "exemplar":
            dados = await filtroExemplar(status, livro);
            break;
        case "livro":
            dados = await filtroLivro(recomendado);
            break;
        default:
            dados = [];
    }
    return dados;

}