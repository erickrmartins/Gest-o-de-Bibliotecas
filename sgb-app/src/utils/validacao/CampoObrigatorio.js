
function CampoObrigatorio({ tentouSalvar, variavel }) {
    return (
        <span className={`text-danger m-0 p-0 fs-8 ${tentouSalvar ? (variavel ? "invisible" : "") : "invisible"}`}>
            Preencha esse campo
        </span>
    )

}

export default CampoObrigatorio;