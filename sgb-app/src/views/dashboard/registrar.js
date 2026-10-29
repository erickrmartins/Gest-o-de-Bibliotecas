import Card from '../../components/cards/card.js';
import SubCard from '../../components/cards/sub-card.js';
import DashboardCard from "../../components/dashboardCard/dashboardCard.js";

import PersonOutlined from '@mui/icons-material/PersonOutlined';
import BusinessOutlined from '@mui/icons-material/BusinessOutlined';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import AssignmentOutlined from '@mui/icons-material/AssignmentOutlined';
import GroupOutlined from '@mui/icons-material/GroupOutlined';
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import TuneOutlined from '@mui/icons-material/TuneOutlined';

const items = [
    { id: 1, imagem: <MenuBookOutlined fontSize="medium" />, titulo: "Livros", descricao: "Registrar Livros", url: "/cadastro-livros" },
    { id: 2, imagem: <Inventory2Outlined fontSize="medium" />, titulo: "Exemplares", descricao: "Registrar Exemplares", url: "/cadastro-exemplares" },
    { id: 3, imagem: <PersonOutlined fontSize="medium" />, titulo: "Autores", descricao: "Registrar Autores", url: "/cadastro-autores" },
    { id: 4, imagem: <BusinessOutlined fontSize="medium" />, titulo: "Editoras", descricao: "Registrar Editoras", url: "/cadastro-editoras" },
    { id: 5, imagem: <BookmarkBorderOutlined fontSize="medium" />, titulo: "Reservas", descricao: "Registrar Reservas", url: "/cadastro-reservas" },
    { id: 6, imagem: <AssignmentOutlined fontSize="medium" />, titulo: "Empréstimos", descricao: "Registrar Empréstimos", url: "/cadastro-emprestimos" },
    { id: 7, imagem: <GroupOutlined fontSize="medium" />, titulo: "Leitores", descricao: "Registrar Leitores", url: "/cadastro-leitores" },
    { id: 8, imagem: <BadgeOutlined fontSize="medium" />, titulo: "Funcionários", descricao: "Registrar Funcionários", url: "/cadastro-funcionarios" },
    { id: 9, imagem: <TuneOutlined fontSize="medium" />, titulo: "Parâmetros", descricao: "Registrar Parâmetros", url: "/cadastro-parametros" },
];

function Registrar() {
    return (
        <div className="container">
            <Card title="Registrar">
                <div className="row g-3 mb-4">
                    {items.map((item) => (
                        <div key={item.id} className="col-12 col-sm-12 col-md-6 col-lg-4">
                            <DashboardCard id={item.id} imagem={item.imagem} titulo={item.titulo} qtd="3" descricao={item.descricao} btnUrl={item.url} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default Registrar;