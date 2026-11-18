import useState from "react";

export const search = (pesquisa, dados, busca) => {
    const resultados = [];

    for (const dado of dados) {
        switch (busca) {
            case "titulo":
                if (dado.nome.toLowerCase().includes(pesquisa.toLowerCase())) {
                    resultados.push(dado);
                };
                break;
            case "autor":
                if (dado.idAutores[0].toLowerCase().includes(pesquisa.toLowerCase())) {
                    resultados.push(dado);
                };
                break;
            case "isbn":
                if (dado.isbn.includes(pesquisa)) {
                    resultados.push(dado);
                };
                break;
        }
    }

    return resultados;
};