import Refresh from '@mui/icons-material/Cached';
import { mensagemAlert } from '../../../Toastr';
import { handleRenovacao } from '../../../../utils/emprestimo/handleRenovacao'
import { useEffect, useState } from 'react';

import { diferencaEmDias } from '../../../../utils/emprestimo/handleAtraso';

function EmprestimoCard({ emprestimo, exemplar, livro }) {
    const [renovado, setRenovado] = useState(false);

    function getQtdDias() {
        const qtdDias = diferencaEmDias(emprestimo.dtEta, Date.now())

        let resultado;

        if (qtdDias < 0) {
            resultado = (
                <span className={`span-danger px-1 curvatura`}>
                    {qtdDias * -1} dia(s) de atraso
                </span>
            )
        } else {
            if (qtdDias === 0) {
                resultado = (
                    <span className={`span-alert px-1 curvatura`}>
                        HOJE
                    </span>
                )
            } else {
                resultado = (<span className={`span-success px-1 curvatura`}>
                    Faltam {qtdDias} dia(s)
                </span>)
            }
        }

        return resultado;
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
                    {getQtdDias()}
                    <span className={`span-muted px-1 curvatura ${emprestimo.renovado || renovado ? undefined : "d-none"}`}>Já renovado</span>
                </div>
                <button className="btn btn-outline" onClick={() => handleClick()} disabled={emprestimo.renovado || renovado}><Refresh /> Renovar</button>
            </div>
        </div >
    );
}

export default EmprestimoCard;