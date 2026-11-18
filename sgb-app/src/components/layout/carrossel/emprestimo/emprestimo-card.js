import Refresh from '@mui/icons-material/Cached';
import { mensagemAlert } from '../../../toastr';
import { handleRenovacao } from '../../../../utils/handle/handleRenovacao'
import { useEffect, useState } from 'react';

import axios from 'axios';
import { BASE_URL } from '../../../../config/axios';
const baseUrl = `${BASE_URL}/emprestimos`


function EmprestimoCard({ emprestimo, exemplar, livro }) {
    const [renovado, setRenovado] = useState(false);

    function getQtdDias() {
        return "x";
    }

    async function handleClick() {
        const renovar = await handleRenovacao(emprestimo);

        if (renovar) {
            setRenovado(true);
        }
    }

    return (
        <div className="d-flex justify-content-start align-items-center gap-4">
            <img
                src={`/covers/${livro.isbn}.jpg`}
                alt={`Capa de ${livro.nome}`}
                className={`curvatura image-cover w-25`}
            />

            <div className={`d-flex flex-column align-items-start mt-2 gap-2`}>
                <div>
                    <h1 className="ms-0 fs-3 mb-0 text-truncate w-100">{livro.nome}</h1>
                    <p className="ms-0 text-muted fs-7 text-truncate w-100">{livro.idAutores[0]} - {exemplar.identificacao}</p>
                </div>
                <div className='d-flex gap-4'>
                    <div>
                        <label>Retirado</label>
                        <p>{emprestimo.dtEmprestimo}</p>
                    </div>
                    <div>
                        <label>Devolver até</label>
                        <p>{emprestimo.dtEta}</p>
                    </div>
                </div>

                <div className='d-flex gap-4'>
                    <span className={`${getQtdDias() < 3 ? "span-alert" : "span-success"} px-1 curvatura`}>Faltam {getQtdDias()} dia(s)</span>
                    <span className={`span-muted px-1 curvatura ${emprestimo.renovado || renovado ? undefined : "d-none"}`}>Já renovado</span>
                </div>
                <button className="btn btn-outline" onClick={() => handleClick()} disabled={emprestimo.renovado || renovado}><Refresh /> Renovar</button>
            </div>
        </div>
    );
}

export default EmprestimoCard;