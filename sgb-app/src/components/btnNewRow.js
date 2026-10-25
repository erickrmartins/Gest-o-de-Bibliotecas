import Add from '@mui/icons-material/Add';

function BtnNewRow({ btnText, btnAoClicar }) {

    return (
        <button
            type="button"
            className="btn btn-primary extraP d-flex align-items-center justify-content-center fw-semibold"
            onClick={btnAoClicar}
        >
            <Add />{btnText}
        </button>
    )
}

export default BtnNewRow;