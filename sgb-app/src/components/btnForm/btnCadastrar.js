import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function BtnCadastrar({ btnText }) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="btn btn-primary extraP d-flex align-items-center justify-content-center fw-semibold curvatura shadow-sm"
            onClick={() => navigate("cadastrar")}
        >
            <Add />{btnText}
        </button>
    )
}

export default BtnCadastrar;