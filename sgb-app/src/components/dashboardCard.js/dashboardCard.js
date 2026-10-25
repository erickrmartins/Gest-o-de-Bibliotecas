import { useNavigate } from "react-router-dom";
import styles from "./dashboardCard.module.css"

const bgColors = [
    "#F9A8D4",
    "#FDBA74",
    "#A5B4FC",
    "#6EE7B7",
    "#CBD5E1",
    "#FDE047",
    "#93C5FD",
    "#C4B5FD"
]

function DashboardCard({ id, imagem, titulo, qtd, descricao, btnUrl }) {
    const navigate = useNavigate();
    const bgId = (Number(id) - 1) % bgColors.length;

    return (
        <div className={styles.dbCard} onClick={() => navigate(btnUrl)}>
            <div className={styles.dbTitle}>
                <div className={styles.dbImageBg} style={{ backgroundColor: bgColors.at(bgId) }}>
                    {imagem}
                </div>
                <div className={styles.dbTextBg}>
                    <h5>{titulo}</h5>
                </div>
            </div>
            <div className={styles.dbInfo}>
                <h1>{qtd}</h1>
                <p>{descricao}</p>
            </div>
        </div>
    )
}

export default DashboardCard;