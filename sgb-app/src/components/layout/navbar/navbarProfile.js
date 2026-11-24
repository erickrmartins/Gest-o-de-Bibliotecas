import { Link } from "react-router-dom";
import { logout } from "../../../utils/auth/Login";

function NavbarProfile({ profile }) {
    if (!profile) {
        return <Link className="curvatura btn btn-entrar" to="/login">ENTRAR</Link>;
    }

    return (
        <div className="dropdown">
            <button
                className="btn p-0 border-0 dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    className="rounded-circle"
                    src={`/profilePictures/${profile.img}`}
                    alt={profile.nome}
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/perfil">Meu perfil</Link></li>
                <li><Link className="dropdown-item" to="/perfil/emprestimos">Meus empréstimos</Link></li>
                <li><Link className="dropdown-item" to="/perfil/reservas">Minhas reservas</Link></li>
                <li><Link className="dropdown-item" to="/perfil/historico">Meu histórico</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                    <button
                        className="dropdown-item"
                        type="button"
                        onClick={async () => {
                            await logout();
                            window.location.href = "/";
                        }}
                    >
                        Sair
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default NavbarProfile;
