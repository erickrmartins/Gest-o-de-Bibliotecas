import useState from "react";

export const search = (pesquisa, dados) => {
    const resultados = [];

    for (const dado of dados) {
        if (dado.nome.toLowerCase().includes(pesquisa.toLowerCase())) {
            resultados.push(dado);
        }
    }

    return resultados;
};