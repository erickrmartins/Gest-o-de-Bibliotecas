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

import { isAdmin } from '../../utils/login.js';
import ImagemTopo from '../../components/topo-imagem.js';

function Registrar({ profile }) {
    const items = [
        { id: 1, imagem: <MenuBookOutlined fontSize="medium" />, titulo: "Livros", descricao: "títulos no acervo", url: "/livros/cadastrar", permissao: true },
        { id: 2, imagem: <Inventory2Outlined fontSize="medium" />, titulo: "Exemplares", descricao: "adicionados a coleção", url: "/exemplares/cadastrar", permissao: true },
        { id: 3, imagem: <PersonOutlined fontSize="medium" />, titulo: "Autores", descricao: "autores cadastrados", url: "/autores/cadastrar", permissao: true },
        { id: 4, imagem: <BusinessOutlined fontSize="medium" />, titulo: "Editoras", descricao: "editoras cadastradas", url: "editoras", permissao: true },
        { id: 5, imagem: <BookmarkBorderOutlined fontSize="medium" />, titulo: "Reservas", descricao: "na fila de espera", url: "/reservas/cadastrar", permissao: true },
        { id: 6, imagem: <AssignmentOutlined fontSize="medium" />, titulo: "Empréstimos", descricao: "ativos atualmente", url: "/emprestimos/cadastrar", permissao: true },
        { id: 7, imagem: <GroupOutlined fontSize="medium" />, titulo: "Leitores", descricao: "leitores cadastrados", url: "/leitores/cadastrar", permissao: isAdmin(profile) },
        { id: 8, imagem: <BadgeOutlined fontSize="medium" />, titulo: "Funcionários", descricao: "funcionários cadastrados", url: "/funcionarios/cadastrar", permissao: isAdmin(profile) },
    ];

    return (
        <div>
            <ImagemTopo
                imagem="/background-gerencia.jpg"
                titulo="Registrar"
                subtitulo="Selecione uma opção para registrar um novo dado."
            />
            <div className="container">
                <Card>
                    <div className="row g-3 mb-4">
                        {items.map((item) => (
                            <div key={item.id} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                <DashboardCard
                                    id={item.id}
                                    qtd="+1"
                                    imagem={item.imagem}
                                    titulo={item.titulo}
                                    descricao={item.descricao}
                                    btnUrl={item.url}
                                    permissao={item.permissao} />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Registrar;