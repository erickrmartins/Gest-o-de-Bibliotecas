import { Link } from "react-router-dom";

function NavbarProfile({ profile }) {
    if (!profile) {
        return null;
    }

    const isLeitor = "livrosLidos" in profile;

    const nome = profile.nome.split(" ");
    const nomeFormatado = nome[0] + " " + nome[nome.length - 1];

    function getRole() {
        let role;

        if (isLeitor) {
            role = "Leitor";
        }
        else {
            if (profile.isAdmin === true) {
                role = "Administrador";
            }
            else {
                role = "Bibliotecário";
            }
        }

        return role;
    }

    return (
        <div className="nav-item dropdown">
            <a
                className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <div className="d-flex align-items-center gap-2 p-1">
                    <img
                        className="rounded-circle object-fit-cover"
                        style={{ width: "40px", height: "40px" }}
                        src={`/profilePictures/${profile.cpf}.jpg`}
                        alt="Foto de Perfil"
                    />

                    <div className="d-flex flex-column justify-content-center text-nowrap">
                        <h5 className="fs-7 m-0">{nomeFormatado}</h5>
                        <span className="fs-8 m-0">
                            {getRole()}
                        </span>
                    </div>
                </div>
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <h5 className="m-0 dropdown-item fs-7 fw-bold">{profile.nome}</h5>
                    <span className="m-0 fs-8 dropdown-item">{getRole()}</span>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
                <li><Link className="dropdown-item" to="/emprestimos">Empréstimos</Link></li>
                <li><Link className="dropdown-item" to="/reservas">Reservas</Link></li>

                <li><hr className="dropdown-divider" /></li>

                <li>
                    <button className="dropdown-item" onClick={() => console.log("Sair")}>
                        Sair
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default NavbarProfile;