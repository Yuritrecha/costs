import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Container from "./Container";
import logo from "../../../img/costs_logo.png";

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="logo_costs" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Inicio</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Projects">projetos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/NewProject">Novo Projeto</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
