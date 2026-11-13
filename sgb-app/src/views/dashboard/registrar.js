import Card from '../../components/ui/card.js';
import SubCard from '../../components/ui/sub-card.js';
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
import PlusOne from '@mui/icons-material/PlusOneOutlined';

const items = [
    { id: 1, imagem: <MenuBookOutlined fontSize="medium" />, titulo: "Livros", descricao: "Adicionar Livro", url: "/livros/cadastrar" },
    { id: 2, imagem: <Inventory2Outlined fontSize="medium" />, titulo: "Exemplares", descricao: "Adicionar Exemplar", url: "/exemplares/cadastrar" },
    { id: 3, imagem: <PersonOutlined fontSize="medium" />, titulo: "Autores", descricao: "Adicionar Autor", url: "/autores/cadastrar" },
    { id: 4, imagem: <BusinessOutlined fontSize="medium" />, titulo: "Editoras", descricao: "Adicionar Editora", url: "/editoras/cadastrar" },
    { id: 5, imagem: <BookmarkBorderOutlined fontSize="medium" />, titulo: "Reservas", descricao: "Adicionar Reserva", url: "/reservas/cadastrar" },
    { id: 6, imagem: <AssignmentOutlined fontSize="medium" />, titulo: "Empréstimos", descricao: "Adicionar Empréstimo", url: "/emprestimos/cadastrar" },
    { id: 7, imagem: <GroupOutlined fontSize="medium" />, titulo: "Leitores", descricao: "Adicionar Leitor", url: "/leitores/cadastrar" },
    { id: 8, imagem: <BadgeOutlined fontSize="medium" />, titulo: "Funcionários", descricao: "Adicionar Funcionário", url: "/funcionarios/cadastrar" },
];

function Registrar() {
    return (
        <div className="container">
            <Card title="Registrar">
                <div className="row g-3 mb-4">
                    {items.map((item) => (
                        <div key={item.id} className="col-12 col-sm-12 col-md-6 col-lg-4">
                            <DashboardCard id={item.id} qtd="+1" imagem={item.imagem} titulo={item.titulo} descricao={item.descricao} btnUrl={item.url} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default Registrar;