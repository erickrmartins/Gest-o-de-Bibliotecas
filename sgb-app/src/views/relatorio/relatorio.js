import { useSearchParams } from "react-router-dom";
import Tabela from "./tabelas";
import "./relatorio.css";

import { filtrarRelatorio } from "./filtrarRelatorio";
import { useEffect, useState } from "react";

function Relatorio({ profile }) {

    const [params] = useSearchParams();

    const tipo = params.get("tipo");
    const status = params.get("status");
    const inicio = params.get("inicio");
    const fim = params.get("fim");
    const livro = params.get("livro");
    const recomendado = params.get("recomendado");


    const [dados, setDados] = useState(null);

    async function filtrar() {
        const filtrado = await filtrarRelatorio(tipo, status, inicio, fim, recomendado, livro);
        setDados(filtrado);
    }

    useEffect(() => {
        filtrar();
    }, [tipo, status, inicio, fim, livro, recomendado]);

    return (
        <div className="relatorio text-center">
            <h1>SGB</h1>

            <h2>Relatório de {tipo}</h2>
            <div className="d-flex justify-content-center align-items-center text-center gap-4">
                <div className="d-flex gap-2">
                    <label>Gerado por: </label>
                    <p className="fw-semibold">{profile.nome}</p>
                </div>
                <div className="d-flex gap-2">
                    <label>Data de geração: </label>
                    <p className="fw-semibold">{new Date().toLocaleDateString("pt-BR")}</p>
                </div>
            </div>
            <hr />
            <Tabela tipo={tipo} dados={dados} />
            <button className="btn btn-primary mb-4" onClick={() => window.print()}>Imprimir</button>
        </div>
    );
}

export default Relatorio;
