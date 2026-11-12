import { useNavigate, useLocation } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


function Breadcrumbs() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const crumbs = path.split("/");
    const show = path === '/login' || path === '/cadastrar' || path === '/' || path === "/acervo";

    return show ? null : (
        <nav className="container mt-3">
            <ol className="breadcrumb align-items-center">
                {crumbs.map((crumb, index, array) => {
                    const ultimo = index === array.length - 1;

                    return index === 0 ?
                        (
                            <li key={index} className={`breadcrumb-item ${ultimo ? "active" : ""}`} >
                                {ultimo ? crumb.toUpperCase().replace("-", " ") :
                                    <a className="breadcrumbA" href="/"><HomeOutlinedIcon /></a>}
                            </li>
                        )
                        :
                        (
                            <li key={index} className={`breadcrumb-item ${ultimo ? "active" : ""}`} >
                                {ultimo ? crumb.toUpperCase().replace("-", " ") :
                                    <a className="breadcrumbA" href={array.slice(0, index + 1).join("/")}>{crumb.toUpperCase().replace("-", " ")}</a>}
                            </li>
                        );
                })}
            </ol >
        </nav >
    )

}

export default Breadcrumbs;