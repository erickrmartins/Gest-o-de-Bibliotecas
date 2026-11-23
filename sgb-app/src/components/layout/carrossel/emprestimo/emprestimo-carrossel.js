import EmprestimoCard from "./emprestimo-card";
import SubCard from "../../../ui/sub-card"

function EmprestimoCarrossel({ livros, exemplares, emprestimos }) {

    function getExemplar(emprestimo) {
        return exemplares.find((exemplar) => exemplar.identificacao === emprestimo.idExemplares);
    }

    function getLivro(exemplar) {
        return livros.find((livro) => livro.nome === exemplar.idLivros);
    }

    return (
        <div className="row">
            {emprestimos.length > 0 && emprestimos.map((emprestimo) => {
                const exemplar = getExemplar(emprestimo);
                if (!exemplar) {
                    return null;
                }
                const livro = getLivro(exemplar);
                if (!livro) {
                    return null;
                }

                return (
                    <div key={emprestimo.id} className="col-lg-6 col-md-12">
                        <SubCard>
                            <EmprestimoCard emprestimo={emprestimo} exemplar={exemplar} livro={livro} />
                        </SubCard>
                    </div>
                )
            })}
        </div>
    )

}

export default EmprestimoCarrossel;