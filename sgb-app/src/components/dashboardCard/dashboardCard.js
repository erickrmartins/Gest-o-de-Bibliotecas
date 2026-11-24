import { useNavigate } from "react-router-dom";
import styles from "./DashboardCard.module.css"

const bgColors = [
    "#7D5F47",
    "#6B4F3B",
    "#5C4331",
    "#4A3525"
];

function DashboardCard({ id, imagem, titulo, qtd, descricao, btnUrl, permissao }) {
    const navigate = useNavigate();
    const bgId = (Number(id) - 1) % bgColors.length;

    return !permissao ? null : (
        <div className={`${styles.dbCard}`} onClick={() => navigate(btnUrl)}>
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
