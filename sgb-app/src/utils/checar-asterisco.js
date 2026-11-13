
function ChecarAsterisco({ tentouSalvar, variavel }) {
    return (
        <span className={`text-danger fs-7 ${tentouSalvar ? (variavel ? "invisible" : "") : "invisible"}`}>
            Preencha esse campo
        </span>
    )

}

export default ChecarAsterisco;