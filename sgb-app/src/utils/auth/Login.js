import axios from "axios"
import { BASE_URL } from "../../config/axios"

const baseUrl = `${BASE_URL}/usuarioLogado/1`

export const login = async (profile) => {
    if (!profile) {
        await axios.put(baseUrl, {
            id: 1,
            isFuncionario: false,
            idUsuario: null
        });
        return;
    }

    const isFuncionario = "isAdmin" in profile;

    let data = {
        id: 1,
        isFuncionario,
        idUsuario: profile.id
    };

    await axios.put(baseUrl, data);
}

export const getLogin = async () => {
    const response = await axios.get(baseUrl);
    const usuarioLogado = response.data;

    if (!usuarioLogado || !usuarioLogado.idUsuario) {
        return null;
    }

    const endpoint = usuarioLogado.isFuncionario ? "funcionarios" : "leitores";
    const perfilResponse = await axios.get(`${BASE_URL}/${endpoint}/${usuarioLogado.idUsuario}`);

    return perfilResponse.data;
};

export const isFuncionario = (profile) => {
    if (!profile) {
        return false;
    }

    return "isAdmin" in profile;
}

export const isAdmin = (profile) => {
    if (!profile) {
        return false;
    };

    return Boolean(profile.isAdmin);
}

export const logout = async () => {
    await axios.put(baseUrl, {
        id: 1,
        isFuncionario: false,
        idUsuario: null
    });
    return;
}

export const getRole = (profile) => {
    if (!isFuncionario(profile)) {
        return "Leitor";
    }
    else {
        if (isAdmin(profile)) {
            return "Administrador";
        }
        else {
            return "Bibliotecário";
        }
    }
}