import Refresh from '@mui/icons-material/Cached';
import { mensagemAlert } from '../../../toastr';

function EmprestimoCard({ emprestimo, exemplar, livro }) {

    function getQtdDias() {
        return "x";
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
                    <span className={`span-muted px-1 curvatura ${emprestimo.renovado ? undefined : "d-none"}`}>Já renovado</span>
                </div>
                <button className="btn btn-outline" onClick={() => mensagemAlert("Ainda não implementado")} disabled={emprestimo.renovado}><Refresh /> Renovar</button>
            </div>
        </div>
    )
}

export default EmprestimoCard;