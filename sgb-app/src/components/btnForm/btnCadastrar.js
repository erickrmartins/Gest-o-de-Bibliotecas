import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function BtnCadastrar() {
    const navigate = useNavigate();

    return (
        <div className='col-lg-2 col-6'>
            <button
                type="button"
                className="w-100 h-100 btn btn-primary d-flex justify-content-center align-items-center"
                onClick={() => navigate("cadastrar")}
            >
                <Add/>
                <span className='d-none d-lg-inline'>Novo</span>
            </button>
        </div>
    )
}

export default BtnCadastrar;