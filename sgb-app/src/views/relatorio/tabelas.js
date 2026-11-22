import True from '@mui/icons-material/CheckCircleOutlineOutlined';
import False from '@mui/icons-material/RadioButtonUncheckedOutlined';

function tabelaEmprestimo(dados) {
    return (
        <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th scope="col">Exemplar</th>
                    <th scope="col">Perfil</th>
                    <th scope="col">Empréstimo</th>
                    <th scope="col">ETA</th>
                    <th scope="col">Devolução</th>
                </tr>
            </thead>
            <tbody>
                {dados && dados.length > 0 ?
                    dados.map((item) => (
                        <tr key={item.id}>
                            <td>{item.idExemplares}</td>
                            <td>{item.idPerfis}</td>
                            <td>{item.dtEmprestimo}</td>
                            <td>{item.dtEta}</td>
                            <td>{item.dtDevolucao}</td>
                        </tr>
                    )) :
                    (
                        <tr>
                            <td>
                                Nenhum dado foi encontrado.
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

function tabelaReserva(dados) {
    return (
        <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th scope="col">Data da Reserva</th>
                    <th scope="col">Posição</th>
                    <th scope="col">Livro</th>
                    <th scope="col">Perfil</th>
                </tr>
            </thead>
            <tbody>
                {dados && dados.length > 0 ?
                    dados.map((item) => (
                        <tr key={item.id}>
                            <td>{item.dtReserva}</td>
                            <td>{item.posicao}</td>
                            <td>{item.idLivros}</td>
                            <td>{item.idPerfis}</td>
                        </tr>
                    )) :
                    (
                        <tr>
                            <td>
                                Nenhum dado foi encontrado.
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

function tabelaExemplar(dados) {
    return (
        <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th scope="col">Livro</th>
                    <th scope="col">Identificação</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {dados && dados.length > 0 ?
                    dados.map((item) => (
                        <tr key={item.id}>
                            <td>{item.identificacao}</td>
                            <td>{item.idLivros}</td>
                            <td>{item.status}</td>
                        </tr>
                    )) :
                    (
                        <tr>
                            <td>
                                Nenhum dado foi encontrado.
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

function tabelaLivro(dados) {
    return (
        <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Editora</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Genero</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Pág.</th>
                    <th scope="col">Rec.</th>
                </tr>
            </thead>
            <tbody>
                {dados && dados.length > 0 ?
                    dados.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.idAutores.length > 1 ? `${item.idAutores[0]} + ${item.idAutores.length - 1}` : item.idAutores}</td>
                            <td>{item.idEditoras}</td>
                            <td>{item.isbn}</td>
                            <td>{item.idGeneros}</td>
                            <td>{item.dtPublicacao}</td>
                            <td>{item.numPaginas}</td>
                            <td>{item.recomendado ? <True /> : <False />}</td>
                        </tr>
                    )) :
                    (
                        <tr>
                            <td>
                                Nenhum dado foi encontrado.
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

function Tabela({ tipo, dados }) {
    switch (tipo) {
        case "emprestimo":
            return tabelaEmprestimo(dados);
        case "reserva":
            return tabelaReserva(dados);
        case "livro":
            return tabelaLivro(dados);
        case "exemplar":
            return tabelaExemplar(dados);
    }
}

export default Tabela;