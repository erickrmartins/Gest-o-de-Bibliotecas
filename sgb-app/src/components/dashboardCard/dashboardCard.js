import { useNavigate } from "react-router-dom";
import styles from "./dashboardCard.module.css"

const bgColors = [
    "#A8C98A",
    "#91BB78",
    "#7EAD69",
    "#6FA45F",
    "#82B59A",
    "#6DA88B",
    "#5F987B",
    "#9BB77A",
    "#78A66D"
];

function DashboardCard({ id, imagem, titulo, qtd, descricao, btnUrl }) {
    const navigate = useNavigate();
    const bgId = (Number(id) - 1) % bgColors.length;

    return (
        <div className={styles.dbCard} onClick={() => navigate(btnUrl)}>
            <div className={styles.dbTitle}>
                <div className={styles.dbImageBg} style={{ "--selected-color": bgColors.at(bgId) }}>
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