import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlLivros } from "../../config/axios";
import PrintIcon from '@mui/icons-material/Print';

function BtnRelatorio({ tipo }) {
    const [abrir, setAbrir] = useState(false);
    const navigate = useNavigate();

    const [status, setStatus] = useState('');
    const [inicio, setInicio] = useState('');
    const [fim, setFim] = useState('');
    const [livro, setLivro] = useState('');

    const [livros, setLivros] = useState([]);


    const gerarUrl = () => {
        let url = "/relatorio?tipo=" + tipo;

        if (status) {
            url = url + "&status=" + status;
        }
        if (inicio) {
            url = url + "&inicio=" + inicio;
        }
        if (fim) {
            url = url + "&fim=" + fim;
        }
        if (livro) {
            url = url + "&livro=" + livro;
        }

        return url;
    }

    function filtrosEmprestimo() {
        return (
            <form>
                <div>
                    <label>Situação</label>
                    <select
                        className="form-select"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value=''>Todos</option>
                        <option value='atrasado'>Atrasado</option>
                        <option value='perdido'>Perdido</option>
                        <option value='devolvido'>Devolvido</option>
                        <option value='ativo'>Ativo</option>
                    </select>
                </div>
                <div>
                    <label>Período</label>
                    <div className="d-flex align-items-center justify-content-center text-center gap-3">
                        <input
                            className="form-control"
                            type="date"
                            value={inicio}
                            onChange={(e) => setInicio(e.target.value)}
                            placeholder="Data inicial"
                        />
                        <input
                            className="form-control"
                            type="date"
                            value={fim}
                            onChange={(e) => setFim(e.target.value)}
                            placeholder="Data inicial"
                        />
                    </div>
                </div>
            </form>
        )
    }

    function filtrosReserva() {
        return (
            <form>
                <div>
                    <label>Situação</label>
                    <select
                        className="form-select"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value=''>Todos</option>
                        <option value='Aguardando retirada'>Aguardando retirada</option>
                        <option value='Na fila de espera'>Na fila de espera</option>
                    </select>
                </div>
                <div>
                    <label>Período</label>
                    <div className="d-flex align-items-center justify-content-center text-center gap-3">
                        <input
                            className="form-control"
                            type="date"
                            value={inicio}
                            onChange={(e) => setInicio(e.target.value)}
                            placeholder="Data inicial"
                        />
                        <input
                            className="form-control"
                            type="date"
                            value={fim}
                            onChange={(e) => setFim(e.target.value)}
                            placeholder="Data inicial"
                        />
                    </div>
                </div>
            </form>
        )
    }

    function filtrosExemplar() {
        return (
            <form>
                <div>
                    <label>Situação</label>
                    <select
                        className="form-select"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value=''>Todos</option>
                        <option value='Em Manutenção'>Em Manutenção</option>
                        <option value='Reservado'>Reservado</option>
                        <option value='Emprestado'>Emprestado</option>
                        <option value='Perdido'>Perdido</option>
                        <option value='Disponível'>Disponível</option>
                    </select>
                </div>
                <div>
                    <label>Livro</label>
                    <select
                        className="form-select"
                        onChange={(e) => setLivro(e.target.value)}
                    >
                        <option value=''>Todos</option>
                        {livros.map((livro) => (
                            <option key={livro.id} value={livro.nome}>
                                {livro.nome}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        )
    }

    function chamarFiltros() {
        switch (tipo) {
            case "emprestimo":
                return filtrosEmprestimo();
            case "reserva":
                return filtrosReserva();
            case "exemplar":
                return filtrosExemplar();
            default:
                return null;
        }
    }

    async function buscar() {
        if (tipo === "exemplar") {
            await axios.get(urlLivros).then((response) => setLivros(response.data));
        }
    }

    useEffect(() => {
        buscar();
    }, [tipo])

    return (
        <div className="col-lg-2 col-6 ms-lg-auto">
            <Dialog open={abrir} onClose={() => setAbrir(false)}>
                <div className="p-3 curvatura d-flex flex-column justify-content-center align-items-center">
                    <DialogTitle>Gerar Relatório</DialogTitle>
                    <DialogContent>Selecione os filtros para gerar o relatório.</DialogContent>
                    <DialogActions className="d-flex flex-column gap-2">
                        {chamarFiltros()}
                        <div className="d-flex gap-3 mt-4">
                            <button className="btn btn-primary" onClick={() => navigate(gerarUrl())}>Gerar Relatório</button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
            <button
                className="w-100 h-100 btn btn-outline d-flex gap-2 align-items-center justify-content-center"
                onClick={() => setAbrir(true)}
            ><PrintIcon />
            <span className="d-none d-lg-inline">Relatório</span></button>
        </div>
    )
}

export default BtnRelatorio;