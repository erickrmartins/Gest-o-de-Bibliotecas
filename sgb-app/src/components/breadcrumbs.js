import { useNavigate } from "react-router-dom";

function Breadcrumbs() {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const crumbs = path.split("/");
    console.log(crumbs);

    return (
        <nav className="container" style={{"--bs-breadcrumb-divider": "'>'"}}>
            <ol className="breadcrumb">
                {crumbs.map((crumb, index, array) => {
                    const ultimo = index === array.length - 1;

                    return index === 0 ? null : (
                        <li key={index} className={`breadcrumb-item ${ultimo ? "active" : ""}`} >
                            {ultimo ? crumb.toUpperCase().replace("-", " ") : 
                            <a href={array.slice(0, index + 1).join("/")}>{crumb.toUpperCase().replace("-", " ")}</a>}
                        </li>
                    );
                })}
            </ol >
        </nav >
    )

}

export default Breadcrumbs;