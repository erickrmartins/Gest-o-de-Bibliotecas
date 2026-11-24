import axios from "axios"
import { BASE_URL, urlEmprestimos } from "../../config/axios"
import { mensagemAlert, mensagemServidorFalhou, mensagemSucesso } from "../../components/Toastr"
import { ordenarReservas } from "./ordenarReservas"
const urlExemplares = `${BASE_URL}/exemplares`
const urlReservas = `${BASE_URL}/reservas`

const verificarExemplares = async (livro) => {
    try {
        const resExemplares = await axios.get(urlExemplares);
        const exemplares = resExemplares.data
        const filtrarPorLivro = exemplares.filter((exemplar) => exemplar.idLivros === livro.nome);

        const exemplarDisponivel = filtrarPorLivro.find((exemplar) => exemplar.status === "Disponível");
        return exemplarDisponivel;
    } catch (error) {
        mensagemServidorFalhou();
        return null;
    }
}

const verificarPerfil = async (perfil, livro) => {
    const reservas = await axios.get(urlReservas).then((response) => {
        const resReservas = response.data;
        const filtrarPorPerfil = resReservas.filter((reserva) => reserva.idPerfis === perfil.nome);

        if (filtrarPorPerfil.length > 0) {
            const filtrarPorLivro = filtrarPorPerfil.find((reserva) => reserva.idLivros === livro.nome);

            if (filtrarPorLivro) {
                mensagemAlert("Você já reservou esse livro.");
                return false
            }
        }
        return true;
    }).catch(() => {
        mensagemServidorFalhou();
        return false;
    });

    const emprestimos = await axios.get(urlEmprestimos).then((response) => {
        const resEmprestimos = response.data;
        const filtrarEmprestimos = resEmprestimos.filter((emprestimo) => emprestimo.idPerfis === perfil.nome);
        const encontrarAtraso = filtrarEmprestimos.find((emprestimo) => emprestimo.status === "Atrasado");

        if (encontrarAtraso) {
            mensagemAlert("Você possui um empréstimo atrasado, não é possível realizar novas reservas.");
            return false;
        }
        return true;
    }).catch(() => {
        mensagemServidorFalhou();
        return false;
    });

    return reservas && emprestimos;
}

const converterDados = (perfil, livro, status) => {
    const dtReserva = new Date().toLocaleDateString("en-CA");
    const idLivros = livro.nome;
    const idPerfis = perfil.nome;

    const data = {
        dtReserva,
        idLivros,
        idPerfis,
        status
    }

    return data;
}

export const handleReserva = async (perfil, livro) => {

    const validarPerfil = await verificarPerfil(perfil, livro);

    if (!validarPerfil) {
        return false;
    }

    const encontrarExemplar = await verificarExemplares(livro);

    if (!encontrarExemplar) {
        await entrarListaEspera(converterDados(perfil, livro, "Na fila de espera"));
        await ordenarReservas(livro);
        return true;
    } else {
        await reservar(converterDados(perfil, livro, "Disponível"), encontrarExemplar);
        await ordenarReservas(livro);
        return true;
    }
}

const entrarListaEspera = async (dados) => {
    await axios.post(urlReservas, dados).then(() => mensagemSucesso("Você entrou na fila de espera."));
}

const reservar = async (dados, exemplar) => {
    await axios.post(urlReservas, dados).then(() => mensagemSucesso("Você reservou um exemplar."));

    const status = "Reservado";

    await axios.patch(`${urlExemplares}/${exemplar.id}`, { status });
}