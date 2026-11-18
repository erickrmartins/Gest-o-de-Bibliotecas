
import axios from "axios";
import { BASE_URL } from "../../config/axios";
import { mensagemErro } from "../../components/toastr";
const urlParametros = `${BASE_URL}/parametros/1`
const urlEmprestimos = `${BASE_URL}/emprestimos`

const encontrarAtraso = (emprestimos) => emprestimos.find((emprestimo) => emprestimo.status === "Atrasado");

const validarPerfil = async (perfil) => {
    const limiteEmprestimo = await axios.get(urlParametros)
        .then((response) => response.data.limiteEmprestimo).catch(() => mensagemErro("Erro ao se conectar ao servidor"));

    const emprestimos = await axios.get(urlEmprestimos)
        .then((response) => response.data.filter((emprestimo) => emprestimo.idPerfis === perfil.nome.split(" ")[0]));

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
            mensagemErro("O exemplar selecionado não está disponível");
            return false;
        } else {
            return true;
        }
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
    
    return true;
}