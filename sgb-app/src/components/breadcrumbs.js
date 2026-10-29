import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function Breadcrumbs() {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const crumbs = path.split("/");

    return (
        <nav className="container">
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